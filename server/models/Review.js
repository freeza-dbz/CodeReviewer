import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    language: {
      type: String,
    },
    code: {
      type: String,
    },
    reviewStatus: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'failed'],
      default: 'pending',
    },
    modelUsed: {
      type: String,
    },
    reviewScore: {
      type: Number,
    },
    criticalCount: {
      type: Number,
      default: 0,
    },
    highCount: {
      type: Number,
      default: 0,
    },
    mediumCount: {
      type: Number,
      default: 0,
    },
    lowCount: {
      type: Number,
      default: 0,
    },
    reviewTime: {
      type: Number,
    },
    tokenUsage: {
      type: Number,
    },
    summary: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
