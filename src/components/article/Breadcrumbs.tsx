import Link from 'next/link';
import type { Category } from '@/types/article';

interface BreadcrumbsProps {
  category: Category;
  articleTitle: string;
  locale: 'pt' | 'en';
}

// Static category translations for both locales
const categoryNames: Record<'pt' | 'en', Record<Category, string>> = {
  pt: {
    football: 'Futebol',
    motogp: 'MotoGP',
    gaming: 'Gaming',
    books: 'Livros',
    movies: 'Filmes',
    tvshows: 'Séries',
    travel: 'Viagens',
  },
  en: {
    football: 'Football',
    motogp: 'MotoGP',
    gaming: 'Gaming',
    books: 'Books',
    movies: 'Movies',
    tvshows: 'TV Shows',
    travel: 'Travel',
  },
};

export default function Breadcrumbs({ category, articleTitle, locale }: BreadcrumbsProps) {
  const homeText = locale === 'pt' ? 'Início' : 'Home';
  const categoryName = categoryNames[locale][category];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        {/* Home */}
        <li>
          <Link
            href={`/${locale}`}
            className="hover:text-primary transition-colors"
          >
            {homeText}
          </Link>
        </li>

        {/* Separator */}
        <li>
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>

        {/* Category */}
        <li>
          <Link
            href={`/${locale}/${category}`}
            className="hover:text-primary transition-colors"
          >
            {categoryName}
          </Link>
        </li>

        {/* Separator */}
        <li>
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>

        {/* Current Article */}
        <li>
          <span className="line-clamp-1 font-medium text-gray-900 dark:text-gray-100">
            {articleTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
