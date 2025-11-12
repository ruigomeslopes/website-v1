'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Get browser language preference
    const browserLang = navigator.language.toLowerCase()

    // Check if user has a stored preference
    const storedLocale = localStorage.getItem('preferredLocale')

    let locale = 'pt' // default

    if (storedLocale && (storedLocale === 'pt' || storedLocale === 'en')) {
      // Use stored preference
      locale = storedLocale
    } else if (browserLang.startsWith('en')) {
      // Browser prefers English
      locale = 'en'
    }
    // Otherwise use default 'pt'

    // Store the preference
    localStorage.setItem('preferredLocale', locale)

    // Redirect to the appropriate locale
    router.replace(`/${locale}`)
  }, [router])

  // Show a minimal loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-text-secondary">Loading...</p>
      </div>
    </div>
  )
}
