import { Plan, Project } from '@/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'

export const canCreateMoreProjects = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  try {
    const plan = await Plan.findOne({ user: session.user.id })
    const projects = await Project.findOne({ user: session.user.id })
    const canCreateMoreProjects = plan.maxProjects > projects.length

    return res.status(200).json({ canCreateMoreProjects })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
