import mongoose from 'mongoose';

const findingSchema = new mongoose.Schema(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      required: true,
    },
    severity: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low', 'info'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    line: {
      type: Number,
    },
    suggestion: {
      type: String,
    },
    category: {
      type: String,
      enum: ['Bug', 'Security', 'Performance', 'Maintainability', 'Style', 'Best Practice'],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Finding = mongoose.model('Finding', findingSchema);
export default Finding;
