'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export default function Hero() {
  const t = useTranslations()

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories')
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Avatar */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 ring-4 ring-brand-primary/20">
            <Image
              src="/images/avatar.jpg"
              alt="Rui Lopes"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Name & Title */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-3">
            {t('homepage.title')}
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-brand-primary font-medium mb-6">
            {t('header.tagline')}
          </p>

          {/* Intro */}
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mb-8">
            {t('homepage.intro')}
          </p>

          {/* CTA Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToCategories}
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            {t('homepage.exploreContent')}
          </Button>
        </div>
      </div>
    </section>
  )
}
