import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { PageLayout } from '@/components/layout/PageLayout';
import { Article } from '@/types/article';
import { SITE_CONFIG } from '@/lib/config';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface TravelPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata for category page SEO
export async function generateMetadata({ params }: TravelPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });

  const title = `${t('travel')} | Rui Lopes`;
  const description = locale === 'pt'
    ? 'Artigos sobre viagens: guias de destinos, dicas de viagem, reviews de locais e experiências. Descubra os melhores destinos em Portugal e no mundo.'
    : 'Articles about travel: destination guides, travel tips, location reviews and experiences. Discover the best destinations in Portugal and worldwide.';

  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.author.name }],
    keywords: locale === 'pt'
      ? ['viagens', 'guias de viagem', 'destinos', 'dicas de viagem', 'turismo', 'Portugal', 'Europa']
      : ['travel', 'travel guides', 'destinations', 'travel tips', 'tourism', 'Portugal', 'Europe'],
    alternates: {
      canonical: `/${locale}/travel`,
      languages: {
        'pt': '/pt/travel',
        'en': '/en/travel',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/${locale}/travel`,
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

export default async function TravelPage({ params }: TravelPageProps) {
  const { locale } = await params;

  const articleListItems = await getArticlesByCategory('travel', locale as 'pt' | 'en');

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
        categoryKey="travel"
        categoryIcon="✈️"
        locale={locale}
      />
    </PageLayout>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
