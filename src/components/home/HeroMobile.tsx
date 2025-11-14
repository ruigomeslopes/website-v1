'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { NavigableText } from './NavigableText';
import { ScrollHint } from './ScrollHint';
import { useScrollManager } from '@/hooks/useScrollManager';

export function HeroMobile() {
  const t = useTranslations();
  const { currentSection } = useScrollManager({
    coverThreshold: 50,
  });

  // Only show scroll hints in cover section (before user starts scrolling)
  const showScrollHint = currentSection === 'cover';

  return (
    <>
      {/* Viewport 1: Name + Subtitle */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-bg-primary px-6">
        <div className="text-center space-y-6">
          {/* Name */}
          <div className="space-y-1">
            <h1 className="text-6xl sm:text-7xl font-bold text-text-primary tracking-tight">
              Rui
            </h1>
            <h1 className="text-6xl sm:text-7xl font-bold text-text-primary tracking-tight">
              Lopes
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-text-secondary font-medium">
            {t('homepage.newSubtitle')}
          </p>
        </div>

        {/* Scroll Hint */}
        <ScrollHint position="center" isVisible={showScrollHint} />
      </section>

      {/* Viewport 2: Navigable Phrases */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-bg-primary px-6">
        <div className="max-w-lg space-y-6">
          <NavigableText
            text={t('homepage.navigableText.phrase1')}
            className="text-base sm:text-lg text-text-secondary leading-relaxed text-center"
          />
          <NavigableText
            text={t('homepage.navigableText.phrase2')}
            className="text-base sm:text-lg text-text-secondary leading-relaxed text-center"
          />
          <NavigableText
            text={t('homepage.navigableText.phrase3')}
            className="text-base sm:text-lg text-text-secondary leading-relaxed text-center"
          />
        </div>

        {/* Scroll Hint */}
        <ScrollHint position="center" isVisible={showScrollHint} />
      </section>

      {/* Viewport 3: Photo */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 px-6">
        {/* Placeholder for photo */}
        <div className="w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
          <div className="w-full h-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-accent-primary/30 flex items-center justify-center">
                <span className="text-5xl">📸</span>
              </div>
              <p className="text-text-secondary text-lg font-medium">
                Foto do Rui Lopes
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <ScrollHint position="center" isVisible={showScrollHint} />
      </section>
    </>
  );
}
