import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Article } from '@/types/article';
import { formatDate, getCategoryFromFrontmatter } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface ArticleListItemProps {
  article: Article;
  locale: string;
}

export default function ArticleListItem({ article, locale }: ArticleListItemProps) {
  const t = useTranslations('common');
  const { slug, frontmatter, readingTime } = article;
  const { title, excerpt, image: coverImage, date: publishDate, tags } = frontmatter;

  // Determine category from frontmatter structure
  const category = getCategoryFromFrontmatter(frontmatter);
  const articleUrl = `/${locale}/${category}/${slug}`;

  return (
    <Link href={articleUrl} className="block group">
      <div className="flex gap-6 p-6 rounded-2xl border-2 border-border-primary bg-bg-primary transition-all duration-300 hover:shadow-lg hover:border-accent-primary hover:-translate-y-0.5">
        {/* Image */}
        {coverImage && (
          <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-bg-secondary border-2 border-border-primary">
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
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* Title */}
          <h3 className="text-xl font-heading font-bold text-text-primary line-clamp-2 group-hover:text-accent-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-base text-text-secondary line-clamp-2 flex-1 leading-relaxed">
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
          <div className="flex items-center gap-3 text-sm text-text-tertiary">
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
