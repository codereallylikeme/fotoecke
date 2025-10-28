'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Pricing() {
  const t = useTranslations('pricing')
  const plans = t.raw('plans') // get plans array

  return (
    <section id='pricing' className='py-16 md:py-32'>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='mx-auto max-w-2xl space-y-6 text-center'>
          <h1 className='text-center text-4xl font-semibold lg:text-5xl'>
            {t('title')}
          </h1>
          <p>{t('subtitle')}</p>
        </div>

        <div className='mt-8 grid gap-6 md:mt-20 md:grid-cols-3'>
          {plans.map((plan: any, index: number) => (
            <Card key={index} className='relative flex flex-col'>
              {plan.badge && (
                <span className='bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5'>
                  {plan.badge}
                </span>
              )}

              <CardHeader>
                <CardTitle className='font-medium'>{plan.name}</CardTitle>
                <span className='my-3 block text-2xl font-semibold'>
                  {plan.price}
                </span>

                <Button
                  asChild
                  variant={index === 1 ? 'default' : 'outline'}
                  className='mt-4 w-full'
                >
                  <Link href='#'>{plan.button}</Link>
                </Button>
              </CardHeader>

              <CardContent className='space-y-4'>
                <hr className='border-dashed' />
                <ul className='list-outside space-y-3 text-sm'>
                  {plan.features.map((feature: string, i: number) => (
                    <li key={i} className='flex items-center gap-2'>
                      <Check className='size-3' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
