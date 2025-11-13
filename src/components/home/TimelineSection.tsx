'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
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
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

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
  const handleScroll = useCallback(() => {
    const container = isMobile ? mobileScrollRef.current : desktopScrollRef.current;
    if (!container) return;

    const scrollPos = isMobile ? container.scrollTop : container.scrollLeft;
    const scrollSize = isMobile ? container.scrollHeight - container.clientHeight : container.scrollWidth - container.clientWidth;

    // Desktop RTL: scrollLeft is 0 at right (newest), negative when scrolled left (older)
    // Use absolute value for RTL calculations
    const absScrollPos = Math.abs(scrollPos);

    // Update progress (0-100%)
    const progress = scrollSize > 0 ? (absScrollPos / scrollSize) * 100 : 0;
    setScrollProgress(progress);

    // Update navigation button states
    // Desktop RTL: prev = go LEFT (older), next = go RIGHT (newer)
    // scrollLeft = 0 (newest/right): canScrollPrev = true (can go left), canScrollNext = false
    // scrollLeft < 0 (scrolled left): canScrollNext = true (can go back right)
    // scrollLeft at max left (oldest): canScrollPrev = false, canScrollNext = true
    if (!isMobile) {
      setCanScrollPrev(absScrollPos < scrollSize - 10); // Not at max left, can go more LEFT (older)
      setCanScrollNext(scrollPos < -10); // Scrolled left, can go back RIGHT (newer)
    } else {
      setCanScrollPrev(scrollPos > 10);
      setCanScrollNext(scrollPos < scrollSize - 10);
    }
  }, [isMobile]);

  // Scroll to previous/next section
  const scrollTo = useCallback((direction: 'prev' | 'next') => {
    const container = isMobile ? mobileScrollRef.current : desktopScrollRef.current;
    if (!container) return;

    const scrollAmount = isMobile ? container.clientHeight * 0.8 : container.clientWidth * 0.8;
    const currentScroll = isMobile ? container.scrollTop : container.scrollLeft;

    // Desktop RTL: scrollLeft is 0 at right (newest), negative when scrolled left (older)
    // "prev" = go LEFT (older) = decrease scrollLeft (more negative)
    // "next" = go RIGHT (newer) = increase scrollLeft (toward 0)
    let newScroll;
    if (isMobile) {
      newScroll = direction === 'prev'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;
      container.scrollTo({ top: newScroll, behavior: 'smooth' });
    } else {
      // Desktop RTL
      newScroll = direction === 'prev'
        ? currentScroll - scrollAmount  // Go LEFT (older, more negative)
        : currentScroll + scrollAmount; // Go RIGHT (newer, toward 0)
      container.scrollTo({ left: newScroll, behavior: 'smooth' });
    }
  }, [isMobile]);

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
  }, [isMobile, scrollTo]);

  // Update scroll state on mount and scroll
  useEffect(() => {
    const container = isMobile ? mobileScrollRef.current : desktopScrollRef.current;
    if (!container) return;

    handleScroll();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile, handleScroll]);

  // Mobile: Scroll to bottom (newest content) on mount
  // Desktop: RTL handles initial position natively (no JS needed)
  useEffect(() => {
    if (!isMobile) return; // Desktop uses CSS direction: rtl

    const container = mobileScrollRef.current;
    if (!container) return;

    // Small timeout to ensure content is rendered
    const timer = setTimeout(() => {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }, 100);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <section
      className="relative py-28 lg:py-40 bg-bg-primary overflow-hidden"
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
          {/* Scroll Container - NO SCROLLBAR - RTL for natural right-start */}
          <div
            ref={desktopScrollRef}
            className="timeline-scroll relative overflow-x-auto overflow-y-visible scroll-smooth"
            style={{
              direction: 'rtl',
              scrollSnapType: 'x proximity',
              WebkitOverflowScrolling: 'touch'
            }}
            tabIndex={0}
            role="feed"
            aria-label={locale === 'pt' ? 'Feed de artigos na timeline' : 'Articles timeline feed'}
          >
            {/* Navigation Buttons - positioned relative to scroll container */}
            {canScrollPrev && (
              <button
                onClick={() => scrollTo('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-accent-primary hover:bg-accent-hover text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                aria-label={locale === 'pt' ? 'Ver artigos mais antigos' : 'View older articles'}
                title={locale === 'pt' ? 'Artigos mais antigos' : 'Older articles'}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {canScrollNext && (
              <button
                onClick={() => scrollTo('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-accent-primary hover:bg-accent-hover text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                aria-label={locale === 'pt' ? 'Ver artigos mais recentes' : 'View newer articles'}
                title={locale === 'pt' ? 'Artigos mais recentes' : 'Newer articles'}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            {/* Flex container - SINGLE row with all items - LTR to preserve text direction */}
            <div className="relative flex gap-8 items-center min-w-max px-12 py-[385px]" style={{ direction: 'ltr' }}>
              {/* Horizontal Timeline Line - positioned at center, spans full content width */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-border-primary via-accent-primary/30 to-border-primary -translate-y-1/2 z-10 pointer-events-none" />
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
              className="absolute left-1/2 -translate-x-1/2 -top-4 z-20 bg-accent-primary hover:bg-accent-hover text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
              aria-label={locale === 'pt' ? 'Ver artigos anteriores' : 'View previous articles'}
              title={locale === 'pt' ? 'Artigos anteriores' : 'Previous articles'}
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          )}

          {canScrollNext && (
            <button
              onClick={() => scrollTo('next')}
              className="absolute left-1/2 -translate-x-1/2 -bottom-4 z-20 bg-accent-primary hover:bg-accent-hover text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
              aria-label={locale === 'pt' ? 'Ver artigos seguintes' : 'View next articles'}
              title={locale === 'pt' ? 'Artigos seguintes' : 'Next articles'}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}

          {/* Scroll Container */}
          <div
            ref={mobileScrollRef}
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

    </section>
  );
}
