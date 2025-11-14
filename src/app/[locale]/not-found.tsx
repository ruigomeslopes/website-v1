import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('errors.404');

  const categories = [
    { slug: 'football', icon: '⚽', label: 'Football' },
    { slug: 'motogp', icon: '🏍️', label: 'MotoGP' },
    { slug: 'gaming', icon: '🎮', label: 'Gaming' },
    { slug: 'books', icon: '📚', label: 'Books' },
    { slug: 'movies', icon: '🎬', label: 'Movies' },
    { slug: 'tvshows', icon: '📺', label: 'TV Shows' },
    { slug: 'travel', icon: '✈️', label: 'Travel' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Large 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold font-heading text-accent-primary opacity-20">
            404
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold font-heading text-text-primary mb-4">
          {t('heading')}
        </h2>

        {/* Message */}
        <p className="text-lg text-text-secondary mb-2">
          {t('message')}
        </p>

        {/* Suggestion */}
        <p className="text-base text-text-tertiary mb-8">
          {t('suggestion')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/">
            <Button variant="primary" size="lg">
              {t('backHome')}
            </Button>
          </Link>
        </div>

        {/* Category Links */}
        <div className="border-t border-border-primary pt-8">
          <h3 className="text-sm font-medium text-text-tertiary mb-4 uppercase tracking-wide">
            {t('browseCategories')}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary hover:bg-bg-tertiary border border-border-primary hover:border-accent-primary transition-all duration-200"
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm font-medium text-text-primary">
                  {category.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
