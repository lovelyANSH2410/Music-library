import { memo } from 'react'
import { useInView } from '../../hooks/useInView'

interface TextLine {
  text: string
  italic?: boolean
}

interface TextRevealProps {
  lines: (string | TextLine)[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  threshold?: number
}

export const TextReveal = memo(function TextReveal({
  lines,
  as: Component = 'h2',
  className = '',
  delay = 0,
  threshold = 0.2,
}: TextRevealProps) {
  const [ref, inView] = useInView<HTMLHeadingElement>({ threshold, once: true })

  // Compile full accessible string
  const fullText = lines
    .map(line => (typeof line === 'string' ? line : line.text))
    .join(' ')

  return (
    <Component
      ref={ref}
      className={`text-reveal-container ${inView ? 'is-revealed' : ''} ${className}`}
      aria-label={fullText}
    >
      {lines.map((item, idx) => {
        const text = typeof item === 'string' ? item : item.text
        const italic = typeof item === 'object' && item.italic
        const lineDelay = delay + idx * 110

        return (
          <span
            key={`${text}-${idx}`}
            className="text-reveal-line-wrap"
            aria-hidden="true"
          >
            <span
              className={`text-reveal-line-inner ${italic ? 'italic-line' : ''}`}
              style={{ '--line-delay': `${lineDelay}ms` } as React.CSSProperties}
            >
              {italic ? <em>{text}</em> : text}
            </span>
          </span>
        )
      })}
    </Component>
  )
})
