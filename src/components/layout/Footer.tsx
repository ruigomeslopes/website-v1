'use client';

import { useTranslations } from 'next-intl';
import { Linkedin, Twitter, Instagram, Facebook, Mail } from 'lucide-react';

interface FooterProps {
  columnsCount?: number;
}

export default function Footer({ columnsCount = 25 }: FooterProps) {
  const t = useTranslations();

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Facebook', href: '#', icon: Facebook }
  ];

  return (
    <footer className="mt-auto py-4 sm:py-6 border-t border-border-primary/30 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* 3×1 Grid: 3 sections with internal flex columns */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">

          {/* Section 1: Name + Subtitle (2 lines) */}
          <div className="flex flex-col gap-0.5 sm:gap-1 text-left">
            <p className="text-sm sm:text-base font-bold text-text-primary">
              Rui Lopes
            </p>
            <p className="text-xs sm:text-sm text-text-secondary">
              {t('footer.subtitle')}
            </p>
          </div>

          {/* Section 2: Motto + Columns Count (2 lines) */}
          <div className="flex flex-col gap-0.5 sm:gap-1 text-center">
            <p className="text-xs sm:text-sm font-medium text-text-primary italic leading-snug">
              {t('footer.motto')}
            </p>
            <p className="text-xs text-text-tertiary">
              {t('footer.columnsCount', { count: columnsCount })}
            </p>
          </div>

          {/* Section 3: Social Icons (vertically centered) */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-bg-secondary text-text-secondary hover:bg-accent-primary hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
                </a>
              );
            })}

            {/* Email Icon */}
            <a
              href="mailto:rui@example.com"
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-accent-primary text-white hover:bg-accent-secondary transition-all duration-200 hover:scale-110"
              aria-label="Send email"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
