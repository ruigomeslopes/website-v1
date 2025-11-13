'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Calendar, Clock, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { ArticleWithCategory } from '@/types/article'

interface TimelineArticleCardProps {
  article: ArticleWithCategory
  locale: string
}

export default function TimelineArticleCard({ article, locale }: TimelineArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const categoryIcons: Record<string, string> = {
    football: '⚽',
    motogp: '🏍️',
    gaming: '🎮',
    books: '📚',
    movies: '🎬',
    tvshows: '📺',
    travel: '✈️',
  }

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.date))

  return (
    <Link
      href={`/${locale}/${article.category}/${article.slug}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article
        className={`
          relative flex flex-col
          w-80 h-[30rem]
          rounded-2xl
          border-2 border-border-primary
          bg-surface-primary
          overflow-hidden
          transition-all duration-400 ease-out
          ${isHovered ? 'scale-110 shadow-2xl border-accent-primary' : 'scale-100 shadow-lg'}
        `}
        style={{
          transformOrigin: 'center',
        }}
      >
        {/* Image Container (60% height) */}
        <div className="relative h-[60%] overflow-hidden">
          <div
            className={`
              relative w-full h-full
              transition-transform duration-500 ease-out
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
          >
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="320px"
              />
            ) : (
              <div className="w-full h-full bg-bg-tertiary flex items-center justify-center">
                <span className="text-6xl">{categoryIcons[article.category] || '📄'}</span>
              </div>
            )}
          </div>

          {/* Category Badge (top-left) */}
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={article.category as any}>
              <span className="mr-1">{categoryIcons[article.category]}</span>
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Content Container (40% height) */}
        <div className="relative h-[40%] p-5 flex flex-col justify-between">
          {/* Title & Description */}
          <div className="space-y-2">
            <h3
              className={`
                text-xl font-bold leading-tight
                text-text-primary
                line-clamp-2
                transition-colors duration-300
                ${isHovered ? 'text-accent-primary' : ''}
              `}
            >
              {article.title}
            </h3>

            {article.description && (
              <p
                className={`
                  text-sm text-text-secondary
                  line-clamp-2
                  transition-all duration-300
                  ${isHovered ? 'line-clamp-3' : 'line-clamp-2'}
                `}
              >
                {article.description}
              </p>
            )}
          </div>

          {/* Metadata & Tags (shown on hover) */}
          <div className="space-y-3">
            {/* Always visible metadata */}
            <div className="flex items-center gap-4 text-xs text-text-tertiary">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime} min
              </span>
            </div>

            {/* Tags (shown on hover) */}
            {article.tags && article.tags.length > 0 && (
              <div
                className={`
                  flex items-center gap-2 flex-wrap
                  transition-all duration-300
                  ${isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}
                `}
              >
                <Tag className="w-3.5 h-3.5 text-text-tertiary flex-shrink-0" />
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-bg-tertiary text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* "Read Article" button (shown on hover) */}
            <div
              className={`
                transition-all duration-300
                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}
            >
              <span className="text-sm font-medium text-accent-primary">
                Ler artigo →
              </span>
            </div>
          </div>
        </div>

        {/* Hover Border Glow Effect */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `0 0 30px rgba(var(--accent-primary), 0.3)`,
            }}
          />
        )}
      </article>
    </Link>
  )
}
