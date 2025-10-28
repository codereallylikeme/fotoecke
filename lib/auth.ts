import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { dbConnect } from '@/lib/mongoose'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { 
        email: { label: 'Email', type: 'text' }, 
        password: { label: 'Password', type: 'password' } 
      },
      async authorize(credentials) {
        try {
          await dbConnect()
          const email = String(credentials?.email ?? '').trim().toLowerCase()
          const password = String(credentials?.password ?? '')
          
          if (!email || !password) return null

          const user = await User.findOne({ email }).select('+password').lean<{ 
            _id: any; 
            email: string; 
            password: string; 
            role?: string 
          }>().exec()
          
          if (!user) {
            console.warn('[auth] user not found:', email)
            return null
          }

          const isValid = await bcrypt.compare(password, user.password)
          if (!isValid) {
            console.warn('[auth] invalid password for:', email)
            return null
          }

          return { 
            id: String(user._id), 
            email: user.email, 
            role: user.role 
          }
        } catch (err) {
          console.error('[auth] authorize error:', err)
          return null
        }
      }
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as any).role = (user as any).role
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = (token as any).role
      return session
    },
  },
  pages: { signIn: '/en/login' },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
