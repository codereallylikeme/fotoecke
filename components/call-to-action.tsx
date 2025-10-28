'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'

export default function CallToAction() {
  const t = useTranslations('callToAction')
  const locale = useLocale() ?? 'en'
  const [showDemo, setShowDemo] = useState(false)

  const safeT = (key: string, fallback?: string) => {
    try {
      return t(key)
    } catch (err) {
      console.error('Translation missing for', key, err)
      return fallback ?? key
    }
  }

  const bookingHref = `/${locale}/booking`

  return (
    <>
      <section className='py-16 md:py-32'>
        <div className='mx-auto max-w-5xl px-6'>
          <div className='text-center'>
            <h2 className='text-balance text-4xl font-semibold lg:text-5xl'>
              {safeT('title', 'Make Every Event Unforgettable')}
            </h2>
            <p className='mt-4'>
              {safeT(
                'subtitle',
                'Capture lasting memories with our DSLR + iPad photo booths — stylish, seamless, and built for fun.'
              )}
            </p>

            <div className='mt-12 flex flex-wrap justify-center gap-4'>
              <Button asChild size='lg'>
                <Link href={bookingHref}>
                  <span>{safeT('buttons.primary', 'Book Your Booth')}</span>
                </Link>
              </Button>

              <Button 
                size='lg' 
                variant='outline'
                onClick={() => setShowDemo(true)}
              >
                <span>{safeT('buttons.secondary', 'See It in Action')}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDemo(false)}
        >
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Photo Booth Demo</h3>
              <button 
                onClick={() => setShowDemo(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <Image
              src="/demo_photobooth.png"
              alt="Photo booth demo"
              width={800}
              height={600}
              className="rounded-lg shadow-lg mx-auto"
            />
            
            <div className="mt-6 text-center">
              <Button asChild size="lg">
                <Link href={bookingHref} onClick={() => setShowDemo(false)}>
                  Book Your Booth Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
