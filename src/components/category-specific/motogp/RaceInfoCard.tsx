import React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';

interface RaceInfoCardProps {
  gpName: string;
  circuit: string;
  date: string;
  category: 'MotoGP' | 'Moto2' | 'Moto3';
}

export default function RaceInfoCard({
  gpName,
  circuit,
  date,
  category,
}: RaceInfoCardProps) {
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

  // Category color mapping
  const getCategoryVariant = () => {
    switch (category) {
      case 'MotoGP':
        return 'primary';
      case 'Moto2':
        return 'info';
      case 'Moto3':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="my-6 bg-bg-secondary border border-border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GP Name */}
        <div className="flex flex-col">
          <div className="text-sm text-text-secondary mb-1">{t('gpName')}</div>
          <div className="font-semibold text-text-primary">{gpName}</div>
        </div>

        {/* Circuit */}
        <div className="flex flex-col">
          <div className="text-sm text-text-secondary mb-1">{t('circuit')}</div>
          <div className="font-semibold text-text-primary">{circuit}</div>
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <div className="text-sm text-text-secondary mb-1">{t('date')}</div>
          <div className="font-semibold text-text-primary">
            {formatSimpleDate(date)}
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <div className="text-sm text-text-secondary mb-1">{t('raceCategory')}</div>
          <div>
            <Badge variant={getCategoryVariant()}>{category}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
