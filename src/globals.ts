const MONGODB_USERNAME = process.env.MONGODB_USERNAME
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER

export const fullHost =
  process.env.NODE_ENV === 'production'
    ? 'https://tryduty.com'
    : 'http://localhost:3000'

export const authDbURI = (project: string) =>
  `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/duty_dev_${project}?retryWrites=true&w=majority`
