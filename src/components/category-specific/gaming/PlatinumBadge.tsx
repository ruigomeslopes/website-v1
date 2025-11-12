import React from 'react';
import { useTranslations } from 'next-intl';

interface PlatinumBadgeProps {
  platinumed: boolean;
}

export default function PlatinumBadge({ platinumed }: PlatinumBadgeProps) {
  const t = useTranslations('article');

  if (!platinumed) return null;

  return (
    <div className="my-6 bg-gradient-to-r from-yellow-500/10 via-yellow-400/10 to-yellow-500/10 border-2 border-yellow-500 rounded-lg p-4 flex items-center gap-4">
      <div className="text-4xl">🏆</div>
      <div>
        <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
          {t('platinumAchieved')}
        </div>
        <div className="text-sm text-text-secondary">
          {t('platinumDescription')}
        </div>
      </div>
    </div>
  );
}
