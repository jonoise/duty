import { NextApiRequest, NextApiResponse } from 'next'
import { Project, Duty } from '@/models'

export const createDuty = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const duty = await Duty.create(req.body)
    const project = await Project.findById(req.body.project)
    project.duties.push(duty._id)
    await project.save()
    return res.status(200).json({ duty })
  } catch (error: any) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}
