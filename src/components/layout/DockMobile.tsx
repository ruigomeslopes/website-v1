'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Menu,
  X,
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

interface DockMobileProps {
  className?: string;
  forceHidden?: boolean; // External control to hide dock (e.g., on cover section)
}

interface DockItem {
  key: string;
  icon: React.ElementType;
  href?: string;
  action?: () => void;
  type: 'link' | 'action';
  label: string;
}

export function DockMobile({ className = '', forceHidden = false }: DockMobileProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = (savedTheme as 'light' | 'dark') || systemTheme;
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide
        setIsVisible(false);
        setIsOpen(false);
      } else {
        // Scrolling up - show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'pt' ? 'en' : 'pt';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  const dockItems: DockItem[] = [
    { key: 'home', icon: Home, href: `/${locale}`, type: 'link', label: t('dock.home') },
    { key: 'football', icon: Trophy, href: `/${locale}/football`, type: 'link', label: t('dock.football') },
    { key: 'motogp', icon: Bike, href: `/${locale}/motogp`, type: 'link', label: t('dock.motogp') },
    { key: 'gaming', icon: Gamepad2, href: `/${locale}/gaming`, type: 'link', label: t('dock.gaming') },
    { key: 'books', icon: BookOpen, href: `/${locale}/books`, type: 'link', label: t('dock.books') },
    { key: 'movies', icon: Film, href: `/${locale}/movies`, type: 'link', label: t('dock.movies') },
    { key: 'tvshows', icon: Tv, href: `/${locale}/tvshows`, type: 'link', label: t('dock.tvshows') },
    { key: 'travel', icon: Plane, href: `/${locale}/travel`, type: 'link', label: t('dock.travel') },
    { key: 'theme', icon: theme === 'light' ? Moon : Sun, action: toggleTheme, type: 'action', label: t('dock.theme') },
    { key: 'language', icon: Globe, action: toggleLanguage, type: 'action', label: t('dock.language') }
  ];

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-accent-primary text-white
          shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-300
          ${isVisible && !forceHidden ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
          ${isOpen ? 'rotate-90' : 'rotate-0'}
        `}
        aria-label={t('dock.menu')}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Vertical Menu */}
      <div
        className={`
          fixed bottom-24 right-6 z-40
          flex flex-col gap-2
          p-3 rounded-2xl
          bg-surface-secondary/95 backdrop-blur-lg
          border border-border-primary
          shadow-xl
          transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        `}
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          const itemContent = (
            <div
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-xl
                transition-all duration-200
                ${active
                  ? 'bg-accent-primary text-white'
                  : 'bg-surface-primary text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary'
                }
                cursor-pointer
                min-w-[200px]
              `}
              onClick={() => {
                if (item.action) item.action();
                setIsOpen(false);
              }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
              <span className="font-medium text-sm">{item.label}</span>
              {active && (
                <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </div>
          );

          if (item.type === 'link' && item.href) {
            return (
              <Link key={item.key} href={item.href} onClick={() => setIsOpen(false)}>
                {itemContent}
              </Link>
            );
          }

          return (
            <div key={item.key}>
              {itemContent}
            </div>
          );
        })}
      </div>
    </>
  );
}
