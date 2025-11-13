'use client'

import { useTranslations } from 'next-intl'
import { DockNavigation } from '@/components/layout/DockNavigation'
import SocialLinks from './SocialLinks'
import { ScrollHint } from './ScrollHint'

interface CoverMobileProps {
  showDock?: boolean
}

export default function CoverMobile({ showDock = true }: CoverMobileProps) {
  const t = useTranslations()

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center bg-bg-bg-primary overflow-hidden"
      aria-label="Cover"
    >
      {/* Main Grid: 70/30 split */}
      <div className="w-full h-full grid grid-cols-[70%_30%] gap-0 px-4 py-8">
        {/* Left Column: Name + Subtitle + Social Links */}
        <div className="flex flex-col justify-center items-start space-y-6 pr-4">
          {/* Name */}
          <h1 className="text-5xl sm:text-6xl font-bold text-text-primary leading-tight">
            Rui Lopes
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-secondary font-medium max-w-md">
            {t('header.tagline')}
          </p>

          {/* Social Links */}
          <div className="pt-4">
            <SocialLinks orientation="vertical" size="md" />
          </div>
        </div>

        {/* Right Column: Vertical Dock */}
        <div
          className={`
            flex items-center justify-center
            transition-opacity duration-500
            ${showDock ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          <DockNavigation orientation="vertical" />
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollHint position="center" />
      </div>
    </section>
  )
}
