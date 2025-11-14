'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import TimelineArticleCard from './TimelineArticleCard'
import type { ArticleWithCategory } from '@/types/article'

interface TimelineHorizontalProps {
  articles: ArticleWithCategory[]
  locale: string
}

interface ArticlesByPeriod {
  year: number
  month: number
  monthName: string
  articles: ArticleWithCategory[]
}

export default function TimelineHorizontal({ articles, locale }: TimelineHorizontalProps) {
  const t = useTranslations('timeline')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Group articles by year and month
  const articlesByPeriod: ArticlesByPeriod[] = articles.reduce((acc, article) => {
    const date = new Date(article.date)
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthName = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)

    const existingPeriod = acc.find(p => p.year === year && p.month === month)

    if (existingPeriod) {
      existingPeriod.articles.push(article)
    } else {
      acc.push({
        year,
        month,
        monthName,
        articles: [article]
      })
    }

    return acc
  }, [] as ArticlesByPeriod[])

  // Sort periods by date (newest first)
  articlesByPeriod.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year
    return b.month - a.month
  })

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px threshold

    // Calculate progress percentage
    const maxScroll = scrollWidth - clientWidth
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
    setScrollProgress(progress)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    updateScrollButtons()

    container.addEventListener('scroll', updateScrollButtons, { passive: true })
    window.addEventListener('resize', updateScrollButtons, { passive: true })

    return () => {
      container.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 400 // Scroll by ~1 card width
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount)

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative py-20 bg-bg-secondary overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            {t('title', { defaultValue: 'Linha Cronológica' })}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('subtitle', { defaultValue: 'Explora os artigos organizados cronologicamente' })}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-primary transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className={`
                absolute left-0 top-1/2 -translate-y-1/2 z-20
                w-12 h-12 rounded-full
                bg-bg-primary border-2 border-border-primary
                shadow-lg hover:shadow-xl
                flex items-center justify-center
                transition-all duration-300
                hover:bg-accent-primary hover:text-white hover:border-accent-primary
                hidden lg:flex
              `}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className={`
                absolute right-0 top-1/2 -translate-y-1/2 z-20
                w-12 h-12 rounded-full
                bg-bg-primary border-2 border-border-primary
                shadow-lg hover:shadow-xl
                flex items-center justify-center
                transition-all duration-300
                hover:bg-accent-primary hover:text-white hover:border-accent-primary
                hidden lg:flex
              `}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Horizontal Timeline */}
          <div
            ref={scrollContainerRef}
            className={`
              flex gap-16 overflow-x-auto
              px-4 lg:px-16
              pb-8
              scroll-smooth
              snap-x snap-mandatory
              scrollbar-hide
            `}
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
            }}
          >
            {articlesByPeriod.map((period, periodIndex) => {
              const isNewYear =
                periodIndex === 0 ||
                period.year !== articlesByPeriod[periodIndex - 1].year

              return (
                <div
                  key={`${period.year}-${period.month}`}
                  className="flex-shrink-0 snap-start"
                >
                  {/* Period Label */}
                  <div className="mb-8 text-center">
                    {isNewYear && (
                      <div className="text-3xl font-bold text-accent-primary mb-2">
                        {period.year}
                      </div>
                    )}
                    <div className="text-lg font-medium text-text-secondary">
                      {period.monthName}
                    </div>
                  </div>

                  {/* Articles Grid */}
                  <div className="flex gap-6">
                    {period.articles.map((article) => (
                      <div key={article.slug} className="snap-start">
                        <TimelineArticleCard article={article} locale={locale} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="lg:hidden mt-6 text-center text-sm text-text-tertiary">
          ← {t('scrollHint', { defaultValue: 'Desliza para ver mais' })} →
        </div>
      </div>

      {/* Global CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
