import { unstable_setRequestLocale } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { Article } from '@/types/article';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface TVShowsPageProps {
  params: {
    locale: string;
  };
}

export default async function TVShowsPage({ params: { locale } }: TVShowsPageProps) {
  unstable_setRequestLocale(locale);

  const articleListItems = await getArticlesByCategory('tvshows', locale as 'pt' | 'en');

  const articles: Article[] = articleListItems.map((item) => ({
    frontmatter: item.frontmatter as any,
    content: '',
    readingTime: item.readingTime,
    slug: item.slug,
    locale: locale as 'pt' | 'en',
  }));

  return (
    <CategoryPageClient
      initialArticles={articles}
      categoryKey="tvshows"
      categoryIcon="📺"
      locale={locale}
    />
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
