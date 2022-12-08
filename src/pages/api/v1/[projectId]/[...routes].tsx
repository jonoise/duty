import { NextApiRequest, NextApiResponse } from 'next'
import os from 'os'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { accountId, routes } = req.query as ApiQuery

  if (!accountId) return res.status(400).end()
  if (!routes) return res.status(400).end()

  const path = `${accountId}/${routes.join('/')}`
  console.log(path)

  res.status(200).json({ path, hostname: os.arch() })
}

type ApiQuery = {
  accountId: string
  routes: string[]
}
