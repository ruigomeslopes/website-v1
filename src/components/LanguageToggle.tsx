'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { locales } from '@/i18n'
import { useState, useTransition } from 'react'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return

    // Store the preference in localStorage
    localStorage.setItem('preferredLocale', newLocale)

    // Get the current path without the locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, '')

    // Navigate to the same path in the new locale
    startTransition(() => {
      router.push(`/${newLocale}${pathWithoutLocale}`)
      setIsOpen(false)
    })
  }

  const getLanguageName = (loc: string) => {
    return loc === 'pt' ? 'Português' : 'English'
  }

  const getLanguageFlag = (loc: string) => {
    return loc === 'pt' ? '🇵🇹' : '🇬🇧'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary border border-border-primary hover:bg-bg-tertiary transition-colors disabled:opacity-50"
        aria-label="Switch language"
        title="Switch language"
      >
        <span>{getLanguageFlag(locale)}</span>
        <span className="text-sm font-medium">{getLanguageName(locale)}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-bg-secondary border border-border-primary shadow-lg z-50 overflow-hidden">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-bg-tertiary transition-colors ${
                  loc === locale
                    ? 'bg-bg-tertiary text-accent font-medium'
                    : 'text-text-primary'
                }`}
              >
                <span>{getLanguageFlag(loc)}</span>
                <span>{getLanguageName(loc)}</span>
                {loc === locale && (
                  <svg
                    className="w-4 h-4 ml-auto text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
