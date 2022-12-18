import mongoose from 'mongoose'

const envSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export const ProjectEnv =
  mongoose.models.ProjectEnv || mongoose.model('ProjectEnv', envSchema)

export interface ProjectEnvI {
  _id: string
  project: string
  key: string
  value: string
  user: string
  createdAt: Date
  updatedAt: Date
}
