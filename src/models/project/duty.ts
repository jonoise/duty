import mongoose from 'mongoose'

const dutySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    snippet: {
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
