import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { PageLayout } from '@/components/layout/PageLayout';
import { Article } from '@/types/article';
import { SITE_CONFIG } from '@/lib/config';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface TVShowsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata for category page SEO
export async function generateMetadata({ params }: TVShowsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });

  const title = `${t('tvshows')} | Rui Lopes`;
  const description = locale === 'pt'
    ? 'Artigos sobre séries de TV: reviews, análises de episódios, recomendações de streaming e muito mais. Cobertura de Netflix, HBO, Prime Video e mais.'
    : 'Articles about TV shows: reviews, episode analysis, streaming recommendations and more. Coverage of Netflix, HBO, Prime Video and more.';

  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.author.name }],
    keywords: locale === 'pt'
      ? ['séries', 'TV shows', 'reviews de séries', 'Netflix', 'HBO', 'streaming', 'recomendações de séries']
      : ['TV shows', 'series', 'show reviews', 'Netflix', 'HBO', 'streaming', 'show recommendations'],
    alternates: {
      canonical: `/${locale}/tvshows`,
      languages: {
        'pt': '/pt/tvshows',
        'en': '/en/tvshows',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/${locale}/tvshows`,
      siteName: SITE_CONFIG.siteName,
      locale: locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE_CONFIG.author.twitter,
    },
  };
}

export default async function TVShowsPage({ params }: TVShowsPageProps) {
  const { locale } = await params;

  const articleListItems = await getArticlesByCategory('tvshows', locale as 'pt' | 'en');

  const articles: Article[] = articleListItems.map((item) => ({
    frontmatter: item.frontmatter as any,
    content: '',
    readingTime: item.readingTime,
    slug: item.slug,
    locale: locale as 'pt' | 'en',
  }));

  return (
    <PageLayout>
      <CategoryPageClient
        initialArticles={articles}
        categoryKey="tvshows"
        categoryIcon="📺"
        locale={locale}
      />
    </PageLayout>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
