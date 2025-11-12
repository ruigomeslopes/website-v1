import { useTranslations } from 'next-intl';

export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  const t = useTranslations('category');

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-[var(--text-secondary)] mr-2">
        {t('viewMode')}:
      </span>
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg transition-all ${
          currentView === 'grid'
            ? 'bg-[var(--accent-primary)] text-white'
            : 'bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:bg-[var(--background-tertiary)]'
        }`}
        aria-label={t('gridView')}
        title={t('gridView')}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="7" height="7" strokeWidth="2" rx="1" />
          <rect x="14" y="3" width="7" height="7" strokeWidth="2" rx="1" />
          <rect x="3" y="14" width="7" height="7" strokeWidth="2" rx="1" />
          <rect x="14" y="14" width="7" height="7" strokeWidth="2" rx="1" />
        </svg>
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-lg transition-all ${
          currentView === 'list'
            ? 'bg-[var(--accent-primary)] text-white'
            : 'bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:bg-[var(--background-tertiary)]'
        }`}
        aria-label={t('listView')}
        title={t('listView')}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="12" x2="20" y2="12" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="18" x2="20" y2="18" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
