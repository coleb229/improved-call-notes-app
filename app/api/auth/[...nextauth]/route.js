import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        return (
          profile.email_verified && profile.email.endsWith('@getquantic.com')
        )
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
  adapter: PrismaAdapter(prisma),
})

export { handler as GET, handler as POST }
