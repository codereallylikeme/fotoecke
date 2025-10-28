import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import RegisterForm from './registerform'

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)

  // Only allow admins
  if (!session || (session.user as any).role !== 'admin') {
    redirect('/login') // redirect non-admins to login
  }

  return (
    <main className='mx-auto max-w-md px-6 py-16'>
      <h1 className='text-3xl font-bold mb-6'>Register New User</h1>
      <RegisterForm isAdmin={true} />
    </main>
  )
}
