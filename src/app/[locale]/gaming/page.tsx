import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { PageLayout } from '@/components/layout/PageLayout';
import { Article } from '@/types/article';
import { SITE_CONFIG } from '@/lib/config';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface GamingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata for category page SEO
export async function generateMetadata({ params }: GamingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });

  const title = `${t('gaming')} | Rui Lopes`;
  const description = locale === 'pt'
    ? 'Artigos sobre videojogos: análises completas, reviews, playthroughs e notícias. Cobertura de PlayStation, Xbox, PC e mais.'
    : 'Articles about video games: comprehensive reviews, playthroughs, gaming news and more. Coverage of PlayStation, Xbox, PC and more.';

  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.author.name }],
    keywords: locale === 'pt'
      ? ['videojogos', 'gaming', 'reviews de jogos', 'PlayStation', 'Xbox', 'análise de jogos', 'troféus platina']
      : ['video games', 'gaming', 'game reviews', 'PlayStation', 'Xbox', 'game analysis', 'platinum trophies'],
    alternates: {
      canonical: `/${locale}/gaming`,
      languages: {
        'pt': '/pt/gaming',
        'en': '/en/gaming',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/${locale}/gaming`,
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

export default async function GamingPage({ params }: GamingPageProps) {
  const { locale } = await params;

  const articleListItems = await getArticlesByCategory('gaming', locale as 'pt' | 'en');

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
        categoryKey="gaming"
        categoryIcon="🎮"
        locale={locale}
      />
    </PageLayout>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
