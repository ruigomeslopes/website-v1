import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getAllArticlePaths, getArticlesByCategory } from '@/lib/articles';
import ArticleLayout from '@/components/article/ArticleLayout';
import ArticleHero from '@/components/article/ArticleHero';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import PlatinumBadge from '@/components/category-specific/gaming/PlatinumBadge';
import RatingDisplay from '@/components/category-specific/gaming/RatingDisplay';
import ShareButtons from '@/components/article/ShareButtons';
import RelatedArticles from '@/components/article/RelatedArticles';
import StructuredData from '@/components/StructuredData';
import { Article } from '@/types/article';
import { SITE_CONFIG, truncateDescription } from '@/lib/config';

interface PageProps {
  params: Promise<{
    locale: 'pt' | 'en';
    slug: string;
  }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const paths = getAllArticlePaths('gaming');
  return paths.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const article = await getArticle('gaming', slug, locale);
    const { frontmatter } = article;
    const truncatedDescription = truncateDescription(frontmatter.excerpt);

    return {
      title: frontmatter.title,
      description: truncatedDescription,
      authors: [{ name: SITE_CONFIG.author.name }],
      keywords: frontmatter.tags,
      alternates: {
        canonical: `/${locale}/gaming/${slug}`,
        languages: {
          'pt': `/pt/gaming/${slug}`,
          'en': `/en/gaming/${slug}`,
        },
      },
      openGraph: {
        title: frontmatter.title,
        description: truncatedDescription,
        images: [frontmatter.image],
        type: 'article',
        locale: locale === 'pt' ? 'pt_PT' : 'en_US',
        publishedTime: frontmatter.date,
        modifiedTime: frontmatter.date,
        authors: [SITE_CONFIG.author.name],
        tags: frontmatter.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.title,
        description: truncatedDescription,
        images: [frontmatter.image],
        creator: SITE_CONFIG.author.twitter,
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
    };
  }
}

export const dynamic = 'force-static';

export default async function GamingArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;

  let article;
  try {
    article = await getArticle('gaming', slug, locale);
  } catch (error) {
    notFound();
  }

  const { frontmatter, content, readingTime } = article;

  // Fetch all gaming articles for related articles
  const allArticleItems = await getArticlesByCategory('gaming', locale);
  const allArticles: Article[] = allArticleItems.map((item) => ({
    frontmatter: item.frontmatter as any,
    content: '',
    readingTime: item.readingTime,
    slug: item.slug,
    locale,
    category: 'gaming',
  }));

  // Construct full article URL for sharing
  const articleUrl = `${SITE_CONFIG.baseUrl}/${locale}/gaming/${slug}`;

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
          author: { name: SITE_CONFIG.author.name },
          publisher: {
            name: SITE_CONFIG.siteName,
            logo: `${SITE_CONFIG.baseUrl}/avatar.jpg`,
          },
          url: articleUrl,
          keywords: frontmatter.tags,
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs category="gaming" articleTitle={frontmatter.title} locale={locale} articleSlug={slug} />

        {/* Article Hero */}
        <ArticleHero frontmatter={frontmatter} readingTime={readingTime} locale={locale} />

        {/* Gaming-Specific Components */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {(frontmatter as any).platinumed !== undefined && (
            <PlatinumBadge platinumed={(frontmatter as any).platinumed} />
          )}
          {(frontmatter as any).rating !== undefined && (
            <div className="my-6 flex items-center gap-4 bg-bg-secondary border border-border rounded-lg p-4">
              <span className="text-sm font-medium text-text-secondary">Game Rating:</span>
              <RatingDisplay rating={(frontmatter as any).rating} showLabel={true} />
            </div>
          )}
        </div>

        {/* Article Content */}
        <ArticleLayout>
          <div dangerouslySetInnerHTML={{ __html: content }} />

          {/* Share Buttons */}
          <ShareButtons title={frontmatter.title} url={articleUrl} />
        </ArticleLayout>
      </div>

      {/* Related Articles */}
      <RelatedArticles
        currentArticle={{ ...article, locale, category: 'gaming' }}
        allArticles={allArticles}
        locale={locale}
      />
    </div>
  );
}
