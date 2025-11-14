import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rui Lopes - Sports Journalist',
  description: 'Personal website and blog of Rui Lopes, aspiring sports journalist',
  icons: {
    icon: '/website-v1/images/avatar.svg',
    apple: '/website-v1/images/avatar.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Pass-through layout: the [locale] layout will provide html/body tags
  // This prevents hydration mismatch from nested <html> tags
  return children
}
