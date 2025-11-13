'use client'

import { Linkedin, Twitter, FileText, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface SocialLinksProps {
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
}

export default function SocialLinks({
  orientation = 'horizontal',
  size = 'md'
}: SocialLinksProps) {
  const t = useTranslations('social')

  const links = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/rui-lopes', // TODO: Update with actual URL
      label: t('linkedin')
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/ruilopes', // TODO: Update with actual URL
      label: t('twitter')
    },
    {
      name: 'CV',
      icon: FileText,
      href: '/cv-rui-lopes.pdf', // TODO: Add CV to public folder
      label: t('cv'),
      download: true
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:rui.lopes@example.com', // TODO: Update with actual email
      label: t('email')
    }
  ]

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const gapClasses = {
    horizontal: orientation === 'horizontal' ? 'gap-3' : '',
    vertical: orientation === 'vertical' ? 'gap-2' : ''
  }

  return (
    <div
      className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} ${gapClasses[orientation]} items-center`}
      role="list"
      aria-label={t('socialLinks')}
    >
      {links.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.name}
            href={link.href}
            target={link.download ? undefined : '_blank'}
            rel={link.download ? undefined : 'noopener noreferrer'}
            download={link.download}
            className={`
              ${sizeClasses[size]}
              flex items-center justify-center
              rounded-full
              border-2 border-[var(--border-color)]
              bg-[var(--card-bg)]
              text-[var(--text-secondary)]
              transition-all duration-300
              hover:border-[var(--accent-color)]
              hover:text-[var(--accent-color)]
              hover:scale-110
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--accent-color)]
              focus:ring-offset-2
              focus:ring-offset-[var(--bg-color)]
            `}
            aria-label={link.label}
            title={link.label}
          >
            <Icon className={iconSizeClasses[size]} />
          </a>
        )
      })}
    </div>
  )
}
