'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, Trophy, Bike, Gamepad2, BookOpen, Film, Tv, Plane } from 'lucide-react';

interface TimelineArticleProps {
  title: string;
  slug: string;
  category: string;
  categoryKey: string;
  date: string;
  readingTime: number;
  description?: string;
  image: string;
  locale: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const categoryIcons = {
  football: Trophy,
  motogp: Bike,
  gaming: Gamepad2,
  books: BookOpen,
  movies: Film,
  tvshows: Tv,
  travel: Plane
};

export function TimelineArticle({
  title,
  slug,
  category,
  categoryKey,
  date,
  readingTime,
  description,
  image,
  locale,
  position = 'top'
}: TimelineArticleProps) {
  const t = useTranslations();
  const Icon = categoryIcons[categoryKey as keyof typeof categoryIcons] || BookOpen;

  const formattedDate = new Date(date).toLocaleDateString(locale === 'pt' ? 'pt-PT' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link
      href={`/${locale}/${category}/${slug}`}
      className="group block"
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl
          bg-surface-primary border-2 border-border-primary
          hover:border-accent-primary
          transition-all duration-300
          hover:shadow-xl hover:scale-[1.02]
          ${position === 'top' || position === 'bottom' ? 'w-[min(280px,16vw)] mx-auto' : 'w-full'}
          ${position === 'left' ? 'ml-auto' : ''}
          ${position === 'right' ? 'mr-auto' : ''}
        `}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-secondary">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />

          {/* Category Badge Overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary text-white text-sm font-medium shadow-lg">
            <Icon className="w-4 h-4" strokeWidth={2.5} />
            <span>{t(`categories.${categoryKey}`)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2 leading-tight group-hover:text-accent-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-text-secondary mb-4 line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-text-tertiary">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTime} {t('common.minRead')}</span>
            </div>
          </div>
        </div>

        {/* Connection Line */}
        <div
          className={`
            absolute
            ${
              position === 'bottom'
                ? 'top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 -translate-y-full'
                : position === 'top'
                ? 'bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-8 translate-y-full'
                : position === 'left'
                ? 'right-0 top-1/2 -translate-y-1/2 h-0.5 w-8 translate-x-full'
                : 'left-0 top-1/2 -translate-y-1/2 h-0.5 w-8 -translate-x-full'
            }
            bg-gradient-to-b from-accent-primary/40 to-accent-primary/10
            z-0
          `}
        />

        {/* Connection Point */}
        <div
          className={`
            absolute
            ${
              position === 'bottom'
                ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
                : position === 'top'
                ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
                : position === 'left'
                ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2'
                : 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
            }
            w-4 h-4 rounded-full
            bg-accent-primary
            border-4 border-bg-primary
            group-hover:scale-125 group-hover:shadow-lg
            transition-all duration-300
            z-10
          `}
        />
      </div>
    </Link>
  );
}
