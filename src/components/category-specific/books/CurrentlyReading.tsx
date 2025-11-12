import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Article } from '@/types/article';

interface CurrentlyReadingProps {
  article: Article | null;
  locale: string;
}

export default function CurrentlyReading({ article, locale }: CurrentlyReadingProps) {
  const t = useTranslations('article');

  if (!article) return null;

  // Check if article has required fields for currently reading
  const frontmatter = article.frontmatter as any;
  const currentPage = frontmatter.currentPage || 0;
  const totalPages = frontmatter.pages || 0;

  if (!currentPage || !totalPages) return null;

  const progress = Math.round((currentPage / totalPages) * 100);

  return (
    <div className="bg-bg-secondary border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📖</span>
        <h3 className="text-lg font-bold text-text-primary">
          {t('currentlyReading')}
        </h3>
      </div>

      <Link
        href={`/${locale}/books/${article.slug}`}
        className="block mb-4 hover:text-accent transition-colors"
      >
        <h4 className="font-semibold text-text-primary mb-1">
          {article.frontmatter.title}
        </h4>
        {frontmatter.author && (
          <p className="text-sm text-text-secondary">
            {t('by')} {frontmatter.author}
          </p>
        )}
      </Link>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-text-secondary">
          <span>
            {t('progress')}: {currentPage} / {totalPages} {t('pages')}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-2 overflow-hidden">
          <div
            className="bg-accent h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
