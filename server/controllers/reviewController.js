import Review from '../models/Review.js';
import Finding from '../models/Finding.js';
import Project from '../models/Project.js';
import { runPipeline } from '../core/pipeline.js';
import { readFolder } from '../input/folderReader.js';
import { scanProject } from '../project/projectScanner.js';
import fs from 'fs';
import path from 'path';

export const submitFolderReview = async (req, res) => {
  try {
    const uploadId = req.uploadId;
    if (!uploadId) {
      return res.status(400).json({ success: false, message: 'No folder uploaded' });
    }

    const pName = req.body.projectName || 'Default Project';
    let project = await Project.findOne({ owner: req.user._id, projectName: pName });
    if (!project) {
      project = await Project.create({
        owner: req.user._id,
        projectName: pName,
        language: 'javascript',
        sourceType: 'folder'
      });
    }

    const tempDir = path.join('uploads', uploadId);
    
    // 1. Read files
    const filePaths = await readFolder(tempDir);
    
    // 2. Scan project
    const scannedProject = await scanProject(filePaths);
    
    // 3. Combine source code for pipeline
    let combinedCode = "";
    for (const f of scannedProject.files) {
       if (f.category === 'source' || f.category === 'configuration' || f.category === 'documentation') {
           combinedCode += `\n\n// File: ${f.path.replace(tempDir, '')}\n${f.content}`;
       }
    }

    if (!combinedCode) {
        throw new Error("No readable source files found in the project.");
    }

    const pipelineResult = await runPipeline(combinedCode, req.user.apiKey, req.user.preferredModel);
    const { parsedReview, staticAnalysis, language: detectedLang } = pipelineResult;

    const reviewSummary = parsedReview.summary || "No summary available.";
    const issues = parsedReview.issues || [];
    
    let criticalCount = 0, highCount = 0, mediumCount = 0, lowCount = 0;
    issues.forEach(issue => {
      const sev = (issue.severity || '').toLowerCase();
      if (sev === 'critical') criticalCount++;
      else if (sev === 'high') highCount++;
      else if (sev === 'medium') mediumCount++;
      else if (sev === 'low') lowCount++;
    });

    const score = Math.max(0, 100 - (criticalCount * 20 + highCount * 10 + mediumCount * 5 + lowCount * 2));

    const review = await Review.create({
      user: req.user._id,
      project: project._id,
      language: detectedLang || 'javascript',
      code: combinedCode,
      reviewStatus: 'completed',
      modelUsed: 'Gemini AI',
      reviewScore: score,
      criticalCount,
      highCount,
      mediumCount,
      lowCount,
      summary: reviewSummary,
      tokenUsage: 0,
    });

    const findings = await Promise.all(issues.map(issue => 
      Finding.create({ ...issue, review: review._id })
    ));

    // Cleanup temp directory
    fs.rmSync(tempDir, { recursive: true, force: true });

    res.status(201).json({
      success: true,
      data: {
        id: review._id,
        summary: reviewSummary,
        issues: findings.map(f => ({
          id: f._id,
          severity: f.severity,
          category: f.category,
          title: f.title,
          description: f.description,
          suggestion: f.suggestion,
          file: f.file,
          line: f.line,
        })),
        stats: {
          totalIssues: findings.length,
          critical: criticalCount,
          high: highCount,
          medium: mediumCount,
          low: lowCount,
          estimatedFixTime: 'TBD',
          score: score,
        }
      }
    });

  } catch (error) {
     if (req.uploadId) {
       const tempDir = path.join('uploads', req.uploadId);
       if (fs.existsSync(tempDir)) {
          fs.rmSync(tempDir, { recursive: true, force: true });
       }
     }
     res.status(500).json({ success: false, message: error.message });
  }
};

export const submitReview = async (req, res) => {
  try {
    const { code, language } = req.body;
    
    const pName = req.body.projectName || 'Default Project';
    let project = await Project.findOne({ owner: req.user._id, projectName: pName });
    if (!project) {
      project = await Project.create({
        owner: req.user._id,
        projectName: pName,
        language: language || 'javascript',
        sourceType: 'paste'
      });
    }

    const pipelineResult = await runPipeline(code, req.user.apiKey, req.user.preferredModel);
    const { parsedReview, staticAnalysis, language: detectedLang } = pipelineResult;

    const reviewSummary = parsedReview.summary || "No summary available.";
    const issues = parsedReview.issues || [];
    
    // Count severities
    let criticalCount = 0, highCount = 0, mediumCount = 0, lowCount = 0;
    issues.forEach(issue => {
      const sev = (issue.severity || '').toLowerCase();
      if (sev === 'critical') criticalCount++;
      else if (sev === 'high') highCount++;
      else if (sev === 'medium') mediumCount++;
      else if (sev === 'low') lowCount++;
    });

    const score = Math.max(0, 100 - (criticalCount * 20 + highCount * 10 + mediumCount * 5 + lowCount * 2));

    const review = await Review.create({
      user: req.user._id,
      project: project._id,
      language: detectedLang || language || 'javascript',
      code: code,
      reviewStatus: 'completed',
      modelUsed: 'Gemini AI',
      reviewScore: score,
      criticalCount,
      highCount,
      mediumCount,
      lowCount,
      summary: reviewSummary,
      tokenUsage: 0,
    });

    const findings = await Promise.all(issues.map(issue => 
      Finding.create({ ...issue, review: review._id })
    ));

    res.status(201).json({
      success: true,
      data: {
        id: review._id,
        summary: reviewSummary,
        issues: findings.map(f => ({
          id: f._id,
          severity: f.severity,
          category: f.category,
          title: f.title,
          description: f.description,
          suggestion: f.suggestion,
          file: f.file,
          line: f.line,
        })),
        stats: {
          totalIssues: findings.length,
          critical: criticalCount,
          high: highCount,
          medium: mediumCount,
          low: lowCount,
          estimatedFixTime: 'TBD',
          score: score,
        }
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ user: req.user._id })
      .populate('project', 'projectName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ user: req.user._id });

    res.json({
      success: true,
      data: {
        items: reviews.map(r => ({
          id: r._id,
          date: r.createdAt,
          project: r.project ? r.project.projectName : 'Unknown',
          language: r.language,
          status: r.reviewStatus,
          score: r.reviewScore,
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });

    const findings = await Finding.find({ review: review._id });

    res.json({
      success: true,
      data: {
        summary: review.summary,
        language: review.language,
        code: review.code,
        issues: findings.map(f => ({
          id: f._id,
          severity: f.severity,
          category: f.category,
          title: f.title,
          description: f.description,
          suggestion: f.suggestion,
          file: f.file,
          line: f.line,
        })),
        stats: {
          totalIssues: findings.length,
          critical: review.criticalCount,
          high: review.highCount,
          medium: review.mediumCount,
          low: review.lowCount,
          score: review.reviewScore,
          model: review.modelUsed,
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
e x p o r t   c o n s t   s u b m i t F o l d e r R e v i e w   =   a s y n c   ( r e q ,   r e s )   = >   {  
 