/**
 * Category emoji mappings for visual enhancement
 */
export const categoryEmojis: { [key: string]: string } = {
  football: '⚽',
  motogp: '🏍️',
  gaming: '🎮',
  books: '📚',
  movies: '🎬',
  tvshows: '📺',
  travel: '✈️',
};

/**
 * Get emoji for a given category
 */
export function getCategoryEmoji(category: string): string | null {
  return categoryEmojis[category] || null;
}
