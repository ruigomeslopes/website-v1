/**
 * Site configuration constants
 * Centralizes URLs and site metadata
 */

export const SITE_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ruilopes.github.io/website-v1',
  siteName: 'Rui Lopes',
  author: {
    name: 'Rui Lopes',
    twitter: '@ruilopes_sports',
    email: 'rui.lopes@sports-journalist.com',
  },
  social: {
    twitter: 'https://twitter.com/ruilopes_sports',
    linkedin: 'https://linkedin.com/in/rui-lopes-journalist',
  },
} as const;

/**
 * Truncate meta description to optimal length for SEO
 * @param description - The description to truncate
 * @param maxLength - Maximum length (default: 160)
 */
export function truncateDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength - 3).trim() + '...';
}

/**
 * Get full URL for a given path
 * @param path - The path to append to base URL
 */
export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.baseUrl}${cleanPath}`;
}
