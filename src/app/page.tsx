import { Container } from '@/components/ui/Container'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function Home() {
  return (
    <main className="min-h-screen py-16">
      <Container size="lg">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Rui Lopes
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            Sports Journalist & Content Creator
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Badge variant="success">Phase 1 Complete</Badge>
            <Badge variant="success">Phase 2 Complete</Badge>
            <Badge variant="info">Design System Ready</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card variant="elevated" hoverable>
            <CardHeader>
              <h3 className="font-heading text-xl font-bold">
                Implementation Progress
              </h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>Next.js 14 + TypeScript setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>Tailwind CSS configured</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>Design System with CSS Variables</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>Light/Dark theme toggle</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>Google Fonts (Inter + Merriweather)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✓</span>
                  <span>UI Components (Button, Card, Badge, Container)</span>
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <h3 className="font-heading text-xl font-bold">
                Component Showcase
              </h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-secondary mb-2">Buttons:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" size="sm">Primary</Button>
                    <Button variant="secondary" size="sm">Secondary</Button>
                    <Button variant="ghost" size="sm">Ghost</Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-2">Badges:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="category">Category</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
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
                Next Steps
              </h2>
              <p className="text-text-secondary mb-6">
                Phase 3: Routing & i18n (Bilingual support with next-intl)
              </p>
              <Button variant="primary">
                Continue to Phase 3
              </Button>
            </div>
          </CardBody>
        </Card>

        <div className="mt-12 text-center text-sm text-text-tertiary">
          <p>Try the theme toggle in the top-right corner! The preference will persist across page reloads.</p>
        </div>
      </Container>
    </main>
  )
}
