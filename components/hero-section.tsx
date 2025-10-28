'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroHeader } from './header'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { useTranslations, useLocale } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale() ?? 'en'
  const [showDemo, setShowDemo] = useState(false)

  // Simplified translation helper
  const getText = (key: string, fallback: string) => {
    try {
      return t(key)
    } catch {
      return fallback
    }
  }

  const bookingHref = `/${locale}/booking`

  return (
    <>
      
      <main className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-6xl">
                  {getText('title', 'Rent Our DSLR + iPad Photo Booth')}
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  {getText('description', 'Perfect for weddings, birthdays, corporate events, and more. Simple setup.')}
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Link 
                    href={bookingHref}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2 text-base"
                  >
                    {getText('buttons.book', 'Book now')}
                  </Link>
                  
                  <button
                    onClick={() => setShowDemo(true)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2 text-base"
                  >
                    {getText('buttons.demo', 'Request a demo')}
                  </button>
                </div>

                <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>✓ Free setup within 25km</p>
                  <p>✓ Professional DSLR quality</p>
                  <p>✓ Instant digital sharing</p>
                </div>
              </div>
              <Image
                className="relative -z-10 order-first ml-auto rounded-xl object-cover shadow-2xl 
                sm:h-[500px] lg:absolute lg:inset-0 lg:-right-20 lg:h-[600px] lg:w-3/5 lg:object-cover"
                src="/hero-col1-min.webp"
                alt="Photo Booth Setup"
                quality={85}
                priority
                width={1920}
                height={1080}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/yQALCAABAAEBAREA/8wABgAQEAX/2gAIAQEAAD8A0s8g/9k="
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw"
              />
            </div>
          </div>
        </section>

        <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">{getText('tagline', 'Trusted by great teams')}</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width="auto"
                      loading="lazy"
                    />
                  </div>
                </InfiniteSlider>
                
                <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20" />
                <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20" />
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {showDemo && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowDemo(false)}
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Photo Booth Demo</h3>
              <button 
                onClick={() => setShowDemo(false)} 
                className="text-2xl hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>
            
            <Image
              src="/demo_photobooth.png"
              alt="Photo booth demo"
              width={800}
              height={600}
              className="rounded-lg mx-auto"
            />
            
            <div className="mt-6 text-center space-y-4">
              <p>Ready to make your event unforgettable?</p>
              <div className="flex gap-3 justify-center">
                <Link
                  href={bookingHref}
                  onClick={() => setShowDemo(false)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2 text-base"
                >
                  Book Your Booth Now
                </Link>
                <button 
                  onClick={() => setShowDemo(false)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2 text-base"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}