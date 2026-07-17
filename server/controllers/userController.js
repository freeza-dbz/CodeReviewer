import User from '../models/User.js';
import Review from '../models/Review.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const totalReviews = await Review.countDocuments({ user: req.user._id });

      res.json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: 'https://i.pravatar.cc/150?u=' + user._id,
          joinedDate: user.createdAt,
          totalReviews: totalReviews || 0,
          preferredLanguage: 'JavaScript',
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

      const updatedUser = await user.save();

      res.json({
        success: true,
        data: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
