import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        data: {
          token: generateToken(user._id),
          user: {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            avatar: user.avatar || 'https://i.pravatar.cc/150?u=' + user._id,
            preferredModel: user.preferredModel,
            apiKey: user.apiKey,
            theme: user.theme,
          }
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const signup = async (req, res) => {
  const { username, name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
      avatar: req.body.avatar || 'https://i.pravatar.cc/150?u=' + email,
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          token: generateToken(user._id),
          user: {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            preferredModel: user.preferredModel,
            apiKey: user.apiKey,
            theme: user.theme,
          }
        }
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};
