import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Play,
  ArrowRight,
  ExternalLink,
  Layers,
  Radio,
  Sliders,
  Disc,
} from 'lucide-react'
import { releases } from '../data/releases'
import { CoverArt } from './CoverArt'
import { usePlayer } from '../context/usePlayer'
import { Reveal } from './motion/Reveal'

export function FeaturedScrollStory() {
  const featured = releases[0] // Peripheral Vision
  const { selectTrack } = usePlayer()
  const [activeChapter, setActiveChapter] = useState(0)
  const chaptersRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateActiveChapter = () => {
      let closestIdx = 0
      let minDistance = Infinity
      const screenTarget = window.innerHeight * 0.45

      chaptersRef.current.forEach((el, index) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elCenter = rect.top + rect.height * 0.4
        const dist = Math.abs(screenTarget - elCenter)
        if (dist < minDistance) {
          minDistance = dist
          closestIdx = index
        }
      })

      setActiveChapter(closestIdx)
    }

    // Run once on mount
    updateActiveChapter()

    // IntersectionObserver for element entry/exit
    const observer = new IntersectionObserver(
      () => {
        updateActiveChapter()
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
        rootMargin: '-5% 0px -10% 0px',
      }
    )

    chaptersRef.current.forEach(el => {
      if (el) observer.observe(el)
    })

    // RAF scroll listener for fluid tracking during fast or slow scrolls
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveChapter()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollToChapter = (idx: number) => {
    setActiveChapter(idx)
    const el = chaptersRef.current[idx]
    if (!el) return
    const isReduced = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({
      behavior: isReduced ? 'auto' : 'smooth',
      block: 'center',
    })
  }

  return (
    <section className="featured-story-section" id="featured" aria-label="Featured release spotlight">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-row">
          <Reveal variant="fade">
            <div className="section-eyebrow">
              <Radio size={14} className="signal-icon" />
              <span>01 / CURRENT FEATURED TRANSMISSION</span>
            </div>
          </Reveal>
          <Reveal variant="fade" delay={80}>
            <Link to="/music" className="section-view-all-link">
              <span>View full catalog ({releases.length})</span>
              <span className="arrow-accent">↘</span>
            </Link>
          </Reveal>
        </div>

        {/* Storytelling Canvas */}
        <div className="featured-story-canvas">
          {/* Pinned Sticky Artwork Column */}
          <div className="story-sticky-artwork-col">
            <div className="story-sticky-frame glass-panel">
              <div className="story-art-wrapper">
                <CoverArt release={featured} priority className="story-cover-image" />
                <div className={`story-art-bloom bloom-phase-${activeChapter}`} aria-hidden="true" />
              </div>

              {/* Progress Milestones Badge */}
              <div className="story-milestone-pills" role="tablist" aria-label="Story chapter navigation">
                <button
                  role="tab"
                  aria-selected={activeChapter === 0}
                  className={`milestone-step-btn ${activeChapter === 0 ? 'is-active' : ''}`}
                  onClick={() => scrollToChapter(0)}
                >
                  <span className="step-dot" />
                  <span>01 CONCEPT</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeChapter === 1}
                  className={`milestone-step-btn ${activeChapter === 1 ? 'is-active' : ''}`}
                  onClick={() => scrollToChapter(1)}
                >
                  <span className="step-dot" />
                  <span>02 ARCHITECTURE</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeChapter === 2}
                  className={`milestone-step-btn ${activeChapter === 2 ? 'is-active' : ''}`}
                  onClick={() => scrollToChapter(2)}
                >
                  <span className="step-dot" />
                  <span>03 TRACK SEQUENCE</span>
                </button>
              </div>

              {/* Floating Quick Action */}
              <div className="story-quick-action-bar">
                <button
                  className="button primary-sm story-quick-queue-btn"
                  onClick={() => selectTrack(featured, 0)}
                  aria-label={`Queue ${featured.title} in player`}
                >
                  <Play size={13} fill="currentColor" />
                  <span>Queue in Player</span>
                </button>
                <Link to={`/music/${featured.slug}`} className="story-quick-details-link">
                  <span>Full Liner Notes</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Scrolling Story Chapters Column */}
          <div className="story-scroll-content-col">
            {/* CHAPTER 1 */}
            <div
              ref={el => { chaptersRef.current[0] = el }}
              className={`story-chapter glass-panel ${activeChapter === 0 ? 'chapter-in-focus' : ''}`}
            >
              <div className="chapter-eyebrow">
                <span className="chapter-num">CHAPTER 01</span>
                <span className="chapter-sep">/</span>
                <span className="chapter-cat">CAT. {featured.catalogId}</span>
              </div>

              <h2 className="chapter-heading">
                Peripheral<br />
                <em>Vision</em>
              </h2>

              <p className="chapter-lead">{featured.description}</p>
              <p className="chapter-body">
                Composed across four months in the nocturnal silence of industrial Los Angeles.
                Built around field recordings of electromagnetic room interference, re-amped tape hiss,
                and analog synthesizers calibrated to microtonal drift.
              </p>

              <div className="chapter-tags-row">
                <span className="chapter-tag-item">LP / 12″ VINYL</span>
                <span className="chapter-tag-item">LOSSLESS 24-BIT</span>
                <span className="chapter-tag-item">NOCTURNAL</span>
              </div>
            </div>

            {/* CHAPTER 2 */}
            <div
              ref={el => { chaptersRef.current[1] = el }}
              className={`story-chapter glass-panel ${activeChapter === 1 ? 'chapter-in-focus' : ''}`}
            >
              <div className="chapter-eyebrow">
                <span className="chapter-num">CHAPTER 02</span>
                <span className="chapter-sep">/</span>
                <span className="chapter-cat">SONIC ARCHITECTURE</span>
              </div>

              <h3 className="chapter-heading-secondary">
                Voltage, Tape Loops<br />
                <em>& Low Frequencies</em>
              </h3>

              <div className="specs-grid-box">
                <div className="spec-card-mini">
                  <Sliders size={16} className="spec-icon" />
                  <span className="spec-label">RUNTIME</span>
                  <strong className="spec-value">{featured.duration}</strong>
                </div>
                <div className="spec-card-mini">
                  <Layers size={16} className="spec-icon" />
                  <span className="spec-label">SONIC MOOD</span>
                  <strong className="spec-value">{featured.mood}</strong>
                </div>
                <div className="spec-card-mini">
                  <Disc size={16} className="spec-icon" />
                  <span className="spec-label">PHYSICAL</span>
                  <strong className="spec-value">180g Heavyweight</strong>
                </div>
              </div>

              <p className="chapter-body">
                Mastered at Telegraph Mastering for high dynamic range playback.
                Optimized for low-volume late-night listening and deep spatial headphone immersion.
              </p>
            </div>

            {/* CHAPTER 3 */}
            <div
              ref={el => { chaptersRef.current[2] = el }}
              className={`story-chapter glass-panel ${activeChapter === 2 ? 'chapter-in-focus' : ''}`}
            >
              <div className="chapter-eyebrow">
                <span className="chapter-num">CHAPTER 03</span>
                <span className="chapter-sep">/</span>
                <span className="chapter-cat">THE COMPLETE SEQUENCE</span>
              </div>

              <h3 className="chapter-heading-secondary">
                5 Compositions<br />
                <em>in Order of Descent</em>
              </h3>

              <div className="story-tracks-container">
                {featured.tracks.map((track, idx) => (
                  <div key={track.title} className="story-track-row">
                    <span className="story-track-num">{track.number}</span>
                    <span className="story-track-title">{track.title}</span>
                    <span className="story-track-time">{track.duration}</span>
                    <button
                      className="story-track-play-btn glass-control"
                      onClick={() => selectTrack(featured, idx)}
                      title={`Select ${track.title} in player`}
                      aria-label={`Queue ${track.title} in player`}
                    >
                      <Play size={11} fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Streaming Destinations */}
              <div className="story-destinations-row">
                <span className="dest-title">STREAMING & EDITIONS:</span>
                <div className="dest-chips-list">
                  {featured.platforms.map(p => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="dest-chip glass-control"
                    >
                      <span>{p.name}</span>
                      <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
