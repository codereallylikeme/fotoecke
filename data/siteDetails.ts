export const siteDetails = {
  siteName: 'Fotoecke',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
  metadata: {
    title: 'Fotoecke - Professional Photo Booth Rental',
    description:
      'Rent professional DSLR and iPad photo booths for weddings, parties, and corporate events in Germany. Free setup within 25km radius. Instant digital sharing and high-quality prints..',
  },
  language: 'en-us',
  locale: 'en-US',
  siteLogo: `${process.env.BASE_PATH || ''}/fotoecke.png`,
  googleAnalyticsId: '', // e.g. G-XXXXXXX
}
