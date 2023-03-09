import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { Plan } from '@/models'
import clientPromise from '@/config/mongodb'
import dbConnect from '@/config/dbConnect'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      try {
        await dbConnect()
        await Plan.create({ user: user.id })
      } catch (error) {
        console.log(error)
      }
    },
  },
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: MongoDBAdapter(clientPromise),
}
export default NextAuth(authOptions)
