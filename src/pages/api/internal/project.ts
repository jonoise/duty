import dbConnect from '@/config/dbConnect'
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '@/lib/api/project'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

// @methods [GET,POST,PUT,DELETE]

export default async function project(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) return res.status(401).end('Unauthorized')
  await dbConnect()

  switch (req.method) {
    case 'GET':
      return getProjects(req, res, session)
    case 'POST':
      return createProject(req, res, session)
    case 'PUT':
      return updateProject(req, res, session)
    case 'DELETE':
      return deleteProject(req, res, session)
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
