'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export default function FAQsTwo() {
  const t = useTranslations('faq')
  const faqItems = t.raw('items') // grab array from JSON

  return (
    <section id='faq' className='py-16 md:py-24'>
      <div className='mx-auto max-w-5xl px-4 md:px-6'>
        <div className='mx-auto max-w-xl text-center'>
          <h2 className='text-balance text-3xl font-bold md:text-4xl lg:text-5xl'>
            {t('title')}
          </h2>
          <p className='text-muted-foreground mt-4 text-balance'>
            {t('subtitle')}
          </p>
        </div>

        <div className='mx-auto mt-12 max-w-xl'>
          <Accordion
            type='single'
            collapsible
            className='bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0'
          >
            {faqItems.map((item: any, idx: number) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className='border-dashed'
              >
                <AccordionTrigger className='cursor-pointer text-base hover:no-underline'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className='text-base'>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className='text-muted-foreground mt-6 px-8'>
            {t('footer').replace('customer support team', '')}
            <Link
              href='#'
              className='text-primary font-medium hover:underline ml-1'
            >
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
