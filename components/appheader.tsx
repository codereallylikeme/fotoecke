'use client'
import Link from 'next/link'
import React from 'react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export function AppHeader({ session }: { session: Session }) {
  const t = useTranslations('header.buttons')
  const params = useParams()
  const locale = params.locale || 'en'
  
  const handleSignOut = () => {
    signOut({ callbackUrl: `/${locale}` })
  }

  return (
    <header className='border-b px-6 py-4 flex justify-between items-center'>
      <Link href={`/${locale}`} className='font-bold text-lg'>
        PhotoBooth
      </Link>

      <nav className='flex gap-6'>
        <Link href={`/${locale}/profile`}>Profile</Link>

        {(session.user as any)?.role === 'admin' && (
          <>
            <Link href={`/${locale}/admin/bookings`} className='text-purple-600 font-medium'>
              Admin Dashboard
            </Link>
            <Link href={`/${locale}/admin/users`} className='text-purple-600 font-medium'>
              Manage Users
            </Link>
          </>
        )}
        <button onClick={handleSignOut} className='text-red-600 hover:text-red-800 transition'>
          Logout
        </button>
      </nav>
    </header>
  )
}
