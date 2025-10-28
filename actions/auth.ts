'use server'

import { redirect } from 'next/navigation'
import { dbConnect } from '@/lib/mongoose'
import User from '@/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function registerUser(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'admin') {
    // not authorized -> send user to sign-in
    redirect('/en/login')
  }

  await dbConnect()
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const role = String(formData.get('role') ?? 'staff').toLowerCase()

  // validate...
  const hashed = await bcrypt.hash(password, 10)
  const user = new User({ email, password: hashed, role })
  await user.save()

  // redirect on success
  redirect('/en/admin/users')
}
