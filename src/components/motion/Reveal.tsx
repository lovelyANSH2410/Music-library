import { type ReactNode, memo } from 'react'
import { useInView } from '../../hooks/useInView'

export type RevealVariant = 'up' | 'fade' | 'scale' | 'mask' | 'left' | 'right'

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number // in ms
  threshold?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'span' | 'li'
}

export const Reveal = memo(function Reveal({
  children,
  variant = 'up',
  delay = 0,
  threshold = 0.12,
  className = '',
  as: Component = 'div',
}: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold, once: true })

  const delayStyle = delay > 0 ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      style={delayStyle}
      className={`motion-reveal reveal-${variant} ${inView ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </Component>
  )
})
