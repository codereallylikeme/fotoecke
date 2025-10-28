'use server'
import 'server-only'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { getBookings, updateBookingStatus } from '@/data/booking'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import AdminBookingsClient from './AdminBookingsClient'
import { BookingType } from '@/types/booking'

export default async function AdminBookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const session = await getServerSession(authOptions)
  const { locale } = await params

  if (!session || (session.user as any)?.role !== 'admin') {
    redirect(`/${locale}/login`)
  }

  // Server action for confirming bookings
  async function handleConfirm(formData: FormData) {
    'use server'
    const id = String(formData.get('id') ?? '')
    if (!id) return
    try {
      await updateBookingStatus(id, 'confirmed')
      revalidatePath(`/${locale}/admin/bookings`)
    } catch (err) {
      console.error('Failed to update booking status', err)
    }
  }

  async function handleComplete(formData: FormData) {
    'use server'
    const id = String(formData.get('id') ?? '')
    if (!id) return
    try {
      await updateBookingStatus(id, 'completed')
      revalidatePath(`/${locale}/admin/bookings`)
    } catch (err) {
      console.error('Failed to update booking status', err)
    }
  }

  const bookingsRaw = await getBookings()
  const bookings: BookingType[] = (bookingsRaw as any[]).map((b) => ({
    _id: String(b._id),
    name: String(b.name ?? ''),
    email: String(b.email ?? ''),
    date: b.date instanceof Date ? b.date.toISOString() : String(b.date ?? ''),
    eventType: String(b.eventType ?? ''),
    status: b.status ?? 'pending',
    createdAt: b.createdAt instanceof Date ? b.createdAt.toISOString() : String(b.createdAt ?? ''),
    updatedAt: b.updatedAt instanceof Date ? b.updatedAt.toISOString() : undefined,
  }))

  return (
    <AdminBookingsClient 
      bookings={bookings} 
      handleConfirm={handleConfirm}
      handleComplete={handleComplete}
    />
  )
}
