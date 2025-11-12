// Base frontmatter shared by all articles
export interface BaseFrontmatter {
  title: string;
  slug: string;
  locale: 'pt' | 'en';
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
}

// Football-specific frontmatter
export interface FootballFrontmatter extends BaseFrontmatter {
  teams: string;
  competition: string;
  matchDate: string;
  result: string;
}

// MotoGP-specific frontmatter
export interface MotoGPFrontmatter extends BaseFrontmatter {
  gpName: string;
  circuit: string;
  category: 'MotoGP' | 'Moto2' | 'Moto3';
  raceDate: string;
}

// Gaming-specific frontmatter
export interface GamingFrontmatter extends BaseFrontmatter {
  platform: string;
  developer: string;
  releaseYear: number;
  hoursPlayed: number;
  platinumed: boolean;
  rating: number; // 1-10
}

// Movies-specific frontmatter
export interface MoviesFrontmatter extends BaseFrontmatter {
  director: string;
  releaseYear: number;
  genre: string;
  runtime: number; // in minutes
  whereWatched: string;
  rating: number; // 1-5
}

// TV Shows-specific frontmatter
export interface TVShowsFrontmatter extends BaseFrontmatter {
  creator: string;
  seasons: number;
  episodes: number;
  platform: string;
  status: 'Ongoing' | 'Completed' | 'Cancelled';
  rating: number; // 1-5
}

// Books-specific frontmatter
export interface BooksFrontmatter extends BaseFrontmatter {
  author: string;
  genre: string;
  pages: number;
  dateRead: string;
  rating: number; // 1-5
  currentPage?: number; // for "Currently Reading" feature
}

// Travel-specific frontmatter
export interface TravelFrontmatter extends BaseFrontmatter {
  destination: string;
  country: string;
  tripStartDate: string;
  tripEndDate: string;
  budgetLevel: 'Low' | 'Medium' | 'High';
  region: string;
}

// Union type for all frontmatter types
export type ArticleFrontmatter =
  | FootballFrontmatter
  | MotoGPFrontmatter
  | GamingFrontmatter
  | MoviesFrontmatter
  | TVShowsFrontmatter
  | BooksFrontmatter
  | TravelFrontmatter;

// Category type
export type Category = 'football' | 'motogp' | 'gaming' | 'movies' | 'tvshows' | 'books' | 'travel';

// Article with parsed content
export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string; // HTML content after MDX processing
  readingTime: number; // in minutes
  slug: string;
  locale: 'pt' | 'en'; // Added for easier filtering
  category?: Category; // Optional category field for cross-category views
}

// Helper type for article listings
export interface ArticleListItem {
  frontmatter: BaseFrontmatter;
  readingTime: number;
  slug: string;
}

// Article with category info for timeline/latest views
export interface ArticleWithCategory {
  title: string;
  slug: string;
  category: Category;
  date: string;
  description?: string;
  readingTime: number;
  image: string;
  tags: string[];
  locale: 'pt' | 'en';
}
