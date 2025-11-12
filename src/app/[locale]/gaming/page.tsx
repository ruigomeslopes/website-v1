import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { Article } from '@/types/article';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface GamingPageProps {
  params: Promise<{
    locale: string;
  }>;
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
    <CategoryPageClient
      initialArticles={articles}
      categoryKey="gaming"
      categoryIcon="🎮"
      locale={locale}
    />
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
