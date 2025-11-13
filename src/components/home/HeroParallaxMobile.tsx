'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { NavigableText } from './NavigableText'

export default function HeroParallaxMobile() {
  const t = useTranslations('home')
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const containerTop = containerRef.current.offsetTop
      const containerHeight = containerRef.current.offsetHeight
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Calculate progress through this section (0 to 1)
      const sectionStart = containerTop - windowHeight
      const sectionEnd = containerTop + containerHeight
      const progress = (scrollY - sectionStart) / (sectionEnd - sectionStart)

      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate opacity for fade out effect
  const photoOpacity = 1 - scrollProgress * 0.5 // Fades from 1 to 0.5

  // Phrases for navigable text (same as HeroMobile)
  const phrases = [
    {
      text: t('hero.phrase1',
        { defaultValue: 'Apaixonado por **futebol**, **MotoGP** e análise desportiva' }
      ),
      delay: 0
    },
    {
      text: t('hero.phrase2',
        { defaultValue: 'Contador de histórias através de **gaming** e **livros**' }
      ),
      delay: 100
    },
    {
      text: t('hero.phrase3',
        { defaultValue: 'Explorador de mundos reais e ficcionais - **viagens**, **filmes** e **séries**' }
      ),
      delay: 200
    }
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] w-full overflow-hidden"
      aria-label="Hero with parallax effect"
    >
      {/* Fixed Photo Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          top: '100vh', // Starts after cover section
          height: '100vh',
          opacity: photoOpacity,
        }}
      >
        {/* Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/rui-lopes-photo.jpg)', // TODO: Add actual photo
          }}
        />

        {/* Dark overlay for text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
        />
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10 min-h-[150vh] flex items-center">
        <div className="container mx-auto px-6 py-20 mt-[100vh]">
          {/* Navigable Phrases */}
          <div className="space-y-8 max-w-2xl">
            {phrases.map((phrase, index) => (
              <div
                key={index}
                className="animate-fade-in opacity-0"
                style={{
                  animationDelay: `${phrase.delay}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <NavigableText
                  text={phrase.text}
                  className="text-2xl sm:text-3xl font-bold text-white leading-relaxed drop-shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
