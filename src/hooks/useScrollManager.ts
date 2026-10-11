import { useEffect, useState } from 'react'

type ScrollSubscriber = (progress: number, scrollY: number) => void

const subscribers = new Set<ScrollSubscriber>()
let isListening = false
let rafId: number | null = null
let latestProgress = 0
let latestScrollY = 0

function updateScrollMetrics() {
  if (typeof window === 'undefined') return

  const scrollY = window.scrollY || window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0

  latestProgress = progress
  latestScrollY = scrollY

  // Set CSS Custom Properties for hardware accelerated CSS animations
  document.documentElement.style.setProperty('--page-scroll-progress', `${progress}`)
  document.documentElement.style.setProperty('--page-scroll-y', `${scrollY}px`)

  // Notify registered component subscribers
  subscribers.forEach(sub => sub(progress, scrollY))

  rafId = null
}

function handleScroll() {
  if (rafId === null) {
    rafId = requestAnimationFrame(updateScrollMetrics)
  }
}

function initScrollListener() {
  if (isListening || typeof window === 'undefined') return
  isListening = true
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
  updateScrollMetrics()
}

export function subscribeToScroll(subscriber: ScrollSubscriber) {
  subscribers.add(subscriber)
  initScrollListener()
  subscriber(latestProgress, latestScrollY)

  return () => {
    subscribers.delete(subscriber)
    if (subscribers.size === 0 && isListening && typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      isListening = false
    }
  }
}

/**
 * Hook to retrieve scroll progress (0 to 1) throttled at requestAnimationFrame
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(latestProgress)

  useEffect(() => {
    return subscribeToScroll((p) => {
      setProgress(p)
    })
  }, [])

  return progress
}
