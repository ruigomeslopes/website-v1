import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { PageLayout } from '@/components/layout/PageLayout';
import { Article } from '@/types/article';
import { SITE_CONFIG } from '@/lib/config';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface FootballPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata for category page SEO
export async function generateMetadata({ params }: FootballPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });

  const title = `${t('football')} | Rui Lopes`;
  const description = locale === 'pt'
    ? 'Artigos sobre futebol: análises táticas, crónicas de jogos, opiniões e muito mais. Cobertura da Premier League, La Liga, Champions League e mais.'
    : 'Articles about football: tactical analysis, match reports, opinions and more. Coverage of Premier League, La Liga, Champions League and more.';

  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.author.name }],
    keywords: locale === 'pt'
      ? ['futebol', 'análise tática', 'Premier League', 'La Liga', 'Champions League', 'crónicas de futebol']
      : ['football', 'tactical analysis', 'Premier League', 'La Liga', 'Champions League', 'football reports'],
    alternates: {
      canonical: `/${locale}/football`,
      languages: {
        'pt': '/pt/football',
        'en': '/en/football',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/${locale}/football`,
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

export default async function FootballPage({ params }: FootballPageProps) {
  const { locale } = await params;

  // Fetch articles server-side
  const articleListItems = await getArticlesByCategory('football', locale as 'pt' | 'en');

  // Convert ArticleListItem to Article format for the client component
  const articles: Article[] = articleListItems.map((item) => ({
    frontmatter: item.frontmatter as any, // Cast to full ArticleFrontmatter
    content: '', // We don't need full content for listing
    readingTime: item.readingTime,
    slug: item.slug,
    locale: locale as 'pt' | 'en',
  }));

  return (
    <PageLayout>
      <CategoryPageClient
        initialArticles={articles}
        categoryKey="football"
        categoryIcon="⚽"
        locale={locale}
      />
    </PageLayout>
  );
}

// Generate static params for both locales
export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
