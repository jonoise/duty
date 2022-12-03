import { NextApiRequest, NextApiResponse } from 'next'
import { fromJs } from 'esast-util-from-js'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { content } = req.body

  let isValidCode = true
  const ast = fromJs(content, { module: true }) as any
  for (const statement of ast.body) {
    if (statement.type === 'ImportDeclaration') {
      if (statement.source.value === 'os') {
        isValidCode = false
        break
      }
    }
  }

  res.status(200).json({ isValidCode })
}

type ApiQuery = {
  accountId: string
  routes: string[]
}
