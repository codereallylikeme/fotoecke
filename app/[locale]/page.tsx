import { Metadata } from 'next'
import HeroSection from "@/components/hero-section"
import Features from "@/components/features-1"
import ContentSection from "@/components/content-3"
import CallToAction from "@/components/call-to-action"
import FAQsTwo from "@/components/faqs-2"
import Pricing from "@/components/pricing"
import FooterSection from "@/components/footer"

export const metadata: Metadata = {
  title: 'Photo Booth Rental - DSLR & iPad Photo Booths | Fotoecke',
  description: 'Rent professional DSLR and iPad photo booths for weddings, birthdays, corporate events in Germany. Free setup within 25km radius. Instant digital sharing and high-quality prints.',
  keywords: [
    'photo booth rental Germany',
    'wedding photo booth',
    'DSLR photo booth',
    'iPad photo booth',
    'corporate event photography',
    'party photo booth rental',
    'Berlin photo booth',
    'instant photo sharing',
    'Fotoecke',
    'professional photo booth',
    'event photography',
  ],
  authors: [{ name: 'Fotoecke' }],
  creator: 'Fotoecke',
  publisher: 'Fotoecke',
  openGraph: {
    title: 'Photo Booth Rental - DSLR & iPad Photo Booths | Fotoecke',
    description: 'Rent professional DSLR and iPad photo booths for weddings, birthdays, corporate events in Germany.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Fotoecke',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photo Booth Rental - DSLR & iPad Photo Booths | Fotoecke',
    description: 'Rent professional DSLR and iPad photo booths for weddings, birthdays, corporate events in Germany.',
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
}

interface Props {
  params: Promise<{ locale: string }>
}

// JSON-LD Structured Data Component
function StructuredData({ locale }: { locale: string }) {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Fotoecke",
    "description": "Professional photo booth rental service for weddings, parties, and corporate events",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/${locale}`,
    "telephone": "+49-XXX-XXXXXXX", // Add your actual phone number
    "email": "info@fotoecke.com", // Add your actual email
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE",
      "addressRegion": "Berlin", // Adjust to your actual region
      "addressLocality": "Berlin" // Adjust to your actual city
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.5200", // Add your actual coordinates
      "longitude": "13.4050"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "52.5200",
        "longitude": "13.4050"
      },
      "geoRadius": "25000" // 25km radius
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photo Booth Rental Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "DSLR Photo Booth Rental",
            "description": "Professional DSLR photo booth with instant printing and digital sharing"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "iPad Photo Booth Rental",
            "description": "Modern iPad photo booth with touch screen interface and instant sharing"
          }
        }
      ]
    },
    "areaServed": "Germany",
    "priceRange": "€€",
    "openingHours": "Mo-Su 00:00-23:59",
    "sameAs": [
      // Add your actual social media URLs
      "https://www.facebook.com/fotoecke",
      "https://www.instagram.com/fotoecke"
    ]
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fotoecke",
    "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
    </>
  )
}

export default async function HomePage({ params }: Props) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData locale={locale} />
      
      {/* Main content with semantic HTML structure */}
      <main>
        {/* Hero Section */}
        <section aria-label="Hero section">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section aria-label="Features and services">
          <Features />
        </section>

        {/* Content Section */}
        <section aria-label="About our services">
          <ContentSection />
        </section>

        {/* Call to Action */}
        <section aria-label="Get started">
          <CallToAction />
        </section>

        {/* FAQ Section */}
        <section aria-label="Frequently asked questions">
          <FAQsTwo />
        </section>

        {/* Pricing Section */}
        <section aria-label="Pricing and packages">
          <Pricing />
        </section>
      </main>

      {/* Footer */}
      <FooterSection />
    </>
  )
}
