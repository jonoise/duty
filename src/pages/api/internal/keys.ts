import dbConnect from '@/config/dbConnect'
import { Keys, Project } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

// @methods [GET,POST,PUT,DELETE]

export default async function keys(req: NextApiRequest, res: NextApiResponse) {
  const { projectId } = req.query
  if (!projectId) return res.status(400).end('Bad Request')
  if (typeof projectId !== 'string') return res.status(400).end('Bad Request')

  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) return res.status(401).end('Unauthorized')

  dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const project = await Project.findOne({
          _id: projectId,
        }).populate({
          path: 'keys',
          model: Keys,
        })
        if (!project) return res.status(404).end('Not Found')
        console.log(project)
        return res.status(200).json(project.keys)
      } catch (error) {
        console.log(error)
        return res.status(500).end('Internal Server Error')
      }
    case 'DELETE':
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
