import { Project, ProjectEnv } from '@/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'

export const getEnv = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { projectId } = req.query
  if (!projectId)
    return res.status(400).json({ error: 'Project ID is required' })

  try {
    const env = await ProjectEnv.findOne({
      project: projectId,
      user: session.user.id,
    })
    if (!env) return res.status(404).json({ error: 'Env not found' })
    return res.status(200).json(env)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const createEnv = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { project: projectId } = req.body

  try {
    const project = await Project.findById(projectId)

    if (!project) return res.status(404).json({ message: 'Project not found' })

    const env = await ProjectEnv.create({
      ...req.body,
      project: projectId,
      user: session.user.id,
    })
    project.env.push(env._id)
    await project.save()
    return res.status(200).json(env)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}

export const updateEnv = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { projectId } = req.query
  if (!projectId)
    return res.status(400).json({ error: 'Project ID is required' })

  try {
    const env = await ProjectEnv.findOneAndUpdate(
      { project: projectId, user: session.user.id },
      req.body,
      { new: true }
    )
    if (!env) return res.status(404).json({ error: 'Env not found' })
    return res.status(200).json(env)
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const deleteEnv = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { projectId } = req.query
  if (!projectId)
    return res.status(400).json({ error: 'Project ID is required' })

  try {
    const env = await ProjectEnv.findOneAndUpdate(
      { project: projectId, user: session.user.id },
      req.body,
      { new: true }
    )
    if (!env) return res.status(404).json({ error: 'Env not found' })
    return res.status(200).json(env)
  } catch (error) {
    return res.status(500).json({ error })
  }
}
