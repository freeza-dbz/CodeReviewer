import User from '../models/User.js';
import Review from '../models/Review.js';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const totalReviews = await Review.countDocuments({ user: req.user._id });

      res.json({
        success: true,
        data: {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          avatar: user.avatar || 'https://i.pravatar.cc/150?u=' + user._id,
          joinedDate: user.createdAt,
          totalReviews: totalReviews || 0,
          preferredLanguage: 'JavaScript',
          preferredModel: user.preferredModel,
          apiKey: user.apiKey,
          theme: user.theme,
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.username) user.username = req.body.username;
      if (req.body.avatar) user.avatar = req.body.avatar;
      if (req.body.preferredModel !== undefined) user.preferredModel = req.body.preferredModel;
      if (req.body.apiKey !== undefined) user.apiKey = req.body.apiKey;
      if (req.body.theme !== undefined) user.theme = req.body.theme;
      
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        data: {
          id: updatedUser._id,
          username: updatedUser.username,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          preferredModel: updatedUser.preferredModel,
          apiKey: updatedUser.apiKey,
          theme: updatedUser.theme,
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate('project', 'projectName')
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;
    let issuesFound = 0;
    let totalScore = 0;
    const languages = new Set();
    const recentReviews = reviews.slice(0, 3).map(r => ({
      id: r._id,
      project: r.project ? r.project.projectName : 'Unknown',
      language: r.language,
      score: r.reviewScore,
      date: r.createdAt,
      status: r.reviewStatus
    }));

    reviews.forEach(r => {
      issuesFound += (r.criticalCount || 0) + (r.highCount || 0) + (r.mediumCount || 0) + (r.lowCount || 0);
      totalScore += (r.reviewScore || 0);
      if (r.language) languages.add(r.language);
    });

    const avgScore = totalReviews > 0 ? Math.round(totalScore / totalReviews) : 0;
    const languagesUsed = languages.size;

    res.json({
      success: true,
      data: {
        totalReviews,
        languagesUsed,
        avgScore,
        issuesFound,
        recentReviews
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
