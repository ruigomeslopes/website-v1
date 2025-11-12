'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

export default function TagFilter({ tags, selectedTags, onTagToggle, onClearFilters }: TagFilterProps) {
  const t = useTranslations('category');

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {t('filterByTag')}
        </h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-xs text-[var(--accent-primary)] hover:underline"
          >
            {t('clearFilters')}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className="transition-transform hover:scale-105 active:scale-95"
            >
              <Badge
                variant={isSelected ? 'primary' : 'secondary'}
                size="md"
                className="cursor-pointer"
              >
                {tag}
              </Badge>
            </button>
          );
        })}
      </div>

      {selectedTags.length > 0 && (
        <p className="text-xs text-[var(--text-tertiary)]">
          {t('activeFilters', { count: selectedTags.length })}
        </p>
      )}
    </div>
  );
}
