import { createEnv, getEnv, updateEnv, deleteEnv } from '@/lib/api/env'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

// @methods [GET,POST,PUT,DELETE]

export default async function env(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) return res.status(401).end('Unauthorized')

  switch (req.method) {
    case 'GET':
      return getEnv(req, res, session)
    case 'POST':
      return createEnv(req, res, session)
    case 'PUT':
      return updateEnv(req, res, session)
    case 'DELETE':
      return deleteEnv(req, res, session)
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
