'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const t = useTranslations('article');
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: '#1DA1F2',
    },
    {
      name: 'Facebook',
      icon: '👤',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: '#1877F2',
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: '#0A66C2',
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      color: '#25D366',
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Silently fail - user will see the link wasn't copied
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        // User cancelled sharing - no action needed
      }
    }
  };

  return (
    <div className="border-t border-border-primary pt-8 mt-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          {t('shareArticle')}
        </h3>

        {/* Share Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors border border-border-primary hover:border-border-secondary"
              title={t('shareOn', { platform: link.name })}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-sm font-medium text-text-primary hidden sm:inline">
                {link.name}
              </span>
            </a>
          ))}

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary hover:bg-bg-tertiary transition-colors border border-border-primary hover:border-border-secondary"
            title={t('copyLink')}
          >
            <span className="text-xl">{copied ? '✅' : '🔗'}</span>
            <span className="text-sm font-medium text-text-primary hidden sm:inline">
              {copied ? t('linkCopied') : t('copyLink')}
            </span>
          </button>

          {/* Native Share Button (Mobile) */}
          {typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary hover:bg-accent-hover text-white transition-colors border border-transparent sm:hidden"
              title={t('share')}
            >
              <span className="text-xl">📤</span>
              <span className="text-sm font-medium">{t('share')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
