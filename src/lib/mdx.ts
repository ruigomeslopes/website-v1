import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import type { ArticleFrontmatter } from '@/types/article';

/**
 * Calculate reading time based on word count
 * Formula: words / 200 words-per-minute
 */
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Parse an MDX file and return frontmatter, HTML content, and reading time
 * @param filePath - Full path to the MDX file
 * @returns Object containing frontmatter, HTML content, and reading time
 */
export async function parseMDX(filePath: string): Promise<{
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: number;
}> {
  // Read the file
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parse frontmatter using gray-matter
  const { data, content } = matter(fileContents);

  // Convert Markdown to HTML using remark
  const processedContent = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkRehype) // Convert mdast to hast (markdown to HTML AST)
    .use(rehypeStringify) // Serialize hast to HTML string
    .process(content);

  const htmlContent = processedContent.toString();

  // Calculate reading time
  const readingTime = calculateReadingTime(content);

  return {
    frontmatter: data as ArticleFrontmatter,
    content: htmlContent,
    readingTime,
  };
}

/**
 * Get the full path to a content file
 * @param category - Article category
 * @param locale - Locale (pt or en)
 * @param slug - Article slug
 * @returns Full file path
 */
export function getContentPath(category: string, locale: string, slug: string): string {
  return path.join(process.cwd(), 'src', 'content', category, locale, `${slug}.mdx`);
}
