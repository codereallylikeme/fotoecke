'use server'
import 'server-only'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const session = await getServerSession(authOptions)
  const { locale } = await params

  if (!session || (session.user as any)?.role !== 'admin') {
    redirect(`/${locale}/login`)
  }

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Users</h1>
      <p>User management page coming soon...</p>
    </main>
  )
}
