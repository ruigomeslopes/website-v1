import React from 'react';
import { useTranslations } from 'next-intl';

interface MatchInfoCardProps {
  teams: string;
  competition: string;
  matchDate: string;
  result: string;
}

export default function MatchInfoCard({
  teams,
  competition,
  matchDate,
  result,
}: MatchInfoCardProps) {
  const t = useTranslations('article');

  // Simple date formatting without locale dependency
  const formatSimpleDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="my-6 bg-bg-secondary border border-border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Teams */}
        <div className="flex flex-col">
          <div className="text-sm text-text-secondary mb-1">{t('teams')}</div>
          <div className="font-semibold text-text-primary">{teams}</div>
        </div>

        {/* Competition */}
        <div className="flex flex-col">
          <div className="text-sm text-text-secondary mb-1">{t('competition')}</div>
          <div className="font-semibold text-text-primary">{competition}</div>
        </div>

        {/* Match Date */}
        <div className="flex flex-col">
          <div className="text-sm text-text-secondary mb-1">{t('matchDate')}</div>
          <div className="font-semibold text-text-primary">
            {formatSimpleDate(matchDate)}
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col">
          <div className="text-sm text-text-secondary mb-1">{t('result')}</div>
          <div className="font-bold text-lg text-accent">{result}</div>
        </div>
      </div>
    </div>
  );
}
