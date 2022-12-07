import mongoose from 'mongoose'

const fnExecutionSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    duty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Duty',
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    result: {
      type: String,
      default: 'pending',
    },
    logs: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
)
