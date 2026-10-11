import { memo } from 'react'
import type { Release } from '../data/releases'

interface CoverArtProps {
  release: Release
  priority?: boolean
  className?: string
  aspectRatio?: 'square' | 'wide'
}

export const CoverArt = memo(function CoverArt({
  release,
  priority = false,
  className = '',
  aspectRatio = 'square',
}: CoverArtProps) {
  const aspectClass = aspectRatio === 'wide' ? 'cover-wide' : 'cover-square'

  if (release.cover === 'image') {
    return (
      <div className={`cover-wrapper ${aspectClass} ${className}`}>
        <img
          className="cover cover-image"
          src="/art/peripheral-vision.png"
          alt={`Artwork for ${release.title}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
        <div className="cover-glass-rim" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div
      className={`cover-wrapper ${aspectClass} cover-${release.cover} ${className}`}
      role="img"
      aria-label={`Procedural artwork for ${release.title}`}
    >
      <div className="cover-inner-geometry">
        <span className="geom-orb" />
        <span className="geom-line" />
        <span className="geom-grid" />
        <span className="geom-ring" />
      </div>
      <div className="cover-glass-rim" aria-hidden="true" />
    </div>
  )
})
