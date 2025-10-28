'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function StaffDashboard({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const session = await getServerSession(authOptions)
  const { locale } = await params

  if (!session) {
    redirect(`/${locale}/login`)
  }

  const userRole = (session.user as any)?.role

  // Redirect admin users to admin dashboard
  if (userRole === 'admin') {
    redirect(`/${locale}/admin/bookings`)
  }

  return (
    <main className='max-w-4xl mx-auto py-16 px-6'>
      <h1 className='text-3xl font-semibold mb-6'>Staff Dashboard</h1>
      <p>Welcome, {session.user?.email}!</p>
      <p>Your role: {userRole}</p>

      <div className='mt-8'>
        <h2 className='text-xl font-medium mb-4'>Available Actions:</h2>
        <ul className='space-y-2'>
          <li>• View your assigned bookings</li>
          <li>• Update booking status</li>
          <li>• Contact customers</li>
        </ul>
      </div>
    </main>
  )
}
