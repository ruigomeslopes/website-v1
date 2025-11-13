'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface NavigableTextProps {
  text: string;
  className?: string;
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

export function NavigableText({ text, className = '' }: NavigableTextProps) {
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
            return (
              <Link
                key={index}
                href={`/${locale}/${categoryKey}`}
                className="text-accent-primary hover:text-accent-secondary transition-colors duration-200 font-medium underline decoration-accent-primary/30 hover:decoration-accent-secondary underline-offset-4"
              >
                {word}
              </Link>
            );
          }
        }

        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}
