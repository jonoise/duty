import mongoose from 'mongoose'

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'free',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    maxProjects: {
      type: Number,
      required: true,
      default: 1,
    },
    maxDuties: {
      type: Number,
      required: true,
      default: 5,
    },
    maxWebhooks: {
      type: Number,
      required: true,
      default: 1,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
)

export const Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema)
