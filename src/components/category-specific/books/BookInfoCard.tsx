import React from 'react';
import { useTranslations } from 'next-intl';

interface BookInfoCardProps {
  author: string;
  genre: string;
  pages: number;
  dateRead: string;
  rating: number; // 1-5
}

export default function BookInfoCard({
  author,
  genre,
  pages,
  dateRead,
  rating,
}: BookInfoCardProps) {
  const t = useTranslations('article');

  return (
    <div className="my-6 bg-bg-secondary border border-border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Author */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">✍️</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary">{t('author')}</div>
            <div className="font-semibold text-text-primary">{author}</div>
          </div>
        </div>

        {/* Genre */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">📚</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary">{t('genre')}</div>
            <div className="font-semibold text-text-primary">{genre}</div>
          </div>
        </div>

        {/* Pages */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">📖</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary">{t('pages')}</div>
            <div className="font-semibold text-text-primary">{pages}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Read */}
        <div className="flex items-start gap-2">
          <span className="text-2xl">📅</span>
          <div className="flex flex-col">
            <div className="text-sm text-text-secondary">{t('dateRead')}</div>
            <div className="font-semibold text-text-primary">{dateRead}</div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-start gap-2">
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
    </div>
  );
}
