import { Duty, Project } from '@/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'

export const getProjects = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { projectId } = req.query
  try {
    if (projectId) {
      const p = await Project.findOne({
        _id: projectId,
        user: session.user.id,
      }).populate({
        path: 'duties',
        model: Duty,
      })
      if (!p) return res.status(404).json({ error: 'Project not found' })
      return res.status(200).json(p)
    }
    const ps = await Project.find({ user: session.user.id })

    return res.status(200).json(ps)
  } catch (error) {
    return res.status(500).json({ error })
  }
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