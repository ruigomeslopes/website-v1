import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Supported locales for the application
export const locales = ['pt', 'en'] as const
export type Locale = (typeof locales)[number]

// Default locale (Portuguese primary)
export const defaultLocale: Locale = 'pt'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
    timeZone: 'Europe/Lisbon',
  }
})
