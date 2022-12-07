import mongoose from 'mongoose'
import { ProjectDbI } from './database'
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
    db: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProjectDatabase',
    },
  },
  { timestamps: true }
)

export const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema)

export interface ProjectI {
  _id: string
  name: string
  language: string
  user: string
  duties: string[]
  db: ProjectDbI
  createdAt: Date
  updatedAt: Date
}
