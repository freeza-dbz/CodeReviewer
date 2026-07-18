import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    provider: {
      type: String,
      default: 'local',
    },
    preferredModel: {
      type: String,
      default: 'gemini-3.5-flash',
    },
    apiKey: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'light',
    },
    avatar: {
      type: String,
      default: 'https://i.pravatar.cc/150?u=default',
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
