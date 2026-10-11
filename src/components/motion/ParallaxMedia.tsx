import { useEffect, useRef, type ReactNode, memo } from 'react'

interface ParallaxMediaProps {
  children: ReactNode
  speed?: number // -0.2 to 0.2
  className?: string
}

export const ParallaxMedia = memo(function ParallaxMedia({
  children,
  speed = 0.12,
  className = '',
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth <= 768

    if (prefersReducedMotion || isMobile) {
      return
    }

    let rafId: number | null = null

    const handleScroll = () => {
      if (!containerRef.current || !targetRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Only calculate if visible in viewport buffer
      if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
        // Distance from center of viewport
        const centerOffset = rect.top + rect.height / 2 - windowHeight / 2
        const translateY = centerOffset * speed
        targetRef.current.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`
      }
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          handleScroll()
          rafId = null
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [speed])

  return (
    <div ref={containerRef} className={`parallax-media-container ${className}`}>
      <div ref={targetRef} className="parallax-media-inner">
        {children}
      </div>
    </div>
  )
})
