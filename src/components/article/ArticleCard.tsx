import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Article } from '@/types/article';
import { formatDate, getCategoryFromFrontmatter } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { getImagePath } from '@/utils/getImagePath';

interface ArticleCardProps {
  article: Article;
  locale: string;
}

export default function ArticleCard({ article, locale }: ArticleCardProps) {
  const t = useTranslations('common');
  const { slug, frontmatter, content, readingTime } = article;
  const { title, excerpt, image: coverImage, date: publishDate, tags } = frontmatter;

  // Determine category from frontmatter structure
  const category = getCategoryFromFrontmatter(frontmatter);
  const articleUrl = `/${category}/${slug}`;

  return (
    <Link href={articleUrl} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Cover Image */}
        {coverImage && (
          <div className="relative aspect-video w-full overflow-hidden bg-bg-secondary">
            <Image
              src={getImagePath(coverImage)}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Language Badge */}
            <div className="absolute top-3 right-3">
              <Badge variant="default" size="sm" className="bg-black/70 text-white border-0 backdrop-blur-sm">
                {locale.toUpperCase()}
              </Badge>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col gap-3">
          {/* Title */}
          <h3 className="text-xl font-heading font-bold text-text-primary line-clamp-2 group-hover:text-accent-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-text-secondary line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" size="sm">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-text-tertiary pt-2 border-t border-border-primary">
            <time dateTime={publishDate}>
              {formatDate(publishDate, locale as 'pt' | 'en')}
            </time>
            <span>•</span>
            <span>{readingTime} {t('minRead')}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
