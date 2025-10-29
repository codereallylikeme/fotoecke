import Providers from '@/components/Providers'
import { getMessages } from '@/lib/getMessages'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { HeroHeader } from '@/components/header'
import { AppHeader } from '@/components/appheader'
import { StaffHeader } from '@/components/staffHeader'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import type { Session } from 'next-auth'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { siteDetails } from '@/data/siteDetails'
import './globals.css'

const validLocales = ['en', 'de']

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Improve font loading performance
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

// Enhanced metadata with better SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams?.locale ?? routing.defaultLocale
  
  if (!validLocales.includes(locale)) {
    notFound()
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  
  // Enhanced description with better SEO keywords
  const defaultDescription = 'Professional photo booth rental service for weddings, parties, and corporate events in Germany. DSLR and iPad photo booths with instant digital sharing and high-quality prints. Free setup within 25km radius.'
  const description = siteDetails.metadata.description || defaultDescription
  
  // Enhanced title with location targeting
  const defaultTitle = 'Fotoecke - Professional Photo Booth Rental in Germany'
  const title = siteDetails.metadata.title || defaultTitle
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Fotoecke',
      default: title,
    },
    description: description,
    keywords: [
      'photo booth rental Germany',
      'wedding photo booth',
      'party photo booth rental',
      'corporate event photography',
      'DSLR photo booth',
      'iPad photo booth',
      'instant photo sharing',
      'event photography Berlin',
      'Fotoecke photo booth',
      'professional photo booth service',
      'birthday party photo booth',
      'graduation photo booth',
    ],
    authors: [{ name: 'Fotoecke', url: baseUrl }],
    creator: 'Fotoecke',
    publisher: 'Fotoecke',
    category: 'Photography Services',
    classification: 'Business',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
    manifest: '/manifest.json',
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'de': `${baseUrl}/de`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Fotoecke',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Fotoecke Photo Booth Rental Service',
          type: 'image/jpeg',
        },
        {
          url: `${baseUrl}/og-image-square.jpg`,
          width: 800,
          height: 800,
          alt: 'Fotoecke Photo Booth',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@fotoecke', // Add your Twitter handle
      creator: '@fotoecke',
      title: title,
      description: description,
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION_ID,
      // yandex: 'your-yandex-verification',
      // yahoo: 'your-yahoo-verification',
    },
  }
}

// Structured Data Component for better SEO
function StructuredData({ locale }: { locale: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#organization`,
    "name": "Fotoecke",
    "alternateName": "Fotoecke Photo Booth Rental",
    "description": "Professional photo booth rental service for events",
    "url": baseUrl,
    "telephone": "+49-XXX-XXXXXXX", // Add your actual phone
    "email": "info@fotoecke.com", // Add your actual email
    "logo": `${baseUrl}/fotoecke.png`,
    "image": `${baseUrl}/og-image.jpg`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE",
      "addressRegion": "Berlin", // Update with your region
      "addressLocality": "Berlin" // Update with your city
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.5200", // Update with your coordinates
      "longitude": "13.4050"
    },
    "areaServed": [
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "52.5200",
          "longitude": "13.4050"
        },
        "geoRadius": "25000"
      }
    ],
    "serviceType": "Photo Booth Rental",
    "priceRange": "€€",
    "openingHours": "Mo-Su 00:00-23:59",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photo Booth Rental Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "DSLR Photo Booth Rental",
            "description": "Professional DSLR photo booth with instant printing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "iPad Photo Booth Rental",
            "description": "Modern iPad photo booth with touch interface"
          }
        }
      ]
    },
    "sameAs": [
      // Add your social media URLs
      "https://www.facebook.com/fotoecke",
      "https://www.instagram.com/fotoecke"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "Fotoecke",
    "url": baseUrl,
    "description": "Professional photo booth rental service",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": locale === 'de' ? 'de-DE' : 'en-US'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  )
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale ?? routing.defaultLocale

  if (!validLocales.includes(locale)) {
    console.warn(`Invalid locale in layout: ${locale}`)
    notFound()
  }

  let session: Session | null = null
  try {
    session = await getServerSession(authOptions)
    console.log('[layout] session:', session ? 'authenticated' : 'not authenticated')
    if (session?.user) {
      console.log('[layout] user role:', session.user.role)
    }
  } catch (error) {
    console.error('[layout] Error getting session:', error)
  }

  let messages: Record<string, unknown> = {}
  try {
    messages = await getMessages(locale)
  } catch (err) {
    console.error('Failed to load messages for locale', locale, err)
    messages = {}
  }

  const renderHeader = () => {
    if (!session?.user) {
      return <HeroHeader />
    }

    const userRole = session.user.role
    if (userRole === 'admin') {
      return <AppHeader session={session} />
    } else {
      return <StaffHeader session={session} />
    }
  }

  return (
    <html lang={locale} dir="ltr">
      <head>
        {/* Structured Data for SEO */}
        <StructuredData locale={locale} />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/hero-col1-min.webp" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        
        {/* Viewport and theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Geographic targeting */}
        <meta name="geo.region" content="DE" />
        <meta name="geo.country" content="Germany" />
        <meta name="geo.placename" content="Berlin" />
        
        {/* Business information */}
        <meta name="business:contact_data:street_address" content="Your Street Address" />
        <meta name="business:contact_data:locality" content="Berlin" />
        <meta name="business:contact_data:region" content="Berlin" />
        <meta name="business:contact_data:postal_code" content="Your Postal Code" />
        <meta name="business:contact_data:country_name" content="Germany" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <Providers
          locale={locale}
          messages={messages}
          session={session}
          timeZone='UTC'
        >
          {/* Skip to main content for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
          >
            Skip to main content
          </a>
          
          {/* Header with semantic markup */}
          <div role="banner">
            {renderHeader()}
          </div>
          
          {/* Main content area */}
          <div id="main-content" role="main" className="flex-1">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
