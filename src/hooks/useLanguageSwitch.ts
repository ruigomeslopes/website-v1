import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';

/**
 * Custom hook for handling language switching
 * Consolidates duplicate logic from DockNavigation, DockTopBar, and DockMobile
 */
export function useLanguageSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const switchLanguage = (newLocale: string) => {
    // Store preference in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLocale', newLocale);
    }

    // Navigate to the same page with new locale using next-intl routing
    router.push(pathname as any, { locale: newLocale });
    router.refresh();
  };

  return {
    currentLocale,
    switchLanguage,
  };
}
