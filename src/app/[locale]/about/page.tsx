import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: `${t('title')} | Rui Lopes`,
    description: t('bio'),
    openGraph: {
      title: `${t('title')} | Rui Lopes`,
      description: t('bio'),
      type: 'profile',
      locale: locale === 'pt' ? 'pt_PT' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | Rui Lopes`,
      description: t('bio'),
    },
  };
}

function AboutPageContent({ locale }: { locale: string }) {
  const t = useTranslations();

  const socialLinks = [
    {
      name: t('social.linkedin'),
      url: 'https://www.linkedin.com/in/ruilopes',
      icon: '💼',
    },
    {
      name: t('social.twitter'),
      url: 'https://twitter.com/ruilopes',
      icon: '🐦',
    },
    {
      name: t('social.instagram'),
      url: 'https://instagram.com/ruilopes',
      icon: '📷',
    },
    {
      name: t('social.facebook'),
      url: 'https://facebook.com/ruilopes',
      icon: '👤',
    },
  ];

  return (
    <main className="min-h-screen py-16">
      <Container size="md">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="primary" size="lg" className="mb-4">
            👤 {t('about.title')}
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">{t('about.subtitle')}</p>
        </div>

        {/* Avatar and Bio */}
        <div className="mb-12">
          <Card>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 rounded-full overflow-hidden bg-[var(--bg-tertiary)] border-4 border-[var(--border-default)]">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Rui Lopes"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Bio Text */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Rui Lopes
                </h2>
                <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {t('about.bio')}
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {t('about.bioExtended')}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <Card>
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6">
              {t('about.skills')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✍️</span>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {t('about.skillsList.writing')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚽</span>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {t('about.skillsList.analysis')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {t('about.skillsList.research')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {t('about.skillsList.bilingual')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Social Links */}
        <div className="mb-12">
          <Card>
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6 text-center">
              {t('footer.followMe')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors border border-[var(--border-default)] hover:border-[var(--border-hover)]"
                >
                  <span className="text-3xl">{link.icon}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link href="/latest">
            <Button size="lg" variant="primary">
              {t('about.ctaButton')}
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  return <AboutPageContent locale={locale} />;
}

// Generate static params for both locales
export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
