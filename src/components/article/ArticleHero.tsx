import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/lib/utils';
import type { BaseFrontmatter } from '@/types/article';

interface ArticleHeroProps {
  frontmatter: BaseFrontmatter;
  readingTime: number;
  locale: 'pt' | 'en';
}

export default function ArticleHero({ frontmatter, readingTime, locale }: ArticleHeroProps) {
  const t = useTranslations();
  const { title, date, excerpt, image, tags } = frontmatter;

  return (
    <div className="mb-12">
      {/* Featured Image */}
      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border-2 border-border-primary">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Title */}
      <h1 className="mb-6 text-5xl font-heading font-bold leading-tight text-text-primary md:text-6xl lg:text-7xl">
        {title}
      </h1>

      {/* Excerpt */}
      <p className="mb-6 text-xl leading-relaxed text-text-secondary md:text-2xl">
        {excerpt}
      </p>

      {/* Meta Information */}
      <div className="mb-6 flex flex-wrap items-center gap-6 text-base text-text-tertiary">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" strokeWidth={2} />
          <time dateTime={date}>{formatDate(date, locale)}</time>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" strokeWidth={2} />
          <span>
            {readingTime} {t('common.minRead')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-5 w-5" strokeWidth={2} />
          <span>{t('homepage.title')}</span>
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent-primary/10 px-4 py-2 text-sm font-medium text-accent-primary transition-colors hover:bg-accent-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <hr className="mt-8 border-t-2 border-border-primary" />
    </div>
  );
}
