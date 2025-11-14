'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch';
import { useTheme } from '@/hooks/useTheme';
import {
  Home,
  Trophy,
  Bike,
  Gamepad2,
  BookOpen,
  Film,
  Tv,
  Plane,
  Sun,
  Moon,
  Globe
} from 'lucide-react';

interface DockTopBarProps {
  isVisible: boolean;
}

interface DockItem {
  key: string;
  icon: React.ElementType;
  href?: string;
  action?: () => void;
  type: 'link' | 'action';
}

export function DockTopBar({ isVisible }: DockTopBarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const { currentLocale: locale, switchLanguage } = useLanguageSwitch();
  const { theme, toggleTheme, mounted } = useTheme();

  const toggleLanguage = () => {
    const newLocale = locale === 'pt' ? 'en' : 'pt';
    switchLanguage(newLocale);
  };

  const dockItems: DockItem[] = [
    { key: 'home', icon: Home, href: '/', type: 'link' },
    { key: 'football', icon: Trophy, href: '/football', type: 'link' },
    { key: 'motogp', icon: Bike, href: '/motogp', type: 'link' },
    { key: 'gaming', icon: Gamepad2, href: '/gaming', type: 'link' },
    { key: 'books', icon: BookOpen, href: '/books', type: 'link' },
    { key: 'movies', icon: Film, href: '/movies', type: 'link' },
    { key: 'tvshows', icon: Tv, href: '/tvshows', type: 'link' },
    { key: 'travel', icon: Plane, href: '/travel', type: 'link' },
    { key: 'theme', icon: theme === 'light' ? Moon : Sun, action: toggleTheme, type: 'action' },
    { key: 'language', icon: Globe, action: toggleLanguage, type: 'action' }
  ];

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  if (!mounted) return null;

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-transform duration-500 ease-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-bg-secondary/95 backdrop-blur-lg border-b border-border-primary shadow-md">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          const itemContent = (
            <div className="relative group">
              <button
                onClick={item.action}
                className={`
                  flex items-center justify-center
                  w-10 h-10
                  rounded-lg
                  transition-all duration-200
                  ${active
                    ? 'bg-accent-primary text-white'
                    : 'bg-bg-primary text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary'
                  }
                `}
                aria-label={t(`dock.${item.key}`)}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </button>

              {/* Tooltip */}
              <div
                className={`
                  absolute top-full mt-1 left-1/2 -translate-x-1/2
                  px-2 py-1 rounded
                  bg-bg-tertiary text-white text-xs font-medium
                  whitespace-nowrap
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                  pointer-events-none
                  z-50
                `}
              >
                {t(`dock.${item.key}`)}
              </div>

              {/* Active Indicator */}
              {active && (
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-primary animate-pulse"
                />
              )}
            </div>
          );

          if (item.type === 'link' && item.href) {
            return (
              <Link key={item.key} href={item.href}>
                {itemContent}
              </Link>
            );
          }

          return <div key={item.key}>{itemContent}</div>;
        })}
      </div>
    </nav>
  );
}
