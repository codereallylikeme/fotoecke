'use client'
import React from 'react'

type BookingDetails = {
  _id: string
  name: string
  email: string
  date: string
  eventType: string
  status: string
  createdAt: string
  updatedAt?: string
}

interface Props {
  booking: BookingDetails
  onClose: () => void
}

export default function BookingDetailsModal({ booking, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Booking Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="text-gray-900">{booking.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{booking.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Date</label>
            <p className="text-gray-900">{new Date(booking.date).toLocaleDateString()}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Type</label>
            <p className="text-gray-900 capitalize">{booking.eventType}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <span className={`px-2 py-1 rounded text-sm ${
              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {booking.status}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Created At</label>
            <p className="text-gray-900">{new Date(booking.createdAt).toLocaleString()}</p>
          </div>
          
          {booking.updatedAt && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Updated</label>
              <p className="text-gray-900">{new Date(booking.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}