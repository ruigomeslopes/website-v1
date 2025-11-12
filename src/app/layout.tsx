import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeToggle } from '@/components/ThemeToggle'
import './globals.css'

// Google Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rui Lopes - Sports Journalist',
  description: 'Personal website and blog of Rui Lopes, aspiring sports journalist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={inter.variable}>
      <body>
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  )
}
