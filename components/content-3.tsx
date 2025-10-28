import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
    
export default function ContentSection() {
    const t = useTranslations('content')

    const safeT = (key: string, fallback?: string) => {
        try {
            return t(key)
        } catch (err) {
            console.error('Translation missing for', key, err)
            return fallback ?? key
        }
    }

    return (
        <section id='contents' className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <img
                    className="rounded-(--radius) shadow-2xl"
                    src="hero2.webp"
                    alt="team image"
                    height=""
                    width=""
                    loading="lazy"
                />

                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">{safeT('title', 'Hassle-Free & Fully customizable.')}</h2>
                    <div className="space-y-6">
                        <p>{safeT('description', 'From delivery to setup, we handle it all. Choose your backdrop, add branding, and let guests share instantly.')}</p>

                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-1.5">
                            <Link href="#">
                                <span>{safeT('button', 'Learn More')}</span>
                                <ChevronRight className="size-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
