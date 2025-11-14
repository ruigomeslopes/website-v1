import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/**
 * Base Skeleton Component
 * Animated loading placeholder with shimmer effect
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-bg-tertiary',
        'relative overflow-hidden',
        'before:absolute before:inset-0',
        'before:-translate-x-full',
        'before:animate-[shimmer_2s_infinite]',
        'before:bg-gradient-to-r',
        'before:from-transparent before:via-bg-secondary before:to-transparent',
        className
      )}
    />
  );
}

/**
 * Article Card Skeleton - Grid View
 */
export function ArticleCardSkeleton() {
  return (
    <div className="bg-bg-secondary rounded-2xl border-2 border-border-primary overflow-hidden">
      {/* Image */}
      <Skeleton className="w-full aspect-video" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category Badge */}
        <Skeleton className="h-6 w-24" />

        {/* Title */}
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />

        {/* Excerpt */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

/**
 * Article List Item Skeleton
 */
export function ArticleListItemSkeleton() {
  return (
    <div className="flex gap-6 p-6 rounded-2xl border-2 border-border-primary bg-bg-primary">
      {/* Image */}
      <Skeleton className="w-48 h-32 flex-shrink-0 rounded-2xl" />

      {/* Content */}
      <div className="flex-1 space-y-3">
        {/* Category */}
        <Skeleton className="h-5 w-20" />

        {/* Title */}
        <Skeleton className="h-7 w-3/4" />

        {/* Excerpt */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

/**
 * Article Hero Skeleton
 */
export function ArticleHeroSkeleton() {
  return (
    <div className="space-y-6">
      {/* Image */}
      <Skeleton className="w-full aspect-video rounded-2xl" />

      {/* Category */}
      <Skeleton className="h-6 w-32" />

      {/* Title */}
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-4/5" />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-6">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-28" />
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </div>
  );
}

/**
 * Category Card Skeleton
 */
export function CategoryCardSkeleton() {
  return (
    <div className="bg-bg-secondary rounded-2xl border-2 border-border-primary p-6 space-y-4">
      {/* Icon */}
      <Skeleton className="h-16 w-16 rounded-full" />

      {/* Title */}
      <Skeleton className="h-8 w-32" />

      {/* Count */}
      <Skeleton className="h-5 w-24" />

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

/**
 * Timeline Article Skeleton
 */
export function TimelineArticleSkeleton() {
  return (
    <div className="bg-bg-primary border-2 border-border-primary rounded-2xl p-6 space-y-4">
      {/* Date */}
      <Skeleton className="h-5 w-32" />

      {/* Title */}
      <Skeleton className="h-7 w-3/4" />

      {/* Category */}
      <Skeleton className="h-5 w-24" />

      {/* Excerpt */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Read More */}
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
  );
}

/**
 * Grid of Skeleton Cards
 */
export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * List of Skeleton Items
 */
export function ArticleListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleListItemSkeleton key={i} />
      ))}
    </div>
  );
}
