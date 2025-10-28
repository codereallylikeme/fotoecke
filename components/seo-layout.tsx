import { Metadata } from 'next'

export function generateSEOMetadata({
  title,
  description,
  path,
  locale,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  locale: string
  noindex?: boolean
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  const url = `${baseUrl}/${locale}${path}`

  return {
    title,
    description, // Make sure this is included
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'de': `${baseUrl}/de${path}`,
        'x-default': `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Fotoecke',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
  }
}