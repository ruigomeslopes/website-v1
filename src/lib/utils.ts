import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ArticleFrontmatter, Category } from '@/types/article';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string according to locale
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @param locale - Locale (pt or en)
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: 'pt' | 'en'): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Use appropriate locale code
  const localeCode = locale === 'pt' ? 'pt-PT' : 'en-US';

  return date.toLocaleDateString(localeCode, options);
}

/**
 * Calculate reading time based on word count
 * Formula: words / 200 words-per-minute
 * @param text - Text content to analyze
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Truncate text to a maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Determine article category from frontmatter structure
 * Checks for category-specific fields to identify the article type
 * @param frontmatter - Article frontmatter object
 * @returns Category identifier
 */
export function getCategoryFromFrontmatter(frontmatter: ArticleFrontmatter): Category {
  // Check for category-specific fields
  if ('teams' in frontmatter) return 'football';
  if ('gpName' in frontmatter) return 'motogp';
  if ('platform' in frontmatter && 'developer' in frontmatter) return 'gaming';
  if ('director' in frontmatter) return 'movies';
  if ('creator' in frontmatter) return 'tvshows';
  if ('author' in frontmatter) return 'books';
  if ('destination' in frontmatter) return 'travel';

  // Fallback (should never happen with proper frontmatter)
  return 'football';
}
