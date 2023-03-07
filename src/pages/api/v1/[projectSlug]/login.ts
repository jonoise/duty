import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const headers = new Headers()
  const password = 'fake_password'

  const salt = await bcrypt.genSalt(10)

  const hash = await bcrypt.hash(password, salt)

  return res.status(200).json({ hash })
}
