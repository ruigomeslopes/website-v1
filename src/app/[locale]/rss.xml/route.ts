import { NextRequest, NextResponse } from 'next/server'
import { getArticlesByCategory } from '@/lib/articles'
import { locales } from '@/i18n'
import type { Category } from '@/types/article'

const baseUrl = 'https://ruilopes.github.io/rl-v1'
const categories: Category[] = ['football', 'motogp', 'gaming', 'books', 'movies', 'tvshows', 'travel']

// Generate static params for both locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params as { locale: 'pt' | 'en' }

  // Collect all articles from all categories for this locale
  const allArticles: Array<{
    title: string
    description: string
    link: string
    pubDate: string
    category: string
  }> = []

  for (const category of categories) {
    const articles = await getArticlesByCategory(category, locale)

    articles.forEach((article) => {
      allArticles.push({
        title: article.frontmatter.title,
        description: article.frontmatter.excerpt,
        link: `${baseUrl}/${locale}/${category}/${article.slug}`,
        pubDate: new Date(article.frontmatter.date).toUTCString(),
        category: category,
      })
    })
  }

  // Sort articles by date (newest first)
  allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  // Generate RSS feed XML
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rui Lopes - ${locale === 'pt' ? 'Jornalista Desportivo' : 'Sports Journalist'}</title>
    <link>${baseUrl}/${locale}</link>
    <description>${locale === 'pt' ? 'Blog pessoal de Rui Lopes, aspirante a jornalista desportivo' : 'Personal blog of Rui Lopes, aspiring sports journalist'}</description>
    <language>${locale === 'pt' ? 'pt-PT' : 'en-US'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/${locale}/rss.xml" rel="self" type="application/rss+xml" />
    ${allArticles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.description}]]></description>
      <link>${article.link}</link>
      <guid isPermaLink="true">${article.link}</guid>
      <pubDate>${article.pubDate}</pubDate>
      <category>${article.category}</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
