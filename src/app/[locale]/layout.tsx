import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Footer from '@/components/layout/Footer'
import { getArticleStats } from '@/lib/articles'
import { SITE_CONFIG } from '@/lib/config'
import { WebVitals } from '@/components/WebVitals'

// Google Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  title: 'Rui Lopes - Sports Journalist',
  description: 'Personal website and blog of Rui Lopes, aspiring sports journalist',
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering - CRITICAL for preventing hydration mismatches
  setRequestLocale(locale)

  // Get messages for the current locale - explicitly pass locale for static generation
  const messages = await getMessages({ locale })

  // Get article stats for footer
  const stats = await getArticleStats(locale as 'pt' | 'en')

  return (
    <html lang={locale} className={`${inter.variable} ${merriweather.variable}`}>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <WebVitals />
          {children}
          <Footer columnsCount={stats.columnsCount} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
