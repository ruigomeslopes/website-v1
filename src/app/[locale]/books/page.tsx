import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getArticlesByCategory } from '@/lib/articles';
import CategoryPageClient from '@/components/article/CategoryPageClient';
import { PageLayout } from '@/components/layout/PageLayout';
import { Article } from '@/types/article';
import { SITE_CONFIG } from '@/lib/config';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface BooksPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata for category page SEO
export async function generateMetadata({ params }: BooksPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });

  const title = `${t('books')} | Rui Lopes`;
  const description = locale === 'pt'
    ? 'Artigos sobre livros: análises literárias, reviews, listas de leitura e recomendações. Ficção, não-ficção e muito mais.'
    : 'Articles about books: literary analysis, reviews, reading lists and recommendations. Fiction, non-fiction and more.';

  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.author.name }],
    keywords: locale === 'pt'
      ? ['livros', 'reviews de livros', 'análise literária', 'listas de leitura', 'recomendações de livros', 'literatura']
      : ['books', 'book reviews', 'literary analysis', 'reading lists', 'book recommendations', 'literature'],
    alternates: {
      canonical: `/${locale}/books`,
      languages: {
        'pt': '/pt/books',
        'en': '/en/books',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/${locale}/books`,
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

export default async function BooksPage({ params }: BooksPageProps) {
  const { locale } = await params;

  const articleListItems = await getArticlesByCategory('books', locale as 'pt' | 'en');

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
        categoryKey="books"
        categoryIcon="📚"
        locale={locale}
      />
    </PageLayout>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
