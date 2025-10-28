'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import type { Session } from 'next-auth'

type Props = {
  children: React.ReactNode
  locale: string
  messages: Record<string, unknown>
  session?: Session | null
  timeZone?: string
}

export default function Providers({
  children,
  locale,
  messages,
  session,
  timeZone = 'UTC',
}: Props) {
  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  )
}