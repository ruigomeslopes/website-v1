import { MetadataRoute } from 'next'
import { getArticleSlugs } from '@/lib/articles'
import { locales } from '@/i18n'
import type { Category } from '@/types/article'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ruilopes.github.io/website-v1'
const categories: Category[] = ['football', 'motogp', 'gaming', 'books', 'movies', 'tvshows', 'travel']

// Force static export for GitHub Pages
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []

  // Homepage (with locale alternates)
  locales.forEach((locale) => {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          pt: `${baseUrl}/pt`,
          en: `${baseUrl}/en`,
        },
      },
    })
  })

  // Category pages (with locale alternates)
  categories.forEach((category) => {
    locales.forEach((locale) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            pt: `${baseUrl}/pt/${category}`,
            en: `${baseUrl}/en/${category}`,
          },
        },
      })
    })
  })

  // Auxiliary pages (with locale alternates)
  const auxiliaryPages = ['about', 'contact']
  auxiliaryPages.forEach((page) => {
    locales.forEach((locale) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            pt: `${baseUrl}/pt/${page}`,
            en: `${baseUrl}/en/${page}`,
          },
        },
      })
    })
  })

  // Article pages (with locale alternates)
  categories.forEach((category) => {
    locales.forEach((locale) => {
      const slugs = getArticleSlugs(category, locale)
      slugs.forEach((slug) => {
        sitemap.push({
          url: `${baseUrl}/${locale}/${category}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              pt: `${baseUrl}/pt/${category}/${slug}`,
              en: `${baseUrl}/en/${category}/${slug}`,
            },
          },
        })
      })
    })
  })

  return sitemap
}
