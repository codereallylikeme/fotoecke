import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for:
  // - API routes
  // - Static files (images, css, js, etc.)
  // - Next.js internal files
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.includes('.') || // This catches .jpg, .png, .css, .js, etc.
      pathname.startsWith('/favicon')) {
    return NextResponse.next()
  }

  // Handle root path - redirect to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }

  // Check if path has valid locale
  const validLocales = ['en', 'de']
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  // If no valid locale, redirect to /en + path
  if (!validLocales.includes(firstSegment)) {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Be more specific about what to match
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ]
}
