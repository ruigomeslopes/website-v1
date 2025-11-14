import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { PageLayout } from '@/components/layout/PageLayout';
import { Article } from '@/types/article';
import { SITE_CONFIG } from '@/lib/config';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface MotoGPPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata for category page SEO
export async function generateMetadata({ params }: MotoGPPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });

  const title = `${t('motogp')} | Rui Lopes`;
  const description = locale === 'pt'
    ? 'Artigos sobre MotoGP: análises de corridas, perfis de pilotos, campeonatos e muito mais. Cobertura completa do Mundial de MotoGP, Moto2 e Moto3.'
    : 'Articles about MotoGP: race analysis, rider profiles, championships and more. Full coverage of MotoGP World Championship, Moto2 and Moto3.';

  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.author.name }],
    keywords: locale === 'pt'
      ? ['MotoGP', 'motociclismo', 'corridas de motos', 'análise de corridas', 'pilotos', 'Mundial de MotoGP']
      : ['MotoGP', 'motorcycle racing', 'race analysis', 'riders', 'MotoGP World Championship', 'motorsport'],
    alternates: {
      canonical: `/${locale}/motogp`,
      languages: {
        'pt': '/pt/motogp',
        'en': '/en/motogp',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/${locale}/motogp`,
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

export default async function MotoGPPage({ params }: MotoGPPageProps) {
  const { locale } = await params;

  const articleListItems = await getArticlesByCategory('motogp', locale as 'pt' | 'en');

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
        categoryKey="motogp"
        categoryIcon="🏍️"
        locale={locale}
      />
    </PageLayout>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
