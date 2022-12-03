import { NextApiRequest, NextApiResponse } from 'next'
import { NodeVM } from 'vm2'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { content } = req.body

  let isValidCode = true

  const vm = new NodeVM({
    console: 'inherit',
    sandbox: { fetch },
    require: {
      external: true,
    },
  })

  if (isValidCode) {
    let b = vm.run(content)
    let r = await b()
    return res.status(200).json({ message: r })
  } else {
    return res.status(400).json({ message: 'Invalid code' })
  }
}

type ApiQuery = {
  accountId: string
  routes: string[]
}
