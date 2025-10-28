import { unstable_cache } from 'next/cache'

// Cache all bookings
export const getCachedBookings = unstable_cache(
  async () => {
    const { getBookings } = await import('@/data/booking')
    return await getBookings()
  },
  ['all-bookings'],
  {
    revalidate: 300, // 5 minutes
    tags: ['bookings'],
  }
)

// Cache user-specific bookings (now using the correct function)
export const getCachedUserBookings = unstable_cache(
  async (userId: string) => {
    const { getUserBookings } = await import('@/data/booking')
    return await getUserBookings(userId)
  },
  ['user-bookings'],
  {
    revalidate: 60, // 1 minute
    tags: ['bookings', 'user-bookings'],
  }
)

// Cache bookings by status
export const getCachedBookingsByStatus = unstable_cache(
  async (status: string) => {
    const { getBookingsByStatus } = await import('@/data/booking')
    return await getBookingsByStatus(status)
  },
  ['bookings-by-status'],
  {
    revalidate: 180, // 3 minutes
    tags: ['bookings'],
  }
)

// Cache booking by ID
export const getCachedBookingById = unstable_cache(
  async (id: string) => {
    const { getBookingById } = await import('@/data/booking')
    return await getBookingById(id)
  },
  ['booking-by-id'],
  {
    revalidate: 300, // 5 minutes
    tags: ['bookings'],
  }
)

// Cache bookings by date range
export const getCachedBookingsByDateRange = unstable_cache(
  async (startDate: Date, endDate: Date) => {
    const { getBookingsByDateRange } = await import('@/data/booking')
    return await getBookingsByDateRange(startDate, endDate)
  },
  ['bookings-by-date'],
  {
    revalidate: 300, // 5 minutes
    tags: ['bookings'],
  }
)

// Cache translation data
export const getCachedTranslations = unstable_cache(
  async (locale: string, namespace: string) => {
    try {
      const messages = await import(`@/messages/${locale}.json`)
      return messages.default[namespace] || {}
    } catch (error) {
      console.warn(`Translation file not found for locale: ${locale}`)
      return {}
    }
  },
  ['translations'],
  {
    revalidate: 3600, // 1 hour
    tags: ['translations'],
  }
)

// Helper functions
export async function revalidateCache(tags: string[]) {
  const { revalidateTag } = await import('next/cache')
  tags.forEach((tag) => revalidateTag(tag))
}

export async function revalidateBookingCaches() {
  await revalidateCache(['bookings', 'user-bookings', 'booking-by-id', 'bookings-by-status', 'bookings-by-date'])
}
