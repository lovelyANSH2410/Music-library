import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Share2,
  Check,
  Disc3,
  ExternalLink,
  Layers,
} from 'lucide-react'
import { releases } from '../data/releases'
import { CoverArt } from '../components/CoverArt'
import { usePlayer } from '../context/usePlayer'

export function ReleaseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { selectTrack, currentRelease, currentTrackIndex } = usePlayer()
  const [copied, setCopied] = useState(false)

  const release = releases.find(r => r.slug === slug)

  if (!release) {
    return <Navigate to="/music" replace />
  }

  // Find next release for seamless navigation
  const currentIndex = releases.findIndex(r => r.slug === slug)
  const nextRelease = releases[(currentIndex + 1) % releases.length]
  const prevRelease = releases[(currentIndex - 1 + releases.length) % releases.length]

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      }
    } catch {
      // Fallback
    }
  }

  return (
    <main className="release-detail-page">
      <div className="section-container">
        {/* Navigation Breadcrumb Bar */}
        <div className="release-breadcrumb-bar">
          <Link to="/music" className="back-to-catalog-link">
            <ArrowLeft size={15} />
            <span>Back to Discography</span>
          </Link>

          <div className="share-action-group">
            <button
              className="share-btn glass-control"
              onClick={handleShare}
              aria-label="Share release link"
            >
              {copied ? <Check size={14} className="copied-icon" /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied' : 'Share Release'}</span>
            </button>
          </div>
        </div>

        {/* Hero Release Presentation */}
        <section className="release-spotlight-hero">
          <div className="release-artwork-hero-box">
            <CoverArt release={release} priority className="detail-hero-cover" />
            <div className="spotlight-flare" aria-hidden="true" />
          </div>

          <div className="release-hero-details">
            <div className="detail-eyebrow-row">
              <span className="detail-cat-badge">{release.catalogId}</span>
              <span className="detail-format-badge">{release.type} · {release.year}</span>
            </div>

            <h1 className="detail-release-heading">
              {release.title.split(' ').map((word, i) => (
                <span key={`${word}-${i}`} className={i === 1 ? 'italic-accent' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="detail-synopsis-text">{release.description}</p>

            <div className="detail-metadata-grid">
              <div className="meta-box">
                <span className="meta-key">SONIC MOOD</span>
                <strong className="meta-val">{release.mood}</strong>
              </div>
              <div className="meta-box">
                <span className="meta-key">DURATION</span>
                <strong className="meta-val">{release.duration}</strong>
              </div>
              <div className="meta-box">
                <span className="meta-key">TRACK COUNT</span>
                <strong className="meta-val">{release.tracks.length} compositions</strong>
              </div>
              <div className="meta-box">
                <span className="meta-key">RELEASE YEAR</span>
                <strong className="meta-val">{release.year}</strong>
              </div>
            </div>

            {/* Play All / Queue Bar */}
            <div className="detail-actions-strip">
              <button
                className="button primary play-all-btn"
                onClick={() => selectTrack(release, 0)}
              >
                <Play size={16} fill="currentColor" />
                <span>Select & Queue in Player</span>
              </button>
              <span className="demo-notice-tag">
                <Disc3 size={14} className="disc-icon" />
                <span>Master stems pending official label distribution</span>
              </span>
            </div>
          </div>
        </section>

        {/* Tracklist Section */}
        <section className="detail-tracklist-section glass-panel">
          <div className="tracklist-header-row">
            <div className="tracklist-heading-left">
              <Layers size={16} />
              <h2 className="tracklist-title">TRACK SPECIFICATIONS</h2>
            </div>
            <span className="tracklist-spec-note">FLAC / 24-BIT / 96KHZ ARCHIVE</span>
          </div>

          <div className="tracks-table">
            <div className="table-header-row">
              <span className="col-num">#</span>
              <span className="col-name">COMPOSITION</span>
              <span className="col-time">LENGTH</span>
              <span className="col-queue">SELECTION</span>
            </div>

            {release.tracks.map((track, idx) => {
              const isSelected =
                currentRelease.slug === release.slug && currentTrackIndex === idx

              return (
                <div
                  key={track.title}
                  className={`track-table-row ${isSelected ? 'is-selected-track' : ''}`}
                >
                  <span className="col-num track-num">{track.number}</span>
                  <div className="col-name track-title-cell">
                    <span className="track-title-text">{track.title}</span>
                    {isSelected && <span className="active-playing-badge">CURRENTLY SELECTED</span>}
                  </div>
                  <span className="col-time track-time-text">{track.duration}</span>
                  <div className="col-queue queue-cell">
                    <button
                      className="track-select-btn glass-control"
                      onClick={() => selectTrack(release, idx)}
                      aria-label={`Select ${track.title} in player`}
                      title="Select in player"
                    >
                      <Play size={12} fill="currentColor" />
                      <span>{isSelected ? 'Selected' : 'Queue'}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Liner Notes & Credits Grid */}
        <section className="detail-liner-notes-grid">
          <div className="liner-panel glass-panel">
            <span className="panel-eyebrow">ARCHIVE LINER NOTES</span>
            <h3 className="liner-heading">Recording Philosophy</h3>
            <p className="liner-body-text">{release.extendedNotes}</p>
            <div className="liner-quote-box">
              <p>“Every resonant frequency in this collection was recorded at analog gain staging thresholds, allowing subtle electromagnetic artifacts to remain untouched.”</p>
            </div>
          </div>

          <div className="credits-panel glass-panel">
            <span className="panel-eyebrow">PRODUCTION CREDITS</span>
            <h3 className="liner-heading">Personnel & Mastering</h3>
            <dl className="credits-list">
              <div>
                <dt>WRITTEN & ARRANGED</dt>
                <dd>{release.credits.writtenBy}</dd>
              </div>
              <div>
                <dt>PRODUCED & MIXED</dt>
                <dd>{release.credits.producedBy}</dd>
              </div>
              <div>
                <dt>MASTERING ENGINEERING</dt>
                <dd>{release.credits.masteredBy}</dd>
              </div>
              <div>
                <dt>ARTWORK & VISUAL DIRECTION</dt>
                <dd>{release.credits.artworkBy}</dd>
              </div>
            </dl>

            <div className="platforms-destination-box">
              <span className="dest-box-label">STREAMING & PHYSICAL FORMATS</span>
              <div className="platforms-row">
                {release.platforms.map(p => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="platform-pill glass-control"
                  >
                    <span>{p.name}</span>
                    <small>{p.badge}</small>
                    <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Next / Previous Release Cycle */}
        <nav className="release-pagination-bar" aria-label="Adjacent release navigation">
          <Link to={`/music/${prevRelease.slug}`} className="pag-nav-btn prev-btn glass-panel">
            <ArrowLeft size={16} />
            <div className="pag-text-group">
              <span className="pag-label">PREVIOUS TRANSMISSION</span>
              <strong className="pag-title">{prevRelease.title}</strong>
            </div>
          </Link>

          <Link to={`/music/${nextRelease.slug}`} className="pag-nav-btn next-btn glass-panel">
            <div className="pag-text-group">
              <span className="pag-label">NEXT TRANSMISSION</span>
              <strong className="pag-title">{nextRelease.title}</strong>
            </div>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </div>
    </main>
  )
}
