import { NextApiRequest, NextApiResponse } from 'next'
import { Plan, Project } from '@/models'
import { Session } from 'next-auth'

export const availableResource = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const resource = req.query.resource
  if (!resource) return res.status(400).end('Include a resource.')
  if (typeof resource !== 'string')
    return res.status(400).end('Resource must be a string.')

  switch (resource) {
    case 'project':
      return await canCreateMoreProjects(req, res, session)
    case 'duty':
      return await canCreateMoreDuties(req, res, session)
    default:
      return false
  }
}

const canCreateMoreProjects = async (
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

const canCreateMoreDuties = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  try {
    const { projectId } = req.query
    if (!projectId) return res.status(400).end('Bad Request')
    if (typeof projectId !== 'string') return res.status(400).end('Bad Request')

    const plan = await Plan.findOne({ user: session.user.id })
    const project = await Project.findById(projectId)

    const canCreateMoreDuties = plan.maxDuties > project.duties.length

    return res.status(200).json(canCreateMoreDuties)
  } catch (error) {
    return res.status(500).json({ error })
  }
}
