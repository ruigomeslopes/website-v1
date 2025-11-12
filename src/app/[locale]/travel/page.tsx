import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/Container'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export default function TravelPage() {
  const t = useTranslations()

  return (
    <main className="min-h-screen py-16">
      <Container size="md">
        <div className="text-center mb-8">
          <Badge variant="category" className="mb-4">
            ✈️ {t('categories.travel')}
          </Badge>
          <h1 className="font-heading text-4xl font-bold mb-4">
            {t('categories.travel')}
          </h1>
        </div>

        <Card variant="outlined">
          <CardBody>
            <div className="text-center space-y-4">
              <p className="text-xl font-medium text-text-secondary">
                {t('categoryPages.comingSoon')}
              </p>
              <p className="text-text-tertiary">
                {t('categoryPages.placeholder')}
              </p>
              <Link href="/">
                <Button variant="primary">
                  {t('categoryPages.backToHome')}
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Container>
    </main>
  )
}
