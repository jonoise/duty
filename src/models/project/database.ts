import mongoose from 'mongoose'

const databaseSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      default: 'AWS N. Virginia (us-east-1)',
    },
    image: {
      type: String,
      default: '/aws-logo.svg',
    },
    url: String,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  },
  { timestamps: true }
)

export const ProjectDb =
  mongoose.models.ProjectDatabase ||
  mongoose.model('ProjectDatabase', databaseSchema)

export interface ProjectDbI {
  _id: string
  url: string
  image: string
  project: string
  region: string
  updatedAt: string
  createdAt: string
}
