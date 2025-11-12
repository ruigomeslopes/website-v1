import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getAllArticlePaths, getArticlesByCategory } from '@/lib/articles';
import { unstable_setRequestLocale } from 'next-intl/server';
import ArticleLayout from '@/components/article/ArticleLayout';
import ArticleHero from '@/components/article/ArticleHero';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import MediaInfoCard from '@/components/category-specific/media/MediaInfoCard';
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
  const paths = getAllArticlePaths('movies');
  return paths.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  // Enable static rendering for this page
  unstable_setRequestLocale(locale);

  try {
    const article = await getArticle('movies', slug, locale);
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

export default async function MoviesArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;

  // Enable static rendering for this page
  unstable_setRequestLocale(locale);

  let article;
  try {
    article = await getArticle('movies', slug, locale);
  } catch (error) {
    notFound();
  }

  const { frontmatter, content, readingTime } = article;

  // Fetch all movies articles for related articles
  const allArticleItems = await getArticlesByCategory('movies', locale);
  const allArticles: Article[] = allArticleItems.map((item) => ({
    frontmatter: item.frontmatter as any,
    content: '',
    readingTime: item.readingTime,
    slug: item.slug,
    locale,
    category: 'movies',
  }));

  // Construct full article URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ruilopes.com';
  const articleUrl = `${baseUrl}/${locale}/movies/${slug}`;

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
        <Breadcrumbs category="movies" articleTitle={frontmatter.title} locale={locale} />

        {/* Article Hero */}
        <ArticleHero frontmatter={frontmatter} readingTime={readingTime} locale={locale} />

        {/* Movies-Specific Components */}
        {(frontmatter as any).director && (frontmatter as any).releaseYear && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <MediaInfoCard
              type="movie"
              director={(frontmatter as any).director}
              releaseYear={(frontmatter as any).releaseYear}
              runtime={(frontmatter as any).runtime}
              whereWatched={(frontmatter as any).whereWatched}
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
        currentArticle={{ ...article, locale, category: 'movies' }}
        allArticles={allArticles}
        locale={locale}
      />
    </div>
  );
}
