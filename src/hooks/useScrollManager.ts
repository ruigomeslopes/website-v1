'use client'

import { useState, useEffect, useCallback } from 'react'

export type Section = 'cover' | 'hero' | 'timeline'

interface ScrollState {
  currentSection: Section
  scrollProgress: number
  showTopDock: boolean
  showMobileDock: boolean
}

interface UseScrollManagerOptions {
  coverThreshold?: number // pixels to consider cover scrolled past
  heroThreshold?: number // pixels to consider hero scrolled past
}

export function useScrollManager(options: UseScrollManagerOptions = {}): ScrollState {
  const { coverThreshold = 50, heroThreshold = 1000 } = options

  const [scrollState, setScrollState] = useState<ScrollState>({
    currentSection: 'cover',
    scrollProgress: 0,
    showTopDock: false,
    showMobileDock: false
  })

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // Calculate scroll progress (0-100)
    const maxScroll = documentHeight - viewportHeight
    const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0

    // Determine current section based on scroll position
    let currentSection: Section = 'cover'
    let showTopDock = false
    let showMobileDock = false

    if (scrollY < coverThreshold) {
      // Still in cover section
      currentSection = 'cover'
      showTopDock = false
      showMobileDock = false
    } else if (scrollY < heroThreshold) {
      // In hero section
      currentSection = 'hero'
      showTopDock = true
      showMobileDock = true
    } else {
      // In timeline section
      currentSection = 'timeline'
      showTopDock = true
      showMobileDock = true
    }

    setScrollState({
      currentSection,
      scrollProgress: Math.round(progress),
      showTopDock,
      showMobileDock
    })
  }, [coverThreshold, heroThreshold])

  useEffect(() => {
    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return scrollState
}
