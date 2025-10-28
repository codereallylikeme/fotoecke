'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import RegisterForm from '@/app/[locale]/register/registerform'

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const session = await getServerSession(authOptions)
  const { locale } = await params

  // Only allow admin users to access registration
  if (!session || (session.user as any)?.role !== 'admin') {
    redirect(`/${locale}/login`)
  }

  return (
    <main className="max-w-md mx-auto py-16 px-6">
      <h1 className="text-2xl font-semibold mb-6">Register New User</h1>
      <p className="text-gray-600 mb-6">Only administrators can create new user accounts.</p>
      <RegisterForm isAdmin={true} />
    </main>
  )
}