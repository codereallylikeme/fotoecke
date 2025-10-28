'use server'

import { revalidatePath } from 'next/cache'
import { createBooking } from '@/data/booking'
import { sendBookingEmail } from '@/lib/email'
import { serializeDoc } from '@/lib/serialize'

export async function submitBooking(formData: FormData) {
  try {
    const booking = await createBooking({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      date: new Date(formData.get('date') as string),
      eventType: formData.get('eventType') as string,
    })

    

    // Send confirmation email to customer
    
    await sendBookingEmail(booking)

    // Optional: notify admin too
    await sendBookingEmail({
      ...booking,
      email: process.env.ADMIN_EMAIL as string,
    })

    // Optional: trigger revalidation for admin page
    revalidatePath('/admin/bookings')

    return { success: true, booking }
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e: any) => e.message)
      return { success: false, errors }
    }

    return { success: false, errors: ['Something went wrong.'] }
  }
}
