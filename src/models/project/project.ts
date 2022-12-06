import mongoose from 'mongoose'
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    duties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Duty',
      },
    ],
  },
  { timestamps: true }
)

export const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema)
