import Hero from '@/components/home/Hero'
import CategoryGrid from '@/components/home/CategoryGrid'

// Force static export for GitHub Pages
export const dynamic = 'force-static'

export default function Home() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-4rem)]">
      <Hero />
      <CategoryGrid />
    </main>
  )
}
