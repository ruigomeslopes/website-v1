import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Article } from '@/types/article';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface ArticleListItemProps {
  article: Article;
  locale: string;
}

export default function ArticleListItem({ article, locale }: ArticleListItemProps) {
  const t = useTranslations('common');
  const { slug, frontmatter, readingTime } = article;
  const { title, excerpt, image: coverImage, date: publishDate, tags } = frontmatter;

  // Determine category from frontmatter
  let category = 'football';
  if ('teams' in frontmatter) category = 'football';
  else if ('gpName' in frontmatter) category = 'motogp';
  else if ('platform' in frontmatter && 'developer' in frontmatter) category = 'gaming';
  else if ('director' in frontmatter) category = 'movies';
  else if ('creator' in frontmatter) category = 'tvshows';
  else if ('author' in frontmatter) category = 'books';
  else if ('destination' in frontmatter) category = 'travel';

  const articleUrl = `/${locale}/${category}/${slug}`;

  return (
    <Link href={articleUrl} className="block group">
      <div className="flex gap-6 p-4 rounded-lg border border-[var(--border)] bg-[var(--background-primary)] transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-primary)]">
        {/* Image */}
        {coverImage && (
          <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="192px"
            />
            {/* Language Badge */}
            <div className="absolute top-2 right-2">
              <Badge variant="default" size="sm" className="bg-black/70 text-white border-0 backdrop-blur-sm">
                {locale.toUpperCase()}
              </Badge>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Title */}
          <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-[var(--text-secondary)] line-clamp-2 flex-1">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
              {tags.length > 4 && (
                <Badge variant="secondary" size="sm">
                  +{tags.length - 4}
                </Badge>
              )}
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
            <time dateTime={publishDate}>
              {formatDate(publishDate, locale as 'pt' | 'en')}
            </time>
            <span>•</span>
            <span>{readingTime} {t('minRead')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
