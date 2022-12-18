import mongoose from 'mongoose'

const dutySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
    pathToEndpoint: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export const Duty = mongoose.models.Duty || mongoose.model('Duty', dutySchema)

export interface DutyI {
  _id: string
  name: string
  description: string
  code: string
  pathToEndpoint: string
  endpoint: string
  project: string
  user: string
  createdAt: Date
  updatedAt: Date
}
