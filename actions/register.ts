'use server'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createUser } from '@/data/users'
import { dbConnect } from '@/lib/mongoose'
import bcrypt from 'bcryptjs'

export async function registerUser(formData: FormData): Promise<void> {
  const rawEmail = String(formData.get('email') ?? '').trim()
  const rawPassword = String(formData.get('password') ?? '')
  const requestedRole = (formData.get('role') as string | null) ?? null

  if (!rawEmail || !rawPassword) {
    const locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en'
    redirect(`/${locale}/register?error=${encodeURIComponent('Email and password are required')}`)
  }

  const email = rawEmail.toLowerCase()
  if (!/\S+@\S+\.\S+/.test(email)) {
    const locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en'
    redirect(`/${locale}/register?error=${encodeURIComponent('Invalid email address')}`)
  }

  const allowedRoles = ['admin', 'staff']
  let role = 'staff'
  const session = await getServerSession(authOptions)
  if (session && (session.user as any)?.role === 'admin' && requestedRole && allowedRoles.includes(requestedRole)) {
    role = requestedRole
  }

  try {
    await dbConnect()
    const hashed = await bcrypt.hash(rawPassword, 10)
    await createUser(email, hashed, role)

    // Fix: use localized route
    const locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en'
    redirect(`/${locale}/admin/bookings`) // Change to bookings or create users page
  } catch (err: any) {
    console.error('Registration error:', err)
    const locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en'
    const message = err?.code === 11000 ? 'User already exists' : (err?.message ?? 'Registration failed')
    redirect(`/${locale}/register?error=${encodeURIComponent(message)}`)
  }
}
