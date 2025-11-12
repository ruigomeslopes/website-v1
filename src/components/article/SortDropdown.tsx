'use client';

import { useTranslations } from 'next-intl';

export type SortOption = 'latest' | 'oldest';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  const t = useTranslations('category');

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-sm font-medium text-[var(--text-primary)]">
        {t('sortBy')}:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-colors cursor-pointer"
      >
        <option value="latest">{t('sortLatest')}</option>
        <option value="oldest">{t('sortOldest')}</option>
      </select>
    </div>
  );
}
