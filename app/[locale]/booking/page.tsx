'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { submitBooking } from '@/actions/bookings'

export default function BookingPage() {
  const t = useTranslations('booking')
  const router = useRouter()
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setErrors([])

    const res = await submitBooking(formData)

    setLoading(false)

    if (res.success) {
      router.push('/booking/thank-you')
    } else {
      setErrors(res.errors ?? [])
    }
  }

  return (
    <main className='mx-auto max-w-3xl px-6 py-16'>
      <h1 className='text-3xl font-semibold mb-6'>{t('title')}</h1>
      <p className='mb-8 text-muted-foreground'>{t('subtitle')}</p>

      {errors.length > 0 && (
        <div className='bg-red-50 border border-red-300 text-red-700 rounded p-4 mb-4'>
          <ul className='list-disc list-inside'>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form action={handleSubmit} className='space-y-6'>
        <div>
          <label className='block mb-2'>{t('form.name')}</label>
          <input
            name='name'
            type='text'
            className='w-full border rounded px-3 py-2'
            required
          />
        </div>

        <div>
          <label className='block mb-2'>{t('form.email')}</label>
          <input
            name='email'
            type='email'
            className='w-full border rounded px-3 py-2'
            required
          />
        </div>

        <div>
          <label className='block mb-2'>{t('form.date')}</label>
          <input
            name='date'
            type='date'
            className='w-full border rounded px-3 py-2'
            required
          />
        </div>

        <div>
          <label className='block mb-2'>{t('form.eventType')}</label>
          <select name='eventType' className='w-full border rounded px-3 py-2'>
            <option value='wedding'>{t('events.wedding')}</option>
            <option value='birthday'>{t('events.birthday')}</option>
            <option value='corporate'>{t('events.corporate')}</option>
            <option value='other'>{t('events.other')}</option>
          </select>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-primary text-white px-4 py-2 rounded disabled:opacity-50'
        >
          {loading ? 'Submitting...' : t('form.submit')}
        </button>
      </form>
    </main>
  )
}
