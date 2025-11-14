import { useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

/**
 * Custom hook for handling language switching
 * Consolidates duplicate logic from DockNavigation, DockTopBar, and DockMobile
 */
export function useLanguageSwitch() {
  const router = useRouter();
  const params = useParams();
  const [currentLocale, setCurrentLocale] = useState<string>('pt');

  // Update current locale based on URL params or window location
  useEffect(() => {
    if (params.locale && typeof params.locale === 'string') {
      setCurrentLocale(params.locale);
    } else if (typeof window !== 'undefined') {
      // Fallback: parse locale from window.location.pathname
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const localeFromPath = pathSegments[0];
      if (localeFromPath === 'pt' || localeFromPath === 'en') {
        setCurrentLocale(localeFromPath);
      }
    }
  }, [params.locale]);

  const switchLanguage = (newLocale: string) => {
    // Get the current path from window.location to ensure accuracy
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const pathSegments = currentPath.split('/').filter(Boolean);

    // Remove the current locale from the path (first segment)
    const currentLocaleFromPath = pathSegments[0];
    let pathWithoutLocale = '';

    if (currentLocaleFromPath === 'pt' || currentLocaleFromPath === 'en') {
      // Remove the locale segment
      pathWithoutLocale = '/' + pathSegments.slice(1).join('/');
    } else {
      // No locale in path (shouldn't happen, but fallback)
      pathWithoutLocale = currentPath;
    }

    // Ensure path starts with /
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }

    console.log('[useLanguageSwitch] Switching language:', {
      from: currentLocaleFromPath || currentLocale,
      to: newLocale,
      currentPath,
      pathWithoutLocale,
      willNavigateTo: `/${newLocale}${pathWithoutLocale}`,
    });

    // Store preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLocale', newLocale);
    }

    // Navigate to new locale URL
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    window.location.href = newPath;
  };

  return {
    currentLocale,
    switchLanguage,
  };
}
