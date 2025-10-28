'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { menuItems } from '@/data/menuItemsDetails'
import { useTranslations, useLocale } from 'next-intl'
import LanguageSwitcher from '@/components/languageSwitcher'
import { useSession, signIn, signOut } from 'next-auth/react'

export const HeroHeader = () => {
  const t = useTranslations('header')
  const locale = useLocale() ?? 'en'
  const { data: session } = useSession()
  const [menuState, setMenuState] = useState(false)

  // Safe translation helper - moved inside component
  const safeT = (key: string, fallback?: string) => {
    try {
      return t(key)
    } catch {
      console.warn(`Translation missing for key: header.${key}`)
      return fallback || key
    }
  }

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    setMenuState(false)
    const element = document.querySelector(href)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const renderMenu = (isMobile = false) => (
    <ul className={isMobile ? 'space-y-6 text-base' : 'flex gap-8 text-sm'}>
      {menuItems.map((item) => {
        const lookupKey = `menu.${String(item.key).toLowerCase()}`
        return (
          <li key={item.key}>
            <Link
              href={item.url}
              onClick={(e) => !isMobile && handleScroll(e, item.url)}
              className='text-muted-foreground hover:text-accent-foreground block duration-150'
            >
              <span>{safeT(lookupKey, item.key)}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className='bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl'
      >
        <div className='mx-auto max-w-6xl px-6 transition-all duration-300'>
          <div className='relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4'>
            {/* Logo */}
            <div className='flex w-full items-center justify-between gap-12 lg:w-auto'>
              <Link
                href='/'
                aria-label='home'
                className='flex items-center space-x-2'
              >
                <Image
                  src='/fotoecke.png'
                  alt='fotoecke Logo'
                  width={100}
                  height={100}
                />
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMenuState((s) => !s)}
                aria-label={
                  menuState
                    ? safeT('aria.closeMenu', 'Close menu')
                    : safeT('aria.openMenu', 'Open menu')
                }
                className='relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden'
              >
                <Menu className='m-auto size-6 duration-200' />
                <X className='absolute inset-0 m-auto size-6 opacity-200 duration-200' />
              </button>

              {/* Desktop menu */}
              <div className='hidden lg:block'>{renderMenu(false)}</div>
            </div>

            {/* Right section (auth + language switcher) */}
            <div className='bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none'>
              <div className='lg:hidden'>{renderMenu(true)}</div>

              <div className='flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit'>
                {!session?.user ? (
                  <>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => signIn()}
                    >
                      {safeT('buttons.login', 'Login')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant='outline' size='sm'>
                      <Link href='/profile'>Profile</Link>
                    </Button>
                    <Button
                      size='sm'
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      {safeT('buttons.logout', 'Logout')}
                    </Button>
                  </>
                )}
              </div>

              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
