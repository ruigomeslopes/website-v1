import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSplitScreen } from '@/components/home/HeroSplitScreen';
import { HeroMobile } from '@/components/home/HeroMobile';
import { TimelineSection } from '@/components/home/TimelineSection';
import { HomePageClient } from '@/components/home/HomePageClient';
import StructuredData from '@/components/StructuredData';
import { getAllArticlesWithCategory } from '@/lib/articles';
import { SITE_CONFIG } from '@/lib/config';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface HomeProps {
  params: Promise<{
    locale: 'pt' | 'en';
  }>;
}

// Generate metadata for homepage SEO
export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = locale === 'pt'
    ? 'Rui Lopes - Jornalista Desportivo'
    : 'Rui Lopes - Sports Journalist';

  const description = locale === 'pt'
    ? 'Website pessoal e blog de Rui Lopes, jornalista desportivo aspirante. Artigos sobre futebol, MotoGP, gaming, livros, filmes, séries e viagens.'
    : 'Personal website and blog of Rui Lopes, aspiring sports journalist. Articles about football, MotoGP, gaming, books, movies, TV shows and travel.';

  return {
    title,
    description,
    authors: [{ name: SITE_CONFIG.author.name }],
    keywords: locale === 'pt'
      ? ['jornalismo desportivo', 'futebol', 'motogp', 'gaming', 'análise tática', 'críticas', 'viagens']
      : ['sports journalism', 'football', 'motogp', 'gaming', 'tactical analysis', 'reviews', 'travel'],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'pt': '/pt',
        'en': '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.baseUrl}/${locale}`,
      siteName: SITE_CONFIG.siteName,
      locale: locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${SITE_CONFIG.baseUrl}/images/rui-lopes-photo.jpg`,
          width: 1200,
          height: 630,
          alt: 'Rui Lopes - Sports Journalist',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE_CONFIG.author.twitter,
      images: [`${SITE_CONFIG.baseUrl}/images/rui-lopes-photo.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  // Fetch latest articles for timeline
  const articles = await getAllArticlesWithCategory(locale);

  const description = locale === 'pt'
    ? 'Jornalista desportivo aspirante, analista e contador de histórias. Escrevo sobre futebol, MotoGP, gaming, livros, filmes, séries e viagens.'
    : 'Aspiring sports journalist, analyst and storyteller. I write about football, MotoGP, gaming, books, movies, TV shows and travel.';

  return (
    <>
      {/* Structured Data - WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Rui Lopes',
            url: `${SITE_CONFIG.baseUrl}/${locale}`,
            description,
            inLanguage: locale === 'pt' ? 'pt-PT' : 'en-US',
            author: {
              '@type': 'Person',
              name: SITE_CONFIG.author.name,
            },
          }),
        }}
      />

      {/* Structured Data - Person Schema */}
      <StructuredData
        type="person"
        data={{
          name: SITE_CONFIG.author.name,
          url: `${SITE_CONFIG.baseUrl}/${locale}`,
          description,
          sameAs: [
            SITE_CONFIG.social.twitter,
            SITE_CONFIG.social.linkedin,
          ],
        }}
      />

      <HomePageClient locale={locale}>
        {/* Desktop Cover & Hero */}
        <div className="hidden lg:block">
          <HeroSplitScreen />
        </div>

        {/* Mobile Cover & Hero */}
        <div className="lg:hidden">
          <HeroMobile />
        </div>

        {/* Timeline Section */}
        <TimelineSection articles={articles} locale={locale} />
      </HomePageClient>
    </>
  );
}

// Generate static params for both locales
export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
