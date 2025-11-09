import { notFound } from 'next/navigation'

const validLocales = ['en', 'de'] as const
type Locale = typeof validLocales[number]

export async function getMessages(locale: string): Promise<Record<string, any>> {
  // Validate locale first
  if (!validLocales.includes(locale as Locale)) {
    console.warn(`Invalid locale requested: ${locale}`)
    notFound()
  }

  try {
    // Import all message files dynamically
    const [
      hero,
      header,
      callToAction,
      faq,
      features,
      content,
      booking,
      bookingThankYou,
      demo,
      pricing
    ] = await Promise.all([
      import(`@/messages/${locale}/hero.json`),
      import(`@/messages/${locale}/header.json`),
      import(`@/messages/${locale}/callToAction.json`),
      import(`@/messages/${locale}/faq.json`),
      import(`@/messages/${locale}/features.json`),
      import(`@/messages/${locale}/content.json`),
      import(`@/messages/${locale}/booking.json`),
      import(`@/messages/${locale}/bookingThankYou.json`),
      import(`@/messages/${locale}/demo.json`),
      import(`@/messages/${locale}/pricing.json`)
    ])

    const messages = {
      hero: hero.default,
      header: header.default,
      callToAction: callToAction.default,
      faq: faq.default,
      features: features.default,
      content: content.default,
      booking: booking.default,
      bookingThankYou: bookingThankYou.default,
      demo: demo.default,
      pricing: pricing.default
    }

    console.log(`✅ Loaded messages for locale ${locale}:`, Object.keys(messages))
    return messages

  } catch (error) {
    console.error(`❌ Failed to load messages for locale ${locale}:`, error)
    throw new Error(`Failed to load messages for locale: ${locale}`)
  }
}