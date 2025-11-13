'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
  const params = useParams();
  const locale = params.locale as string;

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = (savedTheme as 'light' | 'dark') || systemTheme;
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'pt' ? 'en' : 'pt';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = pathWithoutLocale === '' || pathWithoutLocale === '/'
      ? `/${newLocale}/`
      : `/${newLocale}${pathWithoutLocale}`;
    window.location.href = newPath;
  };

  const dockItems: DockItem[] = [
    { key: 'home', icon: Home, href: `/${locale}`, type: 'link' },
    { key: 'football', icon: Trophy, href: `/${locale}/football`, type: 'link' },
    { key: 'motogp', icon: Bike, href: `/${locale}/motogp`, type: 'link' },
    { key: 'gaming', icon: Gamepad2, href: `/${locale}/gaming`, type: 'link' },
    { key: 'books', icon: BookOpen, href: `/${locale}/books`, type: 'link' },
    { key: 'movies', icon: Film, href: `/${locale}/movies`, type: 'link' },
    { key: 'tvshows', icon: Tv, href: `/${locale}/tvshows`, type: 'link' },
    { key: 'travel', icon: Plane, href: `/${locale}/travel`, type: 'link' },
    { key: 'theme', icon: theme === 'light' ? Moon : Sun, action: toggleTheme, type: 'action' },
    { key: 'language', icon: Globe, action: toggleLanguage, type: 'action' }
  ];

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === `/${locale}`) return pathname === `/${locale}`;
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
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-secondary/95 backdrop-blur-lg border-b border-border-primary shadow-md">
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
                    : 'bg-surface-primary text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary'
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
                  bg-gray-900 text-white text-xs font-medium
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
