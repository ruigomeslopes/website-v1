// Locale types for internationalization
export type Locale = 'pt' | 'en'

export interface LocaleParams {
  locale: Locale
}

// Page params interface for locale-aware pages
export interface PageProps {
  params: LocaleParams
}

// Layout params interface for locale-aware layouts
export interface LayoutProps {
  children: React.ReactNode
  params: LocaleParams
}
