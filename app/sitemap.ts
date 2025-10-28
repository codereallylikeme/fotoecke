import { MetadataRoute } from 'next'
import { siteDetails } from '@/data/siteDetails'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteDetails.siteUrl || 'http://localhost:3000'
  const locales = ['en', 'de'] // Add your supported locales
  
  const pages = [
    { path: '', priority: 1, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/pricing', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/gallery', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/faq', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/photo-booth-rental', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/dslr-photo-booth', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/ipad-photo-booth', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/wedding-photo-booth', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/birthday-photo-booth', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/corporate-photo-booth', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/booking', priority: 0.9, changeFreq: 'daily' as const },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate URLs for each locale
  locales.forEach(locale => {
    pages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map(loc => [loc, `${baseUrl}/${loc}${page.path}`])
          )
        }
      })
    })
  })

  return sitemapEntries
}