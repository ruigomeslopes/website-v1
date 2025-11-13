'use client';

import { DockNavigation } from './DockNavigation';
import { DockMobile } from './DockMobile';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      {/* Desktop: Vertical Dock on Right Side */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <DockNavigation orientation="vertical" />
      </div>

      {/* Mobile: Floating Button with Vertical Menu */}
      <div className="lg:hidden">
        <DockMobile />
      </div>

      {/* Page Content */}
      <main className="flex flex-col min-h-screen">
        {children}
      </main>
    </>
  );
}
