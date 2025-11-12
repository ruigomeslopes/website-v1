import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { PageLayout } from '@/components/layout/PageLayout';
import { Article } from '@/types/article';
import { SITE_CONFIG } from '@/lib/config';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface MoviesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata for category page SEO
export async function generateMetadata({ params }: MoviesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });

  const title = `${t('movies')} | Rui Lopes`;
  const description = locale === 'pt'
    ? 'Artigos sobre filmes: reviews, análises cinematográficas, críticas e comentários. Cobertura de cinema clássico, blockbusters e cinema independente.'
    : 'Articles about movies: reviews, film analysis, critiques and commentary. Coverage of classic cinema, blockbusters and indie films.';

  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.author.name }],
    keywords: locale === 'pt'
      ? ['filmes', 'cinema', 'reviews de filmes', 'análise cinematográfica', 'críticas de cinema', 'cinema independente']
      : ['movies', 'cinema', 'film reviews', 'film analysis', 'movie critiques', 'indie cinema'],
    alternates: {
      canonical: `/${locale}/movies`,
      languages: {
        'pt': '/pt/movies',
        'en': '/en/movies',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/${locale}/movies`,
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

export default async function MoviesPage({ params }: MoviesPageProps) {
  const { locale } = await params;

  const articleListItems = await getArticlesByCategory('movies', locale as 'pt' | 'en');

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
        categoryKey="movies"
        categoryIcon="🎬"
        locale={locale}
      />
    </PageLayout>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
