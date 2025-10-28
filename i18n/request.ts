 import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'
import { getMessages } from '@/lib/getMessages'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

    let messages = {}
    try {
      messages = await getMessages(locale)
      console.log('Loaded messages for locale', locale, Object.keys(messages))
      
    } catch (err) {
      console.error('failed to load messages for locale', locale, err)
      messages = {}
    }

  return {
    locale,
    messages
  }
})
 
