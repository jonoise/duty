import mongoose from 'mongoose'

const logSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    duty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Duty',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
)

export const Log = mongoose.models.Log || mongoose.model('Log', logSchema)
