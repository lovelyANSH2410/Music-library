import { useState, useEffect, useRef, type RefObject } from 'react'

interface UseInViewOptions {
  threshold?: number | number[]
  rootMargin?: string
  once?: boolean
}

function getInitialInView(): boolean {
  if (typeof window === 'undefined') return false
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return prefersReducedMotion || !('IntersectionObserver' in window)
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(getInitialInView)

  useEffect(() => {
    // If reduced motion is preferred or IntersectionObserver is not available, already true
    if (typeof window === 'undefined') return
    if (getInitialInView()) return

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, once])

  return [ref, isInView]
}
