import { availableResource } from '@/lib/api/more-resources'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

// @methods [GET,POST,PUT,DELETE]

export default async function moreResources(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) return res.status(401).end('Unauthorized')

  switch (req.method) {
    case 'GET':
      return availableResource(req, res, session)
    default:
      res.setHeader('Allow', ['GET'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
