import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rui Lopes - Sports Journalist',
  description: 'Personal website and blog of Rui Lopes, aspiring sports journalist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Pass-through layout: the [locale] layout will provide html/body tags
  return children
}
