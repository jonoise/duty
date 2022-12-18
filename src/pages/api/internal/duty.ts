import { createDuty } from '@/lib/api/duty'
import type { NextApiRequest, NextApiResponse } from 'next'

// @methods [GET,POST,PUT,DELETE]

export default async function duty(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json({ message: 'GET' })
    case 'POST':
      return createDuty(req, res)
    case 'PUT':
    case 'DELETE':
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
