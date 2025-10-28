import { NextResponse } from 'next/server'
import { createBooking, getBookings } from '@/data/booking'
import { rateLimiter } from '@/lib/rateLimiter'

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (!rateLimiter(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const booking = await createBooking(body)

    return NextResponse.json({ success: true, booking })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      )
      return NextResponse.json(
        { success: false, errors: messages },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const bookings = await getBookings()
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
