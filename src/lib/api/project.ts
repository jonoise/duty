import { Project, ProjectDb } from '@/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { createProjectDbUrl } from '../createProjectDbUrl'

export const getProjects = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { projectId } = req.query

  if (projectId) {
    const p = await Project.findById(projectId)
    return res.status(200).json(p)
  }
  const ps = await Project.find({ user: session.user.id })

  return res.status(200).json(ps)
}

export const createProject = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  try {
    const p = await Project.create({
      ...req.body,
      user: session.user.id,
    })

    await ProjectDb.create({
      project: p._id,
      url: createProjectDbUrl(p._id),
    })

    return res.status(201).json(p)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}

export const deleteProject = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {}

export const updateProject = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {}
