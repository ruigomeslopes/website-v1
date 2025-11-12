import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getAllArticlePaths, getArticlesByCategory } from '@/lib/articles';
import ArticleLayout from '@/components/article/ArticleLayout';
import ArticleHero from '@/components/article/ArticleHero';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import MediaInfoCard from '@/components/category-specific/media/MediaInfoCard';
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
  const paths = getAllArticlePaths('tvshows');
  return paths.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const article = await getArticle('tvshows', slug, locale);
    const { frontmatter } = article;
    const truncatedDescription = truncateDescription(frontmatter.excerpt);

    return {
      title: frontmatter.title,
      description: truncatedDescription,
      authors: [{ name: SITE_CONFIG.author.name }],
      keywords: frontmatter.tags,
      alternates: {
        canonical: `/${locale}/tvshows/${slug}`,
        languages: {
          'pt': `/pt/tvshows/${slug}`,
          'en': `/en/tvshows/${slug}`,
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

export default async function TVShowsArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;

  let article;
  try {
    article = await getArticle('tvshows', slug, locale);
  } catch (error) {
    notFound();
  }

  const { frontmatter, content, readingTime } = article;

  // Fetch all tvshows articles for related articles
  const allArticleItems = await getArticlesByCategory('tvshows', locale);
  const allArticles: Article[] = allArticleItems.map((item) => ({
    frontmatter: item.frontmatter as any,
    content: '',
    readingTime: item.readingTime,
    slug: item.slug,
    locale,
    category: 'tvshows',
  }));

  // Construct full article URL for sharing
  const articleUrl = `${SITE_CONFIG.baseUrl}/${locale}/tvshows/${slug}`;

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
        <Breadcrumbs category="tvshows" articleTitle={frontmatter.title} locale={locale} articleSlug={slug} />

        {/* Article Hero */}
        <ArticleHero frontmatter={frontmatter} readingTime={readingTime} locale={locale} />

        {/* TV Shows-Specific Components */}
        {(frontmatter as any).creator && (frontmatter as any).seasons && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <MediaInfoCard
              type="tvshow"
              creator={(frontmatter as any).creator}
              seasons={(frontmatter as any).seasons}
              episodes={(frontmatter as any).episodes}
              platform={(frontmatter as any).platform}
              status={(frontmatter as any).status}
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
        currentArticle={{ ...article, locale, category: 'tvshows' }}
        allArticles={allArticles}
        locale={locale}
      />
    </div>
  );
}
