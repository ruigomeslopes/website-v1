'use client';

import { useState } from 'react';
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

interface DockNavigationProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

interface DockItem {
  key: string;
  icon: React.ElementType;
  href?: string;
  action?: () => void;
  type: 'link' | 'action';
}

export function DockNavigation({ orientation = 'horizontal', className = '' }: DockNavigationProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const { currentLocale: locale, switchLanguage } = useLanguageSwitch();
  const { theme, toggleTheme, mounted } = useTheme();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const getScale = (index: number) => {
    // Disable magnification effect in vertical mode (limited space)
    if (orientation === 'vertical') return 1;

    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    if (distance === 2) return 1.1;
    return 1;
  };

  if (!mounted) return null;

  const isHorizontal = orientation === 'horizontal';

  return (
    <nav
      className={`dock-navigation ${isHorizontal ? 'horizontal' : 'vertical'} ${className}`}
      aria-label="Main navigation"
    >
      <div
        className={`
          flex ${isHorizontal ? 'flex-row' : 'flex-col'}
          items-center
          ${isHorizontal ? 'gap-3 p-3' : 'gap-2 p-2'}
          rounded-2xl
          bg-bg-secondary/80 backdrop-blur-lg
          border border-border-primary
          shadow-lg
        `}
      >
        {dockItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const scale = getScale(index);

          const itemContent = (
            <div
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`
                  dock-item
                  flex items-center justify-center
                  ${isHorizontal ? 'w-12 h-12' : 'w-10 h-10'}
                  rounded-xl
                  transition-all duration-200 ease-out
                  ${active
                    ? 'bg-accent-primary text-white'
                    : 'bg-bg-primary text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary'
                  }
                  cursor-pointer
                `}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: isHorizontal ? 'bottom' : 'right'
                }}
              >
                <Icon className={isHorizontal ? 'w-6 h-6' : 'w-5 h-5'} strokeWidth={2} />
              </div>

              {/* Tooltip */}
              <div
                className={`
                  absolute ${isHorizontal ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : 'right-full mr-2 top-1/2 -translate-y-1/2'}
                  px-3 py-1.5 rounded-lg
                  bg-bg-tertiary text-white text-sm font-medium
                  whitespace-nowrap
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                  pointer-events-none
                  z-50
                `}
              >
                {t(`dock.${item.key}`)}
                <div
                  className={`
                    absolute ${isHorizontal ? 'top-full left-1/2 -translate-x-1/2' : 'left-full top-1/2 -translate-y-1/2'}
                    w-0 h-0
                    border-4 border-transparent
                    ${isHorizontal ? 'border-t-gray-900' : 'border-l-gray-900'}
                  `}
                />
              </div>

              {/* Active Indicator */}
              {active && (
                <div
                  className={`
                    absolute ${isHorizontal ? '-bottom-1 left-1/2 -translate-x-1/2' : '-right-1 top-1/2 -translate-y-1/2'}
                    w-1 h-1 rounded-full bg-accent-primary
                    animate-pulse
                  `}
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

          return (
            <button
              key={item.key}
              onClick={item.action}
              type="button"
              aria-label={t(`dock.${item.key}`)}
            >
              {itemContent}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
