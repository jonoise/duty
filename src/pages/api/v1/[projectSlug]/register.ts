import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { Keys, Project } from '@/models'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid/async'
import { MongoClient } from 'mongodb'
import dbConnect from '@/config/dbConnect'
import { authDbURI } from '@/globals'

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('register')
  const { body } = req

  if (!body.username)
    return res.status(400).json({ error: 'Missing username.' })
  if (!body.password)
    return res.status(400).json({ error: 'Missing password.' })
  if (!body.project) return res.status(400).json({ error: 'Missing project.' })

  const requestKey = req.headers['duty-token']

  await dbConnect()

  const project = await Project.findOne({ slug: body.project }).populate({
    path: 'keys',
    model: Keys,
  })
  if (!project) return res.status(400).json({ error: 'Project not found' })
  console.log(project.keys.private)
  console.log(requestKey)
  const privateKey = project.keys.private
  if (requestKey !== privateKey)
    return res.status(400).json({ error: 'Unauthorized' })

  console.log('pasamos')
  // MONGODB DRIVER USERS
  const mongo = new MongoClient(authDbURI(body.project))

  const db = mongo.db(body.project)

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(body.password, salt)
  const today = dayjs(new Date())

  const userCollection = db.collection('user')
  const sessionCollection = db.collection('session')

  const foundUsername = await userCollection.findOne({
    username: body.username,
  })
  if (foundUsername)
    return res.status(400).json({ message: 'Username already taken.' })

  const user = await userCollection.insertOne({
    username: body.username,
    password: hash,
    createdAt: today.toISOString(),
  })

  await sessionCollection.insertOne({
    user: user.insertedId,
    expires: today.add(60, 'days').toISOString(),
    sessionToken: await nanoid(50),
    createdAt: today.toISOString(),
  })

  return res
    .status(200)
    .json({ users: await userCollection.find({}).toArray() })
}
