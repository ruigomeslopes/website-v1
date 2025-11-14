import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Category } from '@/types/article';
import { SITE_CONFIG } from '@/lib/config';

interface BreadcrumbsProps {
  category: Category;
  articleTitle: string;
  locale: 'pt' | 'en';
  articleSlug?: string;
}

export default function Breadcrumbs({ category, articleTitle, locale, articleSlug }: BreadcrumbsProps) {
  const t = useTranslations();
  const homeText = t('navigation.home');
  const categoryName = t(`categories.${category}`);

  // Generate JSON-LD structured data for breadcrumbs
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': homeText,
        'item': `${SITE_CONFIG.baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': categoryName,
        'item': `${SITE_CONFIG.baseUrl}/${locale}/${category}`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': articleTitle,
        'item': articleSlug
          ? `${SITE_CONFIG.baseUrl}/${locale}/${category}/${articleSlug}`
          : undefined,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
        {/* Home */}
        <li>
          <Link
            href={`/${locale}`}
            className="hover:text-accent-primary transition-colors"
          >
            {homeText}
          </Link>
        </li>

        {/* Separator */}
        <li>
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </li>

        {/* Category */}
        <li>
          <Link
            href={`/${locale}/${category}`}
            className="hover:text-accent-primary transition-colors"
          >
            {categoryName}
          </Link>
        </li>

        {/* Separator */}
        <li>
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </li>

        {/* Current Article */}
        <li>
          <span className="line-clamp-1 font-medium text-text-primary">
            {articleTitle}
          </span>
        </li>
      </ol>
    </nav>
    </>
  );
}
