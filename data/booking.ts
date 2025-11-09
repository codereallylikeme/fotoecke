import 'server-only'
import { dbConnect } from '@/lib/mongoose'
import Booking, { IBooking } from '@/models/Booking'
import { serializeDoc } from '@/lib/serialize'

// Create booking
export async function createBooking(data: Partial<IBooking>) {
  await dbConnect()
  const booking = await Booking.create(data)
  return serializeDoc(booking.toObject())
}

// Get all bookings (for admin)
export async function getBookings() {
  await dbConnect()
  const docs = await Booking.find().sort({ createdAt: -1 }).lean()
  return docs.map((d)=>serializeDoc(d))
}

// Update booking status
export async function updateBookingStatus(id: string, status: string) {
  await dbConnect()
  const booking = await Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).lean()
  return booking ? serializeDoc(booking) : null
}

// Get bookings for a specific user
export async function getUserBookings(userId: string) {
  await dbConnect()
  const docs = await Booking.find({ userId }).sort({ createdAt: -1 }).lean()
  return docs.map((d) => serializeDoc(d))
}

// Get bookings by status
export async function getBookingsByStatus(status: string) {
  await dbConnect()
  const docs = await Booking.find({ status }).sort({ createdAt: -1 }).lean()
  return docs.map((d) => serializeDoc(d))
}

// Get booking by ID
export async function getBookingById(id: string) {
  await dbConnect()
  const doc = await Booking.findById(id).lean()
  return doc ? serializeDoc(doc) : null
}

// Get bookings by date range
export async function getBookingsByDateRange(startDate: Date, endDate: Date) {
  await dbConnect()
  const docs = await Booking.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).sort({ date: 1 }).lean()
  return docs.map((d) => serializeDoc(d))
}

// Delete booking
export async function deleteBooking(id: string) {
  await dbConnect()
  const result = await Booking.findByIdAndDelete(id)
  return !!result
}