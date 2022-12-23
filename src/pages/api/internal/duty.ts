import { createDuty, getDuty, updateDuty, deleteDuty } from '@/lib/api/duty'
import type { NextApiRequest, NextApiResponse } from 'next'

// @methods [GET,POST,PUT,DELETE]

export default async function duty(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getDuty(req, res)
    case 'POST':
      return createDuty(req, res)
    case 'PUT':
      return updateDuty(req, res)
    case 'DELETE':
      return deleteDuty(req, res)
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
