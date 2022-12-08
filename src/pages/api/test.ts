import { NextApiRequest, NextApiResponse } from 'next'
import { NodeVM } from 'vm2'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { content } = req.body
  const env = { LOCAL: 4 }

  let isValidCode = true

  const vm = new NodeVM({
    sandbox: { fetch },
    require: {
      external: true,
      context: 'sandbox',
      builtin: ['*'],
      root: './',
    },
    env: {
      NODE_ENV: 'sandbox',
    },
  })

  if (isValidCode) {
    let b = vm.run(content, 'vm.js')
    let result = await b(env)
    return res.status(200).json({ result, __filename })
  } else {
    return res.status(400).json({ message: 'Invalid code' })
  }
}

type ApiQuery = {
  accountId: string
  routes: string[]
}
