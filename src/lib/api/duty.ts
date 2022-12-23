import { NextApiRequest, NextApiResponse } from 'next'
import { Project, Duty } from '@/models'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export const createDuty = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const found = await Duty.findOne({
      project: req.body.project,
      slug: req.body.slug,
    })
    if (found)
      return res
        .status(400)
        .json({ error: 'A Duty with that slug already exists.' })

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

export const getDuty = async (req: NextApiRequest, res: NextApiResponse) => {
  const { dutyId } = req.query
  if (!dutyId) return res.status(400).json({ error: 'No dutyId provided.' })
  if (typeof dutyId !== 'string')
    return res.status(400).json({ error: 'dutyId must be a string.' })
  try {
    const duty = await Duty.findById(dutyId)
    return res.status(200).json(duty)
  } catch (error: any) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

// @UPDATE DUTY
// @desc Update a duty
export const updateDuty = async (req: NextApiRequest, res: NextApiResponse) => {
  const { dutyId } = req.query
  if (!dutyId) return res.status(400).json({ error: 'No dutyId provided.' })
  if (typeof dutyId !== 'string')
    return res.status(400).json({ error: 'dutyId must be a string.' })

  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) return res.status(401).end('Unauthorized')

  try {
    const duty = await Duty.findByIdAndUpdate(dutyId, req.body, { new: true })
    return res.status(200).json(duty)
  } catch (error: any) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

export const deleteDuty = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {}
