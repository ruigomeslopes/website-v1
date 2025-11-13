'use client';

import { DockTopBar } from '../layout/DockTopBar';
import { DockMobile } from '../layout/DockMobile';
import { useScrollManager } from '@/hooks/useScrollManager';

interface HomePageClientProps {
  children: React.ReactNode;
  locale: string;
}

export function HomePageClient({ children, locale }: HomePageClientProps) {
  const { showTopDock, showMobileDock, currentSection } = useScrollManager({
    coverThreshold: 50, // 50px = triggers immediately on scroll
    heroThreshold: 1000, // 1000px = after scrolling ~1-2 screens
  });

  return (
    <>
      {/* Desktop Top Bar - appears after scrolling past cover */}
      <div className="hidden lg:block">
        <DockTopBar isVisible={showTopDock} />
      </div>

      {/* Mobile Dock - appears after scrolling past cover */}
      <div className="lg:hidden">
        <DockMobile forceHidden={!showMobileDock} />
      </div>

      {/* Page Content */}
      <main className="flex flex-col">
        {children}
      </main>
    </>
  );
}
