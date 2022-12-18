import mongoose from 'mongoose'
import { ProjectEnv, ProjectEnvI } from './env'
import { Project } from './project'

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
    slug: {
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

dutySchema.statics.findbySlug = async function (
  projectSlug: string,
  dutySlug: string
) {
  let project = await Project.findOne({ slug: projectSlug }).populate({
    path: 'env',
    model: ProjectEnv,
  })
  if (!project) {
    throw new Error('Project not found')
  }

  let env: { [key: string]: string } = {}
  project.env.forEach((viarable: ProjectEnvI) => {
    env[viarable.key] = viarable.value
  })

  let duty = await Duty.findOne({ slug: dutySlug, project: project._id })

  if (!duty) {
    throw new Error('Duty not found')
  }

  return { duty, env }
}

export const Duty = mongoose.models.Duty || mongoose.model('Duty', dutySchema)

export interface DutyI {
  _id: string
  name: string
  description: string
  code: string
  slug: string
  pathToEndpoint: string
  endpoint: string
  project: string
  user: string
  createdAt: Date
  updatedAt: Date
}
