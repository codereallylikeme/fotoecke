'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function BookingThankYouPage() {
  const t = useTranslations('bookingThankYou')

  return (
    <main className='mx-auto max-w-3xl px-6 py-20 text-center'>
      <h1 className='text-4xl font-semibold mb-4'>{t('title')}</h1>
      <p className='text-lg mb-8 text-muted-foreground'>{t('message')}</p>

      <Link
        href='/'
        className='inline-block rounded bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition'
      >
        {t('backHome')}
      </Link>
    </main>
  )
}
