import React from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';

// Movies
interface MovieInfoProps {
  type: 'movie';
  director: string;
  releaseYear: number;
  runtime: number; // in minutes
  whereWatched: string;
}

// TV Shows
interface TVShowInfoProps {
  type: 'tvshow';
  creator: string;
  seasons: number;
  episodes: number;
  platform: string;
  status: 'Ongoing' | 'Completed' | 'Cancelled';
}

type MediaInfoCardProps = MovieInfoProps | TVShowInfoProps;

export default function MediaInfoCard(props: MediaInfoCardProps) {
  const t = useTranslations('article');

  // Helper to format runtime (e.g., 150 min = "2h 30min")
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}min`;
    }
    if (hours > 0) {
      return `${hours}h`;
    }
    return `${mins}min`;
  };

  // Status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Ongoing':
        return 'info';
      case 'Completed':
        return 'success';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (props.type === 'movie') {
    return (
      <div className="my-6 bg-bg-secondary border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Director */}
          <div className="flex items-start gap-2">
            <span className="text-2xl">🎬</span>
            <div className="flex flex-col">
              <div className="text-sm text-text-secondary">{t('director')}</div>
              <div className="font-semibold text-text-primary">
                {props.director}
              </div>
            </div>
          </div>

          {/* Release Year */}
          <div className="flex items-start gap-2">
            <span className="text-2xl">📅</span>
            <div className="flex flex-col">
              <div className="text-sm text-text-secondary">{t('releaseYear')}</div>
              <div className="font-semibold text-text-primary">
                {props.releaseYear}
              </div>
            </div>
          </div>

          {/* Runtime */}
          <div className="flex items-start gap-2">
            <span className="text-2xl">⏱️</span>
            <div className="flex flex-col">
              <div className="text-sm text-text-secondary">{t('runtime')}</div>
              <div className="font-semibold text-text-primary">
                {formatRuntime(props.runtime)}
              </div>
            </div>
          </div>

          {/* Where Watched */}
          <div className="flex items-start gap-2">
            <span className="text-2xl">📺</span>
            <div className="flex flex-col">
              <div className="text-sm text-text-secondary">{t('whereWatched')}</div>
              <div className="font-semibold text-text-primary">
                {props.whereWatched}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TV Show
  return (
    <div className="my-6 bg-bg-secondary border border-border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Creator */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">🎬</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary">{t('creator')}</div>
            <div className="font-semibold text-text-primary">{props.creator}</div>
          </div>
        </div>

        {/* Seasons & Episodes */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">📺</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary">{t('seasonsEpisodes')}</div>
            <div className="font-semibold text-text-primary">
              {props.seasons} {t('seasons')}, {props.episodes} {t('episodes')}
            </div>
          </div>
        </div>

        {/* Platform */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">🖥️</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary">{t('platform')}</div>
            <div className="font-semibold text-text-primary">{props.platform}</div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <div className="text-sm text-text-secondary">{t('status')}:</div>
        <Badge variant={getStatusVariant(props.status)}>{props.status}</Badge>
      </div>
    </div>
  );
}
