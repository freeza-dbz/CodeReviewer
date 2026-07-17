import Review from '../models/Review.js';
import Finding from '../models/Finding.js';
import Project from '../models/Project.js';
import { runPipeline } from '../core/pipeline.js';
export const submitReview = async (req, res) => {
  try {
    const { code, language } = req.body;
    
    let project = await Project.findOne({ owner: req.user._id });
    if (!project) {
      project = await Project.create({
        owner: req.user._id,
        projectName: 'Default Project',
        language: language || 'javascript',
        sourceType: 'paste'
      });
    }

    const pipelineResult = await runPipeline(code);
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
      success: true,
      data: {
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
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
