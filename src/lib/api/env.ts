import { ProjectEnv } from '@/models'
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
