'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import type { Locale } from '@/types'

export default function Header() {
  const t = useTranslations()
  const params = useParams()
  const locale = params.locale as Locale
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const categories = [
    { key: 'football', emoji: '⚽', href: `/${locale}/football` },
    { key: 'motogp', emoji: '🏍️', href: `/${locale}/motogp` },
    { key: 'gaming', emoji: '🎮', href: `/${locale}/gaming` },
    { key: 'movies', emoji: '🎬', href: `/${locale}/movies` },
    { key: 'tvshows', emoji: '📺', href: `/${locale}/tvshows` },
    { key: 'books', emoji: '📚', href: `/${locale}/books` },
    { key: 'travel', emoji: '✈️', href: `/${locale}/travel` },
  ]

  const navLinks = [
    { key: 'latest', href: `/${locale}/latest` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ]

  return (
    <header className="sticky top-0 z-50 bg-surface-primary border-b border-border-primary backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="font-heading text-xl font-bold text-text-primary hover:text-brand-primary transition-colors"
          >
            Rui Lopes
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-text-secondary hover:text-text-primary transition-colors py-2 px-3 rounded-md hover:bg-surface-secondary">
                {t('navigation.categories', { default: 'Categories' })} ▾
              </button>
              <div className="absolute left-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-surface-primary border border-border-primary rounded-lg shadow-lg py-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.key}
                    href={cat.href}
                    className="block px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
                  >
                    <span className="mr-2">{cat.emoji}</span>
                    {t(`categories.${cat.key}`)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors py-2 px-3 rounded-md hover:bg-surface-secondary"
              >
                {t(`navigation.${link.key}`)}
              </Link>
            ))}

            {/* Theme & Language Toggles */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border-primary">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border-primary">
            {/* Categories */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 px-3">
                {t('navigation.categories', { default: 'Categories' })}
              </div>
              {categories.map((cat) => (
                <Link
                  key={cat.key}
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors rounded-md"
                >
                  <span className="mr-2">{cat.emoji}</span>
                  {t(`categories.${cat.key}`)}
                </Link>
              ))}
            </div>

            {/* Nav Links */}
            <div className="border-t border-border-primary pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors rounded-md"
                >
                  {t(`navigation.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
