import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

// Force static export for GitHub Pages
export const dynamic = 'force-static';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: `${t('title')} | Rui Lopes`,
    description: t('description'),
    openGraph: {
      title: `${t('title')} | Rui Lopes`,
      description: t('description'),
      type: 'website',
      locale: locale === 'pt' ? 'pt_PT' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | Rui Lopes`,
      description: t('description'),
    },
  };
}

function ContactPageContent() {
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
            ✉️ {t('contact.title')}
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-2">{t('contact.subtitle')}</p>
          <p className="text-[var(--text-tertiary)]">{t('contact.description')}</p>
        </div>

        {/* Email Section */}
        <div className="mb-12">
          <Card>
            <div className="text-center">
              <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-4">
                {t('contact.email')}
              </h2>
              <a
                href="mailto:rui@ruilopes.com"
                className="inline-flex items-center gap-2"
              >
                <Button size="lg" variant="primary">
                  <span className="text-xl">📧</span>
                  {t('contact.emailLabel')}
                </Button>
              </a>
              <p className="mt-4 text-sm text-[var(--text-tertiary)]">rui@ruilopes.com</p>
            </div>
          </Card>
        </div>

        {/* Social Media Section */}
        <div className="mb-12">
          <Card>
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6 text-center">
              {t('contact.followMe')}
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

        {/* Future Form Placeholder */}
        <div className="text-center">
          <Card className="bg-[var(--bg-secondary)] border-dashed">
            <div className="py-8">
              <span className="text-4xl mb-4 block">📝</span>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                Contact Form Coming Soon
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t('contact.description')}
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  return <ContactPageContent />;
}

// Generate static params for both locales
export async function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }];
}
