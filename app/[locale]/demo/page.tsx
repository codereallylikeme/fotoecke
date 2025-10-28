'use client'

import { useTranslations } from 'next-intl'

export default function DemoPage() {
  const t = useTranslations('demo')

  return (
    <main className='mx-auto max-w-4xl px-6 py-16'>
      <h1 className='text-3xl font-semibold mb-6'>{t('title')}</h1>
      <p className='mb-8'>{t('subtitle')}</p>

      <div className='grid md:grid-cols-2 gap-8'>
        <img
          src='/demo-booth.jpg'
          alt='Photo Booth Demo'
          className='rounded shadow'
        />
        <div>
          <p>{t('description')}</p>
        </div>
      </div>
    </main>
  )
}
