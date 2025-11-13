'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { TimelineArticle } from './TimelineArticle';
import { ArticleWithCategory } from '@/types/article';

interface TimelineSectionProps {
  articles: ArticleWithCategory[];
  locale: string;
}

interface PeriodGroup {
  year: number;
  month: number;
  articles: ArticleWithCategory[];
}

export function TimelineSection({ articles, locale }: TimelineSectionProps) {
  const t = useTranslations();
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Responsive article limit: 12 for desktop, 8 for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const articleLimit = isMobile ? 10 : 10;
  // Desktop: Reverse for horizontal scroll (newest on right)
  // Mobile: Don't reverse, natural order (newest on top) since no scroll container
  const displayArticles = isMobile
    ? articles.slice(0, articleLimit)
    : articles.slice(0, articleLimit).reverse();

  // Group articles by year and month
  const groupedArticles: PeriodGroup[] = displayArticles.reduce((acc: PeriodGroup[], article) => {
    const date = new Date(article.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const existingGroup = acc.find(g => g.year === year && g.month === month);
    if (existingGroup) {
      existingGroup.articles.push(article);
    } else {
      acc.push({ year, month, articles: [article] });
    }
    return acc;
  }, []);

  // Handle scroll events
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollPos = isMobile ? container.scrollTop : container.scrollLeft;
    const scrollSize = isMobile ? container.scrollHeight - container.clientHeight : container.scrollWidth - container.clientWidth;

    // Update progress (0-100%)
    const progress = scrollSize > 0 ? (scrollPos / scrollSize) * 100 : 0;
    setScrollProgress(progress);

    // Update navigation button states
    setCanScrollPrev(scrollPos > 10);
    setCanScrollNext(scrollPos < scrollSize - 10);
  };

  // Scroll to previous/next section
  const scrollTo = (direction: 'prev' | 'next') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = isMobile ? container.clientHeight * 0.8 : container.clientWidth * 0.8;
    const currentScroll = isMobile ? container.scrollTop : container.scrollLeft;
    const newScroll = direction === 'prev'
      ? currentScroll - scrollAmount
      : currentScroll + scrollAmount;

    if (isMobile) {
      container.scrollTo({ top: newScroll, behavior: 'smooth' });
    } else {
      container.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile) {
        if (e.key === 'ArrowUp') scrollTo('prev');
        if (e.key === 'ArrowDown') scrollTo('next');
      } else {
        if (e.key === 'ArrowLeft') scrollTo('prev');
        if (e.key === 'ArrowRight') scrollTo('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile]);

  // Update scroll state on mount and scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    handleScroll();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Scroll to the far right (newest content) on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Small timeout to ensure content is rendered
    const timer = setTimeout(() => {
      if (isMobile) {
        container.scrollTop = container.scrollHeight - container.clientHeight;
      } else {
        container.scrollLeft = container.scrollWidth - container.clientWidth;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <section
      className="relative py-20 lg:py-32 bg-surface-primary overflow-hidden"
      role="region"
      aria-label={locale === 'pt' ? 'Timeline de artigos recentes' : 'Recent articles timeline'}
    >
      {/* Section Header - Inside container */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('homepage.timeline.title')}
          </h2>
          <p className="text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto">
            {t('homepage.timeline.subtitle')}
          </p>
        </div>
      </div>

      {/* Desktop Timeline - FULL VIEWPORT (breakout) */}
      <div
        className="hidden lg:block relative w-screen min-h-[1000px] overflow-visible"
        role="group"
        aria-label={locale === 'pt' ? 'Timeline horizontal de artigos' : 'Horizontal articles timeline'}
      >
          {/* Navigation Buttons */}
          {canScrollPrev && (
            <button
              onClick={() => scrollTo('prev')}
              className="absolute left-4 top-[300px] -translate-y-1/2 z-20 bg-surface-primary/80 backdrop-blur-sm border border-border-primary/50 hover:border-accent-primary rounded-full p-2.5 shadow-md transition-all duration-200 hover:scale-110 animate-pulse hover:animate-none opacity-70 hover:opacity-100"
              aria-label={locale === 'pt' ? 'Ver artigos anteriores' : 'View previous articles'}
              title={locale === 'pt' ? 'Artigos anteriores' : 'Previous articles'}
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
          )}

          {canScrollNext && (
            <button
              onClick={() => scrollTo('next')}
              className="absolute right-4 top-[300px] -translate-y-1/2 z-20 bg-surface-primary/80 backdrop-blur-sm border border-border-primary/50 hover:border-accent-primary rounded-full p-2.5 shadow-md transition-all duration-200 hover:scale-110 animate-pulse hover:animate-none opacity-70 hover:opacity-100"
              aria-label={locale === 'pt' ? 'Ver artigos seguintes' : 'View next articles'}
              title={locale === 'pt' ? 'Artigos seguintes' : 'Next articles'}
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>
          )}

          {/* Scroll Container - NO SCROLLBAR */}
          <div
            ref={scrollContainerRef}
            className="timeline-scroll relative overflow-x-auto overflow-y-visible scroll-smooth"
            style={{
              scrollSnapType: 'x proximity',
              WebkitOverflowScrolling: 'touch'
            }}
            tabIndex={0}
            role="feed"
            aria-label={locale === 'pt' ? 'Feed de artigos na timeline' : 'Articles timeline feed'}
          >
            {/* Horizontal Timeline Line - positioned at center */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-border-primary via-accent-primary/30 to-border-primary -translate-y-1/2 z-10 pointer-events-none" />

            {/* Flex container - SINGLE row with all items */}
            <div className="flex gap-8 items-center min-w-max px-12 py-[385px]">
              {groupedArticles.map((group, groupIndex) => {
                const monthNames = locale === 'pt'
                  ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
                  : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const monthName = monthNames[group.month - 1];

                // Calculate global index for alternation
                let globalStartIndex = 0;
                for (let i = 0; i < groupIndex; i++) {
                  globalStartIndex += groupedArticles[i].articles.length;
                }

                return (
                  <React.Fragment key={`${group.year}-${group.month}`}>
                    {/* Period Badge - centered on timeline */}
                    <div className="relative flex flex-col items-center justify-center flex-shrink-0" style={{ width: '120px' }}>
                      <div className="w-3 h-3 rounded-full bg-accent-primary ring-4 ring-bg-primary shadow-md mb-2 z-20" />
                      <div className="flex flex-col items-center px-3 py-2 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary shadow-md z-20">
                        <span className="text-white font-bold text-sm">{group.year}</span>
                        <span className="text-white/90 text-xs font-medium">{monthName}</span>
                      </div>
                    </div>

                    {/* Articles for this period */}
                    {group.articles.map((article, index) => {
                      const globalIndex = globalStartIndex + index;
                      const isTop = globalIndex % 2 === 0;

                      return (
                        <div
                          key={article.slug}
                          className="relative flex-shrink-0"
                          style={{ width: '320px', scrollSnapAlign: 'center' }}
                        >
                          {/* Card positioned absolutely above or below center line */}
                          <div
                            className={`absolute left-1/2 -translate-x-1/2 ${
                              isTop ? 'bottom-1/2 mb-8' : 'top-1/2 mt-8'
                            }`}
                          >
                            <TimelineArticle
                              title={article.title}
                              slug={article.slug}
                              category={article.category}
                              categoryKey={article.category}
                              date={article.date}
                              readingTime={article.readingTime}
                              description={article.description}
                              image={article.image}
                              locale={locale}
                              position={isTop ? 'bottom' : 'top'}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

        </div>

        {/* Mobile Timeline (Vertical Scroll) - Hidden on desktop */}
        <div
          className="lg:hidden relative mx-auto"
          style={{ maxWidth: '500px' }}
          role="group"
          aria-label={locale === 'pt' ? 'Timeline vertical de artigos' : 'Vertical articles timeline'}
        >
          {/* Navigation Buttons */}
          {canScrollPrev && (
            <button
              onClick={() => scrollTo('prev')}
              className="absolute left-1/2 -translate-x-1/2 -top-4 z-20 bg-surface-primary/80 backdrop-blur-sm border border-border-primary/50 hover:border-accent-primary rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 animate-pulse hover:animate-none opacity-70 hover:opacity-100"
              aria-label={locale === 'pt' ? 'Ver artigos anteriores' : 'View previous articles'}
              title={locale === 'pt' ? 'Artigos anteriores' : 'Previous articles'}
            >
              <ChevronUp className="w-4 h-4 text-text-primary" />
            </button>
          )}

          {canScrollNext && (
            <button
              onClick={() => scrollTo('next')}
              className="absolute left-1/2 -translate-x-1/2 -bottom-4 z-20 bg-surface-primary/80 backdrop-blur-sm border border-border-primary/50 hover:border-accent-primary rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 animate-pulse hover:animate-none opacity-70 hover:opacity-100"
              aria-label={locale === 'pt' ? 'Ver artigos seguintes' : 'View next articles'}
              title={locale === 'pt' ? 'Artigos seguintes' : 'Next articles'}
            >
              <ChevronDown className="w-4 h-4 text-text-primary" />
            </button>
          )}

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="timeline-scroll relative overflow-y-visible overflow-x-visible scroll-smooth py-12"
            style={{
              scrollbarWidth: 'thin',
              scrollSnapType: 'y proximity',
              WebkitOverflowScrolling: 'touch'
            }}
            tabIndex={0}
            role="feed"
            aria-label={locale === 'pt' ? 'Feed de artigos na timeline' : 'Articles timeline feed'}
          >
            {/* Vertical Timeline Line - Centered */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border-primary z-0 pointer-events-none" />

            {/* Articles grouped by period */}
            <div className="space-y-10">
              {groupedArticles.map((group, groupIndex) => {
                const monthNames = locale === 'pt'
                  ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
                  : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const monthName = monthNames[group.month - 1];

                // Calculate global index for alternation
                let globalStartIndex = 0;
                for (let i = 0; i < groupIndex; i++) {
                  globalStartIndex += groupedArticles[i].articles.length;
                }

                return (
                  <div key={`${group.year}-${group.month}`} className="space-y-8">
                    {/* Period Badge - Centered */}
                    <div className="flex justify-center mb-4">
                      <div className="flex flex-col items-center gap-2 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-accent-primary ring-4 ring-bg-primary shadow-md" />
                        <div className="flex flex-col items-center px-3 py-1.5 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary shadow-md">
                          <span className="text-white font-bold text-xs">{group.year}</span>
                          <span className="text-white/90 text-[10px] font-medium">{monthName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Articles for this period */}
                    {group.articles.map((article, index) => {
                      const globalIndex = globalStartIndex + index;
                      const isLeft = globalIndex % 2 === 0;

                      return (
                        <div
                          key={article.slug}
                          className={`relative ${isLeft ? 'pr-[20%] pl-2' : 'pl-[20%] pr-2'}`}
                          style={{ scrollSnapAlign: 'center' }}
                        >
                          <TimelineArticle
                            title={article.title}
                            slug={article.slug}
                            category={article.category}
                            categoryKey={article.category}
                            date={article.date}
                            readingTime={article.readingTime}
                            description={article.description}
                            image={article.image}
                            locale={locale}
                            position={isLeft ? 'right' : 'left'}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center">
            <div className="w-0.5 h-24 bg-border-primary rounded-full overflow-hidden">
              <div
                className="w-full bg-gradient-to-b from-accent-primary to-accent-secondary rounded-full transition-all duration-300"
                style={{ height: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>

      {/* View All Button - Inside container */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mt-16 text-center">
          <Link
            href={`/${locale}/latest`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-secondary transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {t('homepage.timeline.viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
