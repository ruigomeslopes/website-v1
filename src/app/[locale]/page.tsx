import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

// Force static export for GitHub Pages
export const dynamic = 'force-static'

export default function Home() {
  const t = useTranslations()

  return (
    <main className="min-h-screen py-16">
      <Container size="lg">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {t('homepage.title')}
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            {t('homepage.subtitle')}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Badge variant="success">{t('homepage.phase1Complete')}</Badge>
            <Badge variant="success">{t('homepage.phase2Complete')}</Badge>
            <Badge variant="success">{t('homepage.phase3Complete')}</Badge>
            <Badge variant="info">{t('homepage.designSystemReady')}</Badge>
            <Badge variant="info">{t('homepage.i18nReady')}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card variant="elevated" hoverable>
            <CardHeader>
              <h3 className="font-heading text-xl font-bold">
                {t('homepage.implementationProgress')}
              </h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{t('setup.nextjsSetup')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{t('setup.tailwindConfigured')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{t('setup.designSystem')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{t('setup.themeToggle')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{t('setup.googleFonts')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{t('setup.uiComponents')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{t('setup.i18nSupport')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{t('setup.languageToggle')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>{t('setup.routingStructure')}</span>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <h3 className="font-heading text-xl font-bold">
                {t('homepage.componentShowcase')}
              </h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-secondary mb-2">
                    {t('homepage.buttons')}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" size="sm">
                      {t('homepage.primary')}
                    </Button>
                    <Button variant="secondary" size="sm">
                      {t('homepage.secondary')}
                    </Button>
                    <Button variant="ghost" size="sm">
                      {t('homepage.ghost')}
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-2">
                    {t('homepage.badges')}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">{t('homepage.default')}</Badge>
                    <Badge variant="category">{t('homepage.category')}</Badge>
                    <Badge variant="warning">{t('homepage.warning')}</Badge>
                    <Badge variant="error">{t('homepage.error')}</Badge>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card variant="default">
          <CardBody>
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold mb-4">
                {t('homepage.nextSteps')}
              </h2>
              <p className="text-text-secondary mb-6">
                Phase 4: Homepage (One-screen design with category grid)
              </p>
              <Button variant="primary">
                {t('homepage.continueToPhase', { phase: '4' })}
              </Button>
            </div>
          </CardBody>
        </Card>

        <div className="mt-12 text-center text-sm text-text-tertiary">
          <p>{t('homepage.themeToggleNote')}</p>
        </div>
      </Container>
    </main>
  )
}
