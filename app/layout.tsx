import { NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { redirect } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout just handles the root structure
  // All the real logic is in [locale]/layout.tsx
  return children
}