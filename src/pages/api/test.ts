import { NextApiRequest, NextApiResponse } from 'next'
import { NodeVM } from 'vm2'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { content } = req.body

  let isValidCode = true

  if (isValidCode) {
    try {
      const vm = new NodeVM({
        sandbox: { fetch },
        require: {
          external: {
            transitive: true,
            modules: ['mongodb'],
          },
          import: ['mongodb'],
          builtin: ['*'],
        },
      })
      let b = vm.run(content, 'vm.js')
      let result = await b()
      return res.status(200).json({ result, __filename })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  } else {
    return res.status(400).json({ message: 'Invalid code' })
  }
}

type ApiQuery = {
  accountId: string
  routes: string[]
}
