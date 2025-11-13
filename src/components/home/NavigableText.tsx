'use client';

import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { getCategoryEmoji } from '@/utils/categoryEmoji';

interface NavigableTextProps {
  text: string;
  className?: string;
  showEmojis?: boolean;
}

const categoryMap: { [key: string]: string } = {
  'futebol': 'football',
  'football': 'football',
  'motogp': 'motogp',
  'gaming': 'gaming',
  'livros': 'books',
  'books': 'books',
  'filmes': 'movies',
  'movies': 'movies',
  'séries': 'tvshows',
  'tv shows': 'tvshows',
  'viagens': 'travel',
  'travels': 'travel',
  'travel': 'travel'
};

export function NavigableText({ text, className = '', showEmojis = false }: NavigableTextProps) {
  const params = useParams();
  const locale = params.locale as string;

  // Parse text and identify words between **
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <p className={className}>
      {parts.map((part, index) => {
        // Check if this part is marked with **
        if (part.startsWith('**') && part.endsWith('**')) {
          const word = part.slice(2, -2); // Remove **
          const normalizedWord = word.toLowerCase();
          const categoryKey = categoryMap[normalizedWord];

          if (categoryKey) {
            const emoji = getCategoryEmoji(categoryKey);

            return (
              <Link
                key={index}
                href={`/${categoryKey}`}
                className="group inline-flex items-center gap-1.5 relative
                  text-accent-primary font-medium

                  /* Elegant gradient underline */
                  bg-gradient-to-r from-accent-primary/40 via-accent-secondary/60 to-accent-primary/40
                  bg-[length:100%_1.5px] bg-no-repeat bg-[position:0_100%]

                  /* Interactive hover effects */
                  hover:bg-[length:100%_2px]
                  hover:text-accent-hover
                  hover:-translate-y-[2px]

                  /* Smooth transitions */
                  transition-all duration-300 ease-out

                  /* Focus accessibility */
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
                  rounded-sm
                "
              >
                {showEmojis && emoji && (
                  <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {emoji}
                  </span>
                )}
                <span className="relative">{word}</span>
              </Link>
            );
          }
        }

        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}
