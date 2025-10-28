import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Settings2, Sparkles,  } from 'lucide-react'
import { LuImages, LuSend, LuPrinterCheck} from 'react-icons/lu'
import { ReactNode } from 'react'
import {useTranslations}  from 'next-intl'

export default function Features() {
    const t = useTranslations('features')
    const safeT = (key: string, fallback?: string) => {
      try {
        return t(key)
      } catch (err) {
        console.error('Translation missing for', key, err)
        return fallback ?? key
      }
    }


    return (
      <section
        id='features'
        className='bg-zinc-50 py-16 md:py-32 dark:bg-transparent'
      >
        <div className='@container mx-auto max-w-5xl px-6'>
          <div className='text-center'>
            <h2 className='text-balance text-4xl font-semibold lg:text-5xl'>
              {safeT('title', 'More than just a Photo Booth')}
            </h2>
            <p className='mt-4'>
              {safeT('subtitle', 'An elegant experience built on quality, convenience, and style.')}
            </p>
          </div>
          <div className='@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16'>
            <Card className='group shadow-zinc-950/5'>
              <CardHeader className='pb-3'>
                <CardDecorator>
                  <LuImages className='size-6' aria-hidden />
                </CardDecorator>

                <h3 className='mt-6 font-medium'>{safeT('cards.gallery.title', 'Photo Gallery/Portfolio')}</h3>
              </CardHeader>

              <CardContent>
                <p className='text-sm'>
                  {safeT('cards.gallery.description', 'Showcase your best work with a stunning photo gallery. Highlight your unique style and attract potential clients with ease.')}
                </p>
              </CardContent>
            </Card>

            <Card className='group shadow-zinc-950/5'>
              <CardHeader className='pb-3'>
                <CardDecorator>
                  <LuSend className='size-6' aria-hidden />
                </CardDecorator>

                <h3 className='mt-6 font-medium'>{safeT('cards.sharing.title', 'Instant Photo sharing')}</h3>
              </CardHeader>

              <CardContent>
                <p className='mt-3 text-sm'>
                  {safeT('cards.sharing.description', 'Let your guests take their memories home immediately! With our instant system, photos can be sent via QR code, email, or text—perfect for posting straight to social media.')}
                </p>
              </CardContent>
            </Card>

            <Card className='group shadow-zinc-950/5'>
              <CardHeader className='pb-3'>
                <CardDecorator>
                  <LuPrinterCheck className='size-6' aria-hidden />
                </CardDecorator>

                <h3 className='mt-6 font-medium'>
                  {safeT('cards.printing.title', 'Custom Print & Frame Options')}
                </h3>
              </CardHeader>

              <CardContent>
                <p className='mt-3 text-sm'>
                  {safeT('cards.printing.description', 'Your event, your style. Choose from a variety of print sizes, layouts, and frames, all personalized with your event logo, colors, or theme. It’s more than just a photo—it’s a keepsake.')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
