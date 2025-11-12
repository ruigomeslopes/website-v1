import { Article } from '@/types/article';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  locale: string;
  emptyMessage?: string;
}

export default function ArticleGrid({ articles, locale, emptyMessage }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-[var(--text-secondary)]">
          {emptyMessage || 'No articles found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} locale={locale} />
      ))}
    </div>
  );
}
