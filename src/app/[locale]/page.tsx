import { HeroSplitScreen } from '@/components/home/HeroSplitScreen';
import CoverMobile from '@/components/home/CoverMobile';
import HeroParallaxMobile from '@/components/home/HeroParallaxMobile';
import { TimelineSection } from '@/components/home/TimelineSection';
import { HomePageClient } from '@/components/home/HomePageClient';
import { getAllArticlesWithCategory } from '@/lib/articles';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

// Generate static params for both locales
export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}

interface HomeProps {
  params: Promise<{
    locale: 'pt' | 'en';
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  // Fetch latest articles for timeline
  const articles = await getAllArticlesWithCategory(locale);

  return (
    <HomePageClient locale={locale}>
      {/* Desktop Cover & Hero */}
      <div className="hidden lg:block">
        <HeroSplitScreen />
      </div>

      {/* Mobile Cover & Hero */}
      <div className="lg:hidden">
        <CoverMobile />
        <HeroParallaxMobile />
      </div>

      {/* Timeline Section */}
      <TimelineSection articles={articles} locale={locale} />
    </HomePageClient>
  );
}
