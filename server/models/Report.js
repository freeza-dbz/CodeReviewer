import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      required: true,
    },
    format: {
      type: String,
      enum: ['pdf', 'json', 'csv', 'html'],
      required: true,
    },
    downloadUrl: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', reportSchema);
export default Report;
