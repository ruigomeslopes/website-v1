import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getAllArticlesWithCategory } from '@/lib/articles';
import LatestPageClient from '@/components/article/LatestPageClient';
import { Article } from '@/types/article';
import type { Metadata } from 'next';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface LatestPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: LatestPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'latest' });

  return {
    title: `${t('title')} | Rui Lopes`,
    description: t('description'),
    openGraph: {
      title: `${t('title')} | Rui Lopes`,
      description: t('description'),
      type: 'website',
      locale: locale === 'pt' ? 'pt_PT' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | Rui Lopes`,
      description: t('description'),
    },
  };
}

export default async function LatestPage({ params: { locale } }: LatestPageProps) {
  unstable_setRequestLocale(locale);

  // Fetch all articles from all categories server-side
  const articleListItems = await getAllArticlesWithCategory(locale as 'pt' | 'en');

  // Convert to Article format for the client component
  const articles: Article[] = articleListItems.map((item) => ({
    frontmatter: item.frontmatter as any, // Cast to full ArticleFrontmatter
    content: '', // We don't need full content for listing
    readingTime: item.readingTime,
    slug: item.slug,
    locale: item.locale,
    category: item.category,
  }));

  return <LatestPageClient initialArticles={articles} locale={locale} />;
}

// Generate static params for both locales
export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
