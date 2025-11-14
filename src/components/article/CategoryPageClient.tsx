'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import ArticleGrid from '@/components/article/ArticleGrid';
import TagFilter from '@/components/article/TagFilter';
import SortDropdown, { SortOption } from '@/components/article/SortDropdown';
import LanguageFilter from '@/components/article/LanguageFilter';
import ViewToggle, { ViewMode } from '@/components/article/ViewToggle';
import ArticleListItem from '@/components/article/ArticleListItem';
import ArticleCard from '@/components/article/ArticleCard';
import { Article } from '@/types/article';

type LanguageOption = 'all' | 'pt' | 'en';

interface CategoryPageClientProps {
  initialArticles: Article[];
  categoryKey: string;
  categoryIcon: string;
  locale: string;
}

export default function CategoryPageClient({
  initialArticles,
  categoryKey,
  categoryIcon,
  locale,
}: CategoryPageClientProps) {
  const t = useTranslations();

  const [filteredArticles, setFilteredArticles] = useState<Article[]>(initialArticles);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [languageFilter, setLanguageFilter] = useState<LanguageOption>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Load view mode preference from localStorage on mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem('categoryViewMode') as ViewMode;
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('categoryViewMode', viewMode);
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
  }, [initialArticles, selectedTags, sortOption, languageFilter]);

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

  return (
    <main className="min-h-screen py-16">
      <Container size="lg">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="primary" size="lg" className="mb-4">
            {categoryIcon} {t(`categories.${categoryKey}`)}
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t(`categories.${categoryKey}`)}
          </h1>
          <p className="text-lg text-text-secondary mb-2">
            {t(`categoryDescriptions.${categoryKey}`)}
          </p>
          <p className="text-sm text-text-tertiary">
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
            <p className="text-lg text-text-secondary">
              {selectedTags.length > 0 || languageFilter !== 'all'
                ? t('category.noArticlesFiltered')
                : t('category.noArticles')}
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
