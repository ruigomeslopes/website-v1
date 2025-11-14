interface ArticleStructuredDataProps {
  type: 'article'
  data: {
    headline: string
    description: string
    image?: string
    datePublished: string
    dateModified?: string
    author: {
      name: string
    }
    publisher: {
      name: string
      logo?: string
    }
    url: string
    keywords?: string[]
  }
}

interface PersonStructuredDataProps {
  type: 'person'
  data: {
    name: string
    url: string
    description: string
    sameAs?: string[]
  }
}

type StructuredDataProps = ArticleStructuredDataProps | PersonStructuredDataProps

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: any

  if (type === 'article') {
    const articleData = data as ArticleStructuredDataProps['data']
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleData.headline,
      description: articleData.description,
      image: articleData.image,
      datePublished: articleData.datePublished,
      dateModified: articleData.dateModified || articleData.datePublished,
      author: {
        '@type': 'Person',
        name: articleData.author.name,
      },
      publisher: {
        '@type': 'Organization',
        name: articleData.publisher.name,
        logo: articleData.publisher.logo
          ? {
              '@type': 'ImageObject',
              url: articleData.publisher.logo,
            }
          : undefined,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleData.url,
      },
      keywords: articleData.keywords?.join(', '),
    }
  } else if (type === 'person') {
    const personData = data as PersonStructuredDataProps['data']
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: personData.name,
      url: personData.url,
      description: personData.description,
      sameAs: personData.sameAs,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
