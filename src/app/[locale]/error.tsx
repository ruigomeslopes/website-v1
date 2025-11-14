'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('errors.500');
  const tGeneral = useTranslations('errors.general');

  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center">
            <span className="text-6xl">⚠️</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold font-heading text-text-primary mb-4">
          {t('heading')}
        </h2>

        {/* Message */}
        <p className="text-lg text-text-secondary mb-2">
          {t('message')}
        </p>

        {/* Suggestion */}
        <p className="text-base text-text-tertiary mb-8">
          {t('suggestion')}
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-bg-secondary border border-border-primary rounded-lg text-left">
            <p className="text-sm font-mono text-error mb-2">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-text-tertiary">
                {tGeneral('errorCode')}: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" onClick={reset}>
            {t('refresh')}
          </Button>
          <Link href="/">
            <Button variant="secondary" size="lg">
              {t('backHome')}
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-text-tertiary">
          {tGeneral('contactSupport')}: rui.lopes@sports-journalist.com
        </p>
      </div>
    </div>
  );
}
