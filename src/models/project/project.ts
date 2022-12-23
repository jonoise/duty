import mongoose from 'mongoose'
import { DutyI } from './duty'
import { ProjectEnvI } from './env'
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    env: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectEnv',
      },
    ],
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

export interface ProjectI {
  _id: string
  name: string
  description: string
  language: string
  user: string
  env: ProjectEnvI[]
  slug: string
  duties: DutyI[]
  createdAt: Date
  updatedAt: Date
}
