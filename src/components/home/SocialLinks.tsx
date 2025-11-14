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
      href: 'https://linkedin.com/in/rui-lopes-journalist',
      label: t('linkedin')
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/ruilopes_sports',
      label: t('twitter')
    },
    {
      name: 'CV',
      icon: FileText,
      href: '/cv-rui-lopes.pdf',
      label: t('cv'),
      download: true
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:rui.lopes@sports-journalist.com',
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
              border-2 border-border-primary
              bg-bg-secondary
              text-text-secondary
              transition-all duration-300
              hover:border-accent-primary
              hover:text-accent-primary
              hover:scale-110
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-accent-primary
              focus:ring-offset-2
              focus:ring-offset-bg-primary
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
