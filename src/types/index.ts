// Article metadata types
export interface ArticleMetadata {
  title: string
  date: string
  excerpt: string
  tags: string[]
  slug: string
  category: Category
  locale: Locale
}

// Category types
export type Category =
  | 'football'
  | 'motogp'
  | 'gaming'
  | 'books'
  | 'movies'
  | 'tvshows'
  | 'travel'

// Locale types
export type Locale = 'pt' | 'en'

// Full article with content
export interface Article extends ArticleMetadata {
  content: string
  readingTime: number
}

// Category-specific metadata will be added in later phases
