import { useTranslations } from 'next-intl';
import ArticleCard from './ArticleCard';
import { Container } from '@/components/ui/Container';
import { Article } from '@/types/article';

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
  locale: string;
  limit?: number;
}

/**
 * Get related articles based on same category and shared tags
 * Algorithm:
 * 1. Filter articles from same category
 * 2. Exclude current article
 * 3. Filter articles that share at least 1 tag
 * 4. Sort by number of shared tags (descending)
 * 5. Limit to specified number
 */
function getRelatedArticles(
  currentArticle: Article,
  allArticles: Article[],
  limit: number = 3
): Article[] {
  // Get current article tags
  const currentTags = currentArticle.frontmatter.tags || [];

  // If current article has no tags, return empty array
  if (currentTags.length === 0) {
    return [];
  }

  return allArticles
    // Exclude current article
    .filter((article) => article.slug !== currentArticle.slug)
    // Filter by same category (if category is available)
    .filter((article) => {
      if (currentArticle.category) {
        return article.category === currentArticle.category;
      }
      return true;
    })
    // Calculate shared tags and filter articles with at least 1 shared tag
    .map((article) => {
      const articleTags = article.frontmatter.tags || [];
      const sharedTags = articleTags.filter((tag) => currentTags.includes(tag));
      return {
        ...article,
        sharedTagCount: sharedTags.length,
      };
    })
    .filter((article) => article.sharedTagCount > 0)
    // Sort by shared tag count (descending)
    .sort((a, b) => b.sharedTagCount - a.sharedTagCount)
    // Limit results
    .slice(0, limit);
}

export default function RelatedArticles({
  currentArticle,
  allArticles,
  locale,
  limit = 3,
}: RelatedArticlesProps) {
  const t = useTranslations('article');

  const relatedArticles = getRelatedArticles(currentArticle, allArticles, limit);

  // Don't render if no related articles
  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-[var(--bg-secondary)]">
      <Container size="lg">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 text-center">
          {t('relatedArticles')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedArticles.map((article) => (
            <ArticleCard
              key={`${article.locale}-${article.slug}`}
              article={article}
              locale={locale}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
