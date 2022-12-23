import dbConnect from '@/config/dbConnect'
import { Duty } from '@/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { NodeVM } from 'vm2'

export default async function endpoint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  const { projectSlug, dutySlug } = req.query as ApiQuery

  try {
    // TODO: ADD TYPES TO MONGOOSE MODELS
    // @ts-ignore
    let { duty: dutyObject, env } = await Duty.findbySlug(projectSlug, dutySlug)
    const code = dutyObject.code

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
      env: env,
    })

    let duty = vm.run(code, 'vm.js')

    let result = await duty(req)

    return res.status(200).json(req.headers)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

type ApiQuery = {
  projectSlug: string
  dutySlug: string[]
}
