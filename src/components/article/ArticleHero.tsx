import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import type { BaseFrontmatter } from '@/types/article';

interface ArticleHeroProps {
  frontmatter: BaseFrontmatter;
  readingTime: number;
  locale: 'pt' | 'en';
}

export default function ArticleHero({ frontmatter, readingTime, locale }: ArticleHeroProps) {
  const { title, date, excerpt, image, tags } = frontmatter;

  return (
    <div className="mb-8">
      {/* Featured Image */}
      <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Title */}
      <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        {title}
      </h1>

      {/* Excerpt */}
      <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
        {excerpt}
      </p>

      {/* Meta Information */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <time dateTime={date}>{formatDate(date, locale)}</time>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {readingTime} {locale === 'pt' ? 'min de leitura' : 'min read'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Rui Lopes</span>
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <hr className="mt-6 border-gray-200 dark:border-gray-700" />
    </div>
  );
}
