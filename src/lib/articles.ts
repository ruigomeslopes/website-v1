import fs from 'fs';
import path from 'path';
import { parseMDX, getContentPath } from './mdx';
import type { Article, ArticleListItem, ArticleWithCategory, Category } from '@/types/article';

/**
 * Get all article slugs for a specific category and locale
 * @param category - Article category
 * @param locale - Locale (pt or en)
 * @returns Array of slugs
 */
export function getArticleSlugs(category: Category, locale: 'pt' | 'en'): string[] {
  const articlesDirectory = path.join(process.cwd(), 'src', 'content', category, locale);

  // Check if directory exists
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

/**
 * Get a specific article by category, slug, and locale
 * @param category - Article category
 * @param slug - Article slug
 * @param locale - Locale (pt or en)
 * @returns Article object with frontmatter, content, and reading time
 */
export async function getArticle(
  category: Category,
  slug: string,
  locale: 'pt' | 'en'
): Promise<Article> {
  const filePath = getContentPath(category, locale, slug);

  const { frontmatter, content, readingTime } = await parseMDX(filePath);

  return {
    frontmatter,
    content,
    readingTime,
    slug,
    locale,
  };
}

/**
 * Get all articles for a specific category and locale
 * @param category - Article category
 * @param locale - Locale (pt or en)
 * @returns Array of articles sorted by date (newest first)
 */
export async function getArticlesByCategory(
  category: Category,
  locale: 'pt' | 'en'
): Promise<ArticleListItem[]> {
  const slugs = getArticleSlugs(category, locale);

  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = getContentPath(category, locale, slug);
      const { frontmatter, readingTime } = await parseMDX(filePath);

      return {
        frontmatter,
        readingTime,
        slug,
      };
    })
  );

  // Sort by date (newest first)
  return articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get all articles across all categories for a specific locale
 * @param locale - Locale (pt or en)
 * @returns Array of articles sorted by date (newest first)
 */
export async function getAllArticles(locale: 'pt' | 'en'): Promise<ArticleListItem[]> {
  const categories: Category[] = ['football', 'motogp', 'gaming', 'movies', 'tvshows', 'books', 'travel'];

  const allArticles = await Promise.all(
    categories.map((category) => getArticlesByCategory(category, locale))
  );

  // Flatten and sort by date (newest first)
  return allArticles.flat().sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get all articles across all categories with category info for a specific locale
 * @param locale - Locale (pt or en)
 * @returns Array of articles with category info sorted by date (newest first)
 */
export async function getAllArticlesWithCategory(
  locale: 'pt' | 'en'
): Promise<ArticleWithCategory[]> {
  const categories: Category[] = ['football', 'motogp', 'gaming', 'movies', 'tvshows', 'books', 'travel'];

  const allArticles = await Promise.all(
    categories.map(async (category) => {
      const articles = await getArticlesByCategory(category, locale);
      return articles.map((article): ArticleWithCategory => ({
        title: article.frontmatter.title,
        slug: article.slug,
        category,
        date: article.frontmatter.date,
        description: article.frontmatter.excerpt,
        readingTime: article.readingTime,
        image: article.frontmatter.image,
        tags: article.frontmatter.tags,
        locale,
      }));
    })
  );

  // Flatten and sort by date (newest first)
  return allArticles.flat().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get all article slugs for all categories and locales (for static generation)
 * @param category - Article category
 * @returns Array of objects with locale and slug
 */
export function getAllArticlePaths(category: Category): { locale: 'pt' | 'en'; slug: string }[] {
  const locales: ('pt' | 'en')[] = ['pt', 'en'];
  const paths: { locale: 'pt' | 'en'; slug: string }[] = [];

  locales.forEach((locale) => {
    const slugs = getArticleSlugs(category, locale);
    slugs.forEach((slug) => {
      paths.push({ locale, slug });
    });
  });

  return paths;
}
