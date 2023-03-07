import dbConnect from '@/config/dbConnect'
import { pusher } from '@/config/pusher'
import { Duty } from '@/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { NodeVM } from 'vm2'

export default async function endpoint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  const { projectSlug, dutySlug } = req.query as ApiQuery
  const requestKey = req.headers['duty-token']

  try {
    // TODO: ADD TYPES TO MONGOOSE MODELS
    let {
      duty: dutyObject,
      env,
      keys,
      // @ts-ignore
    } = await Duty.findbySlug(projectSlug, dutySlug)

    if (keys.private !== requestKey)
      return res.status(401).json({ message: 'Unauthorized' })

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
    await pusher.trigger('logs', `new-log-${dutyObject.project.toString()}`, {
      duty: dutyObject._id,
      result,
      req: {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
      },
    })

    return res.status(200).json(result)
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}

type ApiQuery = {
  projectSlug: string
  dutySlug: string[]
}
