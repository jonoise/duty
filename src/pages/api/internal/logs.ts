import { NextApiRequest, NextApiResponse } from 'next'
import Pusher from 'pusher'

export const pusher = new Pusher({
  appId: process.env.PUSHER_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, project } = req.body
  await pusher.trigger('logs', `new-log-${project}`, {})

  res.json({ message: 'completed' })
}
