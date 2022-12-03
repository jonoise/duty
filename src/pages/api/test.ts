import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { content } = req.body

  eval(content)

  res.status(200).json({ name: 'John Doe' })
}

type ApiQuery = {
  accountId: string
  routes: string[]
}
