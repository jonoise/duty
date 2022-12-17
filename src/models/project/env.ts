import mongoose from 'mongoose'

const envSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export const ProjectEnv =
  mongoose.models.ProjectEnv || mongoose.model('ProjectEnv', envSchema)
