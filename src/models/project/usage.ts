import mongoose from 'mongoose'
const usageSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    maxCallsAMonth: {
      type: Number,
      required: true,
      default: 500,
    },
    maxCallsADay: {
      type: Number,
      required: true,
      default: 100,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
)

export const Usage =
  mongoose.models.Usage || mongoose.model('Usage', usageSchema)
