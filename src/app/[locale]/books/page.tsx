import { unstable_setRequestLocale } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { Article } from '@/types/article';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface BooksPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BooksPage({ params }: BooksPageProps) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const articleListItems = await getArticlesByCategory('books', locale as 'pt' | 'en');

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
      categoryKey="books"
      categoryIcon="📚"
      locale={locale}
    />
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
