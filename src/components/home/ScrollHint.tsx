'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ScrollHintProps {
  position?: 'left' | 'right' | 'center';
  onClick?: () => void;
}

export function ScrollHint({ position = 'center', onClick }: ScrollHintProps) {
  const t = useTranslations();

  const positionClasses = {
    left: 'left-8',
    right: 'right-8',
    center: 'left-1/2 -translate-x-1/2'
  };

  const handleClick = onClick || (() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });

  return (
    <button
      onClick={handleClick}
      className={`absolute bottom-8 ${positionClasses[position]} flex flex-col items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors duration-700 ease-in-out cursor-pointer group`}
      aria-label={t('homepage.scrollHint')}
    >
      <ChevronDown
        className="w-6 h-6 animate-bounce"
        strokeWidth={2.5}
      />
    </button>
  );
}
