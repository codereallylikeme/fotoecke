'use client'
import React, { useState } from 'react'
import BookingDetailsModal from '@/components/BookingDetails'

type Booking = {
  _id: string
  name: string
  email: string
  date: string
  eventType: string
  status: string // Remove the ? to make it required
  createdAt: string
  updatedAt?: string
}

interface Props {
  bookings: Booking[]
  handleConfirm: (formData: FormData) => Promise<void>
  handleComplete: (formData: FormData) => Promise<void>
}

export default function AdminBookingsClient({ bookings, handleConfirm, handleComplete }: Props) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Event Type</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t hover:bg-gray-50">
                <td 
                  className="p-2 cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => setSelectedBooking(booking)}
                >
                  {booking.name}
                </td>
                <td className="p-2">{booking.email}</td>
                <td className="p-2">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="p-2 capitalize">{booking.eventType}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-2">
                  <div className="flex gap-2">
                    {booking.status === 'pending' && (
                      <form action={handleConfirm}>
                        <input type="hidden" name="id" value={booking._id} />
                        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                          Confirm
                        </button>
                      </form>
                    )}
                    
                    {booking.status === 'confirmed' && (
                      <form action={handleComplete}>
                        <input type="hidden" name="id" value={booking._id} />
                        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                          Complete
                        </button>
                      </form>
                    )}
                    
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </main>
  )
}