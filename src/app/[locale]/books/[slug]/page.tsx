import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getAllArticlePaths, getArticlesByCategory } from '@/lib/articles';
import ArticleLayout from '@/components/article/ArticleLayout';
import ArticleHero from '@/components/article/ArticleHero';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import BookInfoCard from '@/components/category-specific/books/BookInfoCard';
import ShareButtons from '@/components/article/ShareButtons';
import RelatedArticles from '@/components/article/RelatedArticles';
import StructuredData from '@/components/StructuredData';
import { Article } from '@/types/article';

interface PageProps {
  params: Promise<{
    locale: 'pt' | 'en';
    slug: string;
  }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const paths = getAllArticlePaths('books');
  return paths.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const article = await getArticle('books', slug, locale);
    const { frontmatter } = article;

    return {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      authors: [{ name: 'Rui Lopes' }],
      keywords: frontmatter.tags,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.excerpt,
        images: [frontmatter.image],
        type: 'article',
        locale: locale === 'pt' ? 'pt_PT' : 'en_US',
        publishedTime: frontmatter.date,
        modifiedTime: frontmatter.date,
        authors: ['Rui Lopes'],
        tags: frontmatter.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.title,
        description: frontmatter.excerpt,
        images: [frontmatter.image],
        creator: '@ruilopes',
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
    };
  }
}

export default async function BooksArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;

  let article;
  try {
    article = await getArticle('books', slug, locale);
  } catch (error) {
    notFound();
  }

  const { frontmatter, content, readingTime } = article;

  // Fetch all books articles for related articles
  const allArticleItems = await getArticlesByCategory('books', locale);
  const allArticles: Article[] = allArticleItems.map((item) => ({
    frontmatter: item.frontmatter as any,
    content: '',
    readingTime: item.readingTime,
    slug: item.slug,
    locale,
    category: 'books',
  }));

  // Construct full article URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ruilopes.com';
  const articleUrl = `${baseUrl}/${locale}/books/${slug}`;

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="article"
        data={{
          headline: frontmatter.title,
          description: frontmatter.excerpt,
          image: frontmatter.image,
          datePublished: frontmatter.date,
          dateModified: frontmatter.date,
          author: { name: 'Rui Lopes' },
          publisher: {
            name: 'Rui Lopes',
            logo: 'https://ruilopes.github.io/rl-v1/avatar.jpg',
          },
          url: articleUrl,
          keywords: frontmatter.tags,
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs category="books" articleTitle={frontmatter.title} locale={locale} />

        {/* Article Hero */}
        <ArticleHero frontmatter={frontmatter} readingTime={readingTime} locale={locale} />

        {/* Books-Specific Components */}
        {(frontmatter as any).author && (frontmatter as any).pages && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <BookInfoCard
              author={(frontmatter as any).author}
              genre={(frontmatter as any).genre}
              pages={(frontmatter as any).pages}
              dateRead={(frontmatter as any).dateRead}
              rating={(frontmatter as any).rating}
            />
          </div>
        )}

        {/* Article Content */}
        <ArticleLayout>
          <div dangerouslySetInnerHTML={{ __html: content }} />

          {/* Share Buttons */}
          <ShareButtons title={frontmatter.title} url={articleUrl} />
        </ArticleLayout>
      </div>

      {/* Related Articles */}
      <RelatedArticles
        currentArticle={{ ...article, locale, category: 'books' }}
        allArticles={allArticles}
        locale={locale}
      />
    </div>
  );
}
