'use client'

import { useParams } from 'next/navigation'
import CategoryCard from './CategoryCard'
import type { Locale } from '@/types'

export default function CategoryGrid() {
  const params = useParams()
  const locale = params.locale as Locale

  const categories = [
    { emoji: '⚽', key: 'football', href: `/${locale}/football` },
    { emoji: '🏍️', key: 'motogp', href: `/${locale}/motogp` },
    { emoji: '🎮', key: 'gaming', href: `/${locale}/gaming` },
    { emoji: '🎬', key: 'movies', href: `/${locale}/movies` },
    { emoji: '📺', key: 'tvshows', href: `/${locale}/tvshows` },
    { emoji: '📚', key: 'books', href: `/${locale}/books` },
    { emoji: '✈️', key: 'travel', href: `/${locale}/travel` },
  ]

  return (
    <section id="categories" className="py-12 md:py-16 bg-surface-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid - Responsive: 1 col mobile, 2 cols tablet, 3-4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.key}
              emoji={category.emoji}
              category={category.key}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
