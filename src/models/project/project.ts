import mongoose from 'mongoose'
import { DutyI } from './duty'
const projectSchema = new mongoose.Schema(
  {
    name: {
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
  language: string
  user: string
  duties: DutyI[]
  createdAt: Date
  updatedAt: Date
}
