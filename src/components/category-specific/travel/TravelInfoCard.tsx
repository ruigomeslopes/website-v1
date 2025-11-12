import React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';

interface TravelInfoCardProps {
  destination: string;
  country: string;
  tripStartDate: string;
  tripEndDate: string;
  budgetLevel: string;
  rating: number; // 1-5
}

export default function TravelInfoCard({
  destination,
  country,
  tripStartDate,
  tripEndDate,
  budgetLevel,
  rating,
}: TravelInfoCardProps) {
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

  // Budget badge variant
  const getBudgetVariant = () => {
    const level = budgetLevel.toLowerCase();
    if (level.includes('baixo') || level.includes('low')) return 'success';
    if (level.includes('médio') || level.includes('medium')) return 'info';
    if (level.includes('alto') || level.includes('high')) return 'warning';
    return 'default';
  };

  return (
    <div className="my-6 bg-bg-secondary border border-border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Destination */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">📍</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary">{t('destination')}</div>
            <div className="font-semibold text-text-primary">{destination}</div>
            <div className="text-sm text-text-secondary">{country}</div>
          </div>
        </div>

        {/* Trip Duration */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">📅</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary">{t('tripDuration')}</div>
            <div className="font-semibold text-text-primary">
              {formatSimpleDate(tripStartDate)} - {formatSimpleDate(tripEndDate)}
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">💰</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary mb-1">{t('budget')}</div>
            <Badge variant={getBudgetVariant()}>{budgetLevel}</Badge>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">⭐</span>
        <div className="flex flex-col">
          <div className="text-sm text-text-secondary">{t('rating')}</div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < rating ? 'text-yellow-400' : 'text-border'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 font-semibold text-text-primary">
              {rating}/5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
