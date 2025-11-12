import { unstable_setRequestLocale } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { Article } from '@/types/article';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface FootballPageProps {
  params: {
    locale: string;
  };
}

export default async function FootballPage({ params: { locale } }: FootballPageProps) {
  unstable_setRequestLocale(locale);

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
    <CategoryPageClient
      initialArticles={articles}
      categoryKey="football"
      categoryIcon="⚽"
      locale={locale}
    />
  );
}

// Generate static params for both locales
export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
