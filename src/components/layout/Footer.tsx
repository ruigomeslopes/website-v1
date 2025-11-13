'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Linkedin, Twitter, Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Facebook', href: '#', icon: Facebook }
  ];

  return (
    <footer className="mt-auto py-8 border-t border-border-primary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Name + Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-sm font-medium text-text-primary">
              Rui Lopes
            </p>
            <p className="text-xs text-text-tertiary">
              © 2025 {t('footer.copyright').replace('© 2025 Rui Lopes. ', '')}
            </p>
          </div>

          {/* Center: Made with Love */}
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>{locale === 'pt' ? 'Feito com' : 'Made with'}</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>em Lisboa</span>
          </div>

          {/* Right: Social Links + Email */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-secondary text-text-secondary hover:bg-accent-primary hover:text-white transition-all duration-200"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </a>
              );
            })}

            {/* Email Icon */}
            <a
              href="mailto:rui@example.com"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-accent-primary text-white hover:bg-accent-secondary transition-all duration-200"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
