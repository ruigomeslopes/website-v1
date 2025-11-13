'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

interface CategoryCardProps {
  emoji: string
  category: string
  href: string
}

export default function CategoryCard({ emoji, category, href }: CategoryCardProps) {
  const t = useTranslations()

  return (
    <Link
      href={href}
      className="group relative bg-bg-secondary hover:bg-bg-primary border-2 border-border-primary hover:border-brand-primary rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="flex flex-col items-center text-center">
        {/* Emoji Icon */}
        <div className="text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </div>

        {/* Category Name */}
        <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
          {t(`categories.${category}`)}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
          {t(`categoryDescriptions.${category}`)}
        </p>

        {/* Hover Arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg
            className="w-5 h-5 text-brand-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}
