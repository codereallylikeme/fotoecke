// Create this file: app/api/test-db/route.ts
import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongoose'
import User from '@/models/User'
import Booking from '@/models/Booking'

export async function GET() {
  try {
    console.log('Testing MongoDB connection...')
    await dbConnect()
    console.log('✅ Connected to MongoDB')

    // Test 1: Create a test user
    const testUser = new User({
      email: 'test@example.com',
      password: 'testpassword123',
      role: 'staff',
    })

    await testUser.save()
    console.log('✅ Test user created:', testUser._id)

    // Test 2: Create a test booking
    const testBooking = new Booking({
      name: 'Test Event',
      email: 'testevent@example.com',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      eventType: 'wedding',
    })

    await testBooking.save()
    console.log('✅ Test booking created:', testBooking._id)

    // Test 3: Verify data exists
    const userCount = await User.countDocuments()
    const bookingCount = await Booking.countDocuments()

    console.log(`📊 Users in database: ${userCount}`)
    console.log(`📊 Bookings in database: ${bookingCount}`)

    // Clean up test data
    await User.deleteOne({ _id: testUser._id })
    await Booking.deleteOne({ _id: testBooking._id })
    console.log('🧹 Test data cleaned up')

    return NextResponse.json({
      success: true,
      message: '✅ Database operations successful!',
      data: {
        connection: 'Connected',
        userCreated: true,
        bookingCreated: true,
        totalUsers: userCount - 1, // Subtract the test user we deleted
        totalBookings: bookingCount - 1, // Subtract the test booking we deleted
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Database operation failed:', error)
    return NextResponse.json(
      {
        success: false,
        message: '❌ Database operation failed',
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    )
  }
}
