export const dutyFnContent = `const { MongoClient } = require('mongodb')

module.exports = async function fetchProducts() {
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()

  const db = client.db('my-store')
  const products = await db.collection('products').find({}).toArray()

  return products
}`

export const initialFile = {
  name: 'index.tsx',
  content: dutyFnContent,
}
