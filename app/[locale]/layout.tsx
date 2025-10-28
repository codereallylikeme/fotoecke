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
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Enhanced metadata with SEO improvements
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams?.locale ?? routing.defaultLocale
  
  // Validate locale
  if (!validLocales.includes(locale)) {
    notFound()
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  
  // Ensure we always have a description
  const defaultDescription = 'Professional photo booth rental service for weddings, parties, and corporate events. DSLR and iPad photo booths with instant digital sharing.'
  const description = siteDetails.metadata.description || defaultDescription
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Fotoecke',
      default: siteDetails.metadata.title || 'Fotoecke - Photo Booth Rental',
    },
    description: description,
    keywords: [
      'photo booth rental',
      'wedding photo booth',
      'party photo booth',
      'corporate events',
      'DSLR photo booth',
      'iPad photo booth',
      'Fotoecke',
      'Germany',
      'Berlin',
    ],
    authors: [{ name: 'Fotoecke' }],
    creator: 'Fotoecke',
    publisher: 'Fotoecke',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
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
      title: siteDetails.metadata.title || 'Fotoecke - Photo Booth Rental',
      description: siteDetails.metadata.description || description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Fotoecke',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Fotoecke Photo Booth Rental',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteDetails.metadata.title || 'Fotoecke - Photo Booth Rental',
      description: description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
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

  // Validate locale early
  if (!validLocales.includes(locale)) {
    console.warn(`Invalid locale in layout: ${locale}`)
    notFound()
  }

  let session: Session | null = null
  try {
    session = await getServerSession(authOptions)
    console.log(
      '[layout] session:',
      session ? 'authenticated' : 'not authenticated'
    )
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
    // Return empty messages rather than crashing
    messages = {}
  }

  // Determine which header to show based on user role
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
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers
          locale={locale}
          messages={messages}
          session={session}
          timeZone='UTC'
        >
          {renderHeader()}
          {children}
        </Providers>
      </body>
    </html>
  )
}
