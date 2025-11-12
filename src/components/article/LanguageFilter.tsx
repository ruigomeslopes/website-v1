import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';

type LanguageOption = 'all' | 'pt' | 'en';

interface LanguageFilterProps {
  currentLanguage: LanguageOption;
  onLanguageChange: (language: LanguageOption) => void;
}

export default function LanguageFilter({
  currentLanguage,
  onLanguageChange,
}: LanguageFilterProps) {
  const t = useTranslations('category');

  const languages: { value: LanguageOption; label: string }[] = [
    { value: 'all', label: t('allLanguages') },
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-text-secondary">
        {t('filterByLanguage')}
      </label>
      <div className="flex flex-wrap gap-2">
        {languages.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onLanguageChange(value)}
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <Badge
              variant={currentLanguage === value ? 'primary' : 'secondary'}
              size="md"
            >
              {label}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
