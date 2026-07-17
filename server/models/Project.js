import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    language: {
      type: String,
      required: true,
    },
    sourceType: {
      type: String,
      enum: ['paste', 'upload', 'folder', 'github'],
      required: true,
    },
    repositoryUrl: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
