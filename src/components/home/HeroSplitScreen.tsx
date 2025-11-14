'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { NavigableText } from './NavigableText';
import SocialLinks from './SocialLinks';
import { DockNavigation } from '../layout/DockNavigation';
import { ScrollHint } from './ScrollHint';
import { useScrollManager } from '@/hooks/useScrollManager';
import { getImagePath } from '@/utils/getImagePath';

interface HeroSplitScreenProps {
  onScrollClick?: () => void;
}

export function HeroSplitScreen({ onScrollClick }: HeroSplitScreenProps) {
  const t = useTranslations();
  const { showTopDock, currentSection } = useScrollManager({
    coverThreshold: 50, // 50px = triggers immediately on scroll
  });

  // Show dock in hero when top dock is hidden (in cover section)
  const showDock = !showTopDock;

  // Only show scroll hints in cover section (before user starts scrolling)
  const showScrollHint = currentSection === 'cover';

  return (
    <section className="relative min-h-screen w-full flex flex-col">
      {/* Split Screen Container */}
      <div className="flex-1 grid grid-cols-2">
        {/* Left Side - Content */}
        <div className="relative flex flex-col justify-start items-start px-8 lg:px-12 xl:px-16 pt-10 pb-10 bg-bg-primary">
          <div className="max-w-xl space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-text-primary tracking-tight">
                Rui
              </h1>
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-text-primary tracking-tight">
                Lopes
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-2xl lg:text-3xl text-text-secondary font-medium">
              {t('header.tagline')}
            </p>

            {/* Social Links */}
            <div className="pt-6">
              <SocialLinks orientation="horizontal" size="lg" />
            </div>

            {/* Navigable Text */}
            <div className="pt-6 mt-6 border-t border-border-primary space-y-4">
              <NavigableText
                text={t('homepage.navigableText.phrase1')}
                className="text-sm sm:text-base lg:text-lg text-text-primary leading-relaxed font-light tracking-wide"
                showEmojis={true}
              />
              <NavigableText
                text={t('homepage.navigableText.phrase2')}
                className="text-sm sm:text-base lg:text-lg text-text-primary leading-relaxed font-light tracking-wide"
                showEmojis={true}
              />
              <NavigableText
                text={t('homepage.navigableText.phrase3')}
                className="text-sm sm:text-base lg:text-lg text-text-primary leading-relaxed font-light tracking-wide"
                showEmojis={true}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Photo */}
        <div className="relative overflow-hidden">
          {/* Professional Photo */}
          <Image
            src={getImagePath("/images/rui-lopes-photo.jpg")}
            alt="Rui Lopes - Journalist and Storyteller"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />

          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
        </div>
      </div>

      {/* Scroll Hints - Positioned on Section */}
      <div className="absolute bottom-14 left-8 z-10">
        <ScrollHint position="left" onClick={onScrollClick} isVisible={showScrollHint} />
      </div>
      <div className="absolute bottom-14 right-8 z-10">
        <ScrollHint position="right" onClick={onScrollClick} isVisible={showScrollHint} />
      </div>

      {/* Dock Navigation - Centered */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500 ease-out ${
          showDock ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <DockNavigation orientation="horizontal" />
      </div>
    </section>
  );
}
