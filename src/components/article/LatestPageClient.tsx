'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import TagFilter from '@/components/article/TagFilter';
import SortDropdown, { SortOption } from '@/components/article/SortDropdown';
import LanguageFilter from '@/components/article/LanguageFilter';
import ViewToggle, { ViewMode } from '@/components/article/ViewToggle';
import ArticleListItem from '@/components/article/ArticleListItem';
import ArticleCard from '@/components/article/ArticleCard';
import { Article } from '@/types/article';

type LanguageOption = 'all' | 'pt' | 'en';
type CategoryOption = 'all' | 'football' | 'motogp' | 'gaming' | 'books' | 'movies' | 'tvshows' | 'travel';

interface LatestPageClientProps {
  initialArticles: Article[];
  locale: string;
}

export default function LatestPageClient({
  initialArticles,
  locale,
}: LatestPageClientProps) {
  const t = useTranslations();

  const [filteredArticles, setFilteredArticles] = useState<Article[]>(initialArticles);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [languageFilter, setLanguageFilter] = useState<LanguageOption>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryOption>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Load view mode preference from localStorage on mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem('latestViewMode') as ViewMode;
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('latestViewMode', viewMode);
  }, [viewMode]);

  // Extract unique tags on mount
  useEffect(() => {
    const tags = new Set<string>();
    initialArticles.forEach((article) => {
      article.frontmatter.tags?.forEach((tag) => tags.add(tag));
    });
    setAllTags(Array.from(tags).sort());
  }, [initialArticles]);

  // Filter and sort articles
  useEffect(() => {
    let filtered = [...initialArticles];

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((article) => article.category === categoryFilter);
    }

    // Filter by language
    if (languageFilter !== 'all') {
      filtered = filtered.filter((article) => article.locale === languageFilter);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((article) =>
        article.frontmatter.tags?.some((tag) => selectedTags.includes(tag))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return sortOption === 'latest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredArticles(filtered);
  }, [initialArticles, selectedTags, sortOption, languageFilter, categoryFilter]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  // Get visible articles for pagination
  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  // Category options for filter
  const categories: CategoryOption[] = ['all', 'football', 'motogp', 'gaming', 'books', 'movies', 'tvshows', 'travel'];

  return (
    <main className="min-h-screen py-16">
      <Container size="lg">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="primary" size="lg" className="mb-4">
            📚 {t('latest.title')}
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {t('latest.title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-2">
            {t('latest.description')}
          </p>
          <p className="text-sm text-[var(--text-tertiary)]">
            {t('category.articleCount', { count: initialArticles.length })}
          </p>
        </div>

        {/* Filters and Sort */}
        {initialArticles.length > 0 && (
          <div className="mb-8 space-y-6">
            {/* Top row: Sort and View Toggle */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <SortDropdown currentSort={sortOption} onSortChange={setSortOption} />
              <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="category-filter"
                className="text-sm font-medium text-[var(--text-secondary)]"
              >
                {t('latest.filterByCategory')}
              </label>
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryOption)}
                className="max-w-xs px-4 py-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[var(--border-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all"
              >
                <option value="all">{t('latest.allCategories')}</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {t(`categories.${category}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <LanguageFilter
              currentLanguage={languageFilter}
              onLanguageChange={setLanguageFilter}
            />

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <TagFilter
                tags={allTags}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                onClearFilters={handleClearFilters}
              />
            )}
          </div>
        )}

        {/* Articles Display */}
        {visibleArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[var(--text-secondary)]">
              {selectedTags.length > 0 || languageFilter !== 'all' || categoryFilter !== 'all'
                ? t('latest.noArticlesFiltered')
                : t('latest.noArticles')}
            </p>
          </div>
        ) : (
          <>
            {/* Grid or List View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {visibleArticles.map((article) => (
                  <ArticleCard
                    key={`${article.locale}-${article.slug}`}
                    article={article}
                    locale={locale}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 mb-8">
                {visibleArticles.map((article) => (
                  <ArticleListItem
                    key={`${article.locale}-${article.slug}`}
                    article={article}
                    locale={locale}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button onClick={handleLoadMore} variant="secondary" size="lg">
                  {t('actions.loadMore')}
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </main>
  );
}
