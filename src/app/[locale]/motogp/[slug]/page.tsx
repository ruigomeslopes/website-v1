import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, getAllArticlePaths, getArticlesByCategory } from '@/lib/articles';
import { unstable_setRequestLocale } from 'next-intl/server';
import ArticleLayout from '@/components/article/ArticleLayout';
import ArticleHero from '@/components/article/ArticleHero';
import Breadcrumbs from '@/components/article/Breadcrumbs';
import RaceInfoCard from '@/components/category-specific/motogp/RaceInfoCard';
import ShareButtons from '@/components/article/ShareButtons';
import RelatedArticles from '@/components/article/RelatedArticles';
import StructuredData from '@/components/StructuredData';
import { Article } from '@/types/article';

interface PageProps {
  params: {
    locale: 'pt' | 'en';
    slug: string;
  };
}

// Generate static params for all articles
export async function generateStaticParams() {
  const paths = getAllArticlePaths('motogp');
  return paths.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = params;

  // Enable static rendering for this page
  unstable_setRequestLocale(locale);

  try {
    const article = await getArticle('motogp', slug, locale);
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

export default async function MotoGPArticlePage({ params }: PageProps) {
  const { locale, slug } = params;

  // Enable static rendering for this page
  unstable_setRequestLocale(locale);

  let article;
  try {
    article = await getArticle('motogp', slug, locale);
  } catch (error) {
    notFound();
  }

  const { frontmatter, content, readingTime } = article;

  // Fetch all motogp articles for related articles
  const allArticleItems = await getArticlesByCategory('motogp', locale);
  const allArticles: Article[] = allArticleItems.map((item) => ({
    frontmatter: item.frontmatter as any,
    content: '',
    readingTime: item.readingTime,
    slug: item.slug,
    locale,
    category: 'motogp',
  }));

  // Construct full article URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ruilopes.com';
  const articleUrl = `${baseUrl}/${locale}/motogp/${slug}`;

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
        <Breadcrumbs category="motogp" articleTitle={frontmatter.title} locale={locale} />

        {/* Article Hero */}
        <ArticleHero frontmatter={frontmatter} readingTime={readingTime} locale={locale} />

        {/* MotoGP-Specific Components */}
        {(frontmatter as any).gpName && (frontmatter as any).circuit && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <RaceInfoCard
              gpName={(frontmatter as any).gpName}
              circuit={(frontmatter as any).circuit}
              date={(frontmatter as any).date}
              category={(frontmatter as any).category}
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
        currentArticle={{ ...article, locale, category: 'motogp' }}
        allArticles={allArticles}
        locale={locale}
      />
    </div>
  );
}
