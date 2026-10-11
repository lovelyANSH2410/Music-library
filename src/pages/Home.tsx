import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDownRight,
  ArrowRight,
  Play,
  ListMusic,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Radio,
} from 'lucide-react'
import { releases } from '../data/releases'
import { CoverArt } from '../components/CoverArt'
import { SignalTicker } from '../components/SignalTicker'
import { usePlayer } from '../context/usePlayer'

export function Home() {
  const { selectTrack } = usePlayer()
  const featured = releases[0] // Peripheral Vision
  const signals = releases.slice(1) // Ghost Signal, Another Sun, Melt Pattern

  const [expandedTracks, setExpandedTracks] = useState(false)
  const [signupEmail, setSignupEmail] = useState('')
  const [signupSubmitted, setSignupSubmitted] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (signupEmail.trim()) {
      setSignupSubmitted(true)
    }
  }

  return (
    <main className="home-main">
      {/* 1. CINEMATIC HERO */}
      <section className="hero-section" aria-label="Hero presentation">
        <div className="hero-container">
          <div className="hero-copy-column">
            <div className="eyebrow-badge">
              <span className="pulse-indicator" />
              <span>INDEPENDENT TRANSMISSION · 01 / CATALOG ARCHIVE</span>
            </div>

            <h1 className="hero-headline">
              <span className="reveal-line">Music for</span>
              <span className="reveal-line italic-line">
                <em>the afterimage.</em>
              </span>
            </h1>

            <p className="hero-intro-text">
              A home for new frequencies, visual experiments, and everything heard
              after midnight. Electronic music crafted with analog tape loops and
              sculptural synthesizer design.
            </p>

            <div className="hero-actions-group">
              <button
                className="button primary hero-play-btn"
                onClick={() => selectTrack(featured, 0)}
              >
                <Play size={16} fill="currentColor" />
                <span>Listen to {featured.title}</span>
              </button>

              <Link className="button outline hero-explore-btn" to="/music">
                <span>Explore Discography</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="hero-meta-strip">
              <a href="#statement" className="anchor-jump-link">
                <span>Enter the manifesto</span>
                <ArrowDownRight size={14} />
              </a>
              <span className="meta-sep" aria-hidden="true">·</span>
              <span className="meta-spec">CAT. 2024–2026 ARCHIVE</span>
            </div>
          </div>

          <div className="hero-artwork-column">
            <div className="hero-visual-frame">
              <div className="orbital-ring" aria-hidden="true" />
              <div className="ambient-artwork-glow" aria-hidden="true" />

              <div className="hero-cover-card">
                <CoverArt release={featured} priority className="hero-main-cover" />
              </div>

              {/* macOS Glass Stamp */}
              <div className="release-glass-stamp glass-panel">
                <div className="stamp-header">
                  <span className="stamp-badge">NEW / {featured.year}</span>
                  <span className="stamp-format">{featured.type}</span>
                </div>
                <strong className="stamp-title">{featured.title}</strong>
                <span className="stamp-cat">{featured.catalogId} · 5 TRACKS</span>
                <button
                  className="stamp-listen-btn glass-control"
                  onClick={() => selectTrack(featured, 0)}
                  aria-label={`Queue ${featured.title} in player`}
                >
                  <Play size={11} fill="currentColor" />
                  <span>QUEUE</span>
                </button>
              </div>

              {/* Coordinates Badge */}
              <div className="coordinates-badge">
                <span className="coord-label">STUDIO COORDINATES</span>
                <span className="coord-val">34°02′ 52.1″ N · 118°14′ 37.2″ W</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCROLLING SIGNAL STRIP */}
      <SignalTicker />

      {/* 3. FEATURED RELEASE SECTION */}
      <section className="featured-section" id="featured" aria-label="Featured release spotlight">
        <div className="section-container">
          <div className="section-header-row">
            <div className="section-eyebrow">
              <Radio size={14} className="signal-icon" />
              <span>01 / CURRENT FEATURED TRANSMISSION</span>
            </div>
            <Link to="/music" className="section-view-all-link">
              <span>View full catalog ({releases.length})</span>
              <ArrowDownRight size={15} />
            </Link>
          </div>

          <article className="featured-release-layout glass-panel">
            <div className="featured-art-wrapper">
              <CoverArt release={featured} className="featured-large-cover" />
              <div className="art-ambient-flare" aria-hidden="true" />
            </div>

            <div className="featured-content-column">
              <div className="featured-tag-row">
                <span className="tag-lime">CAT. {featured.catalogId}</span>
                <span className="tag-neutral">{featured.type}</span>
                <span className="tag-neutral">{featured.year}</span>
              </div>

              <h2 className="featured-title">
                Peripheral<br />
                <em>Vision</em>
              </h2>

              <p className="featured-summary">{featured.description}</p>

              <dl className="featured-specs-list">
                <div className="spec-item">
                  <dt>FORMAT</dt>
                  <dd>LP / 12″ Vinyl & Digital</dd>
                </div>
                <div className="spec-item">
                  <dt>RUN TIME</dt>
                  <dd>{featured.duration}</dd>
                </div>
                <div className="spec-item">
                  <dt>MOOD</dt>
                  <dd>{featured.mood}</dd>
                </div>
              </dl>

              {/* Expandable Tracklist */}
              <div className="expandable-tracks-box">
                <button
                  className="toggle-tracks-btn glass-control"
                  onClick={() => setExpandedTracks(!expandedTracks)}
                  aria-expanded={expandedTracks}
                >
                  <ListMusic size={15} />
                  <span>{expandedTracks ? 'Hide Tracklist' : `Inspect Tracklist (${featured.tracks.length} tracks)`}</span>
                  {expandedTracks ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>

                {expandedTracks && (
                  <div className="tracks-expanded-panel">
                    {featured.tracks.map((track, idx) => (
                      <div key={track.title} className="track-row">
                        <span className="track-idx">{track.number}</span>
                        <span className="track-name">{track.title}</span>
                        <span className="track-len">{track.duration}</span>
                        <button
                          className="track-queue-btn glass-control"
                          onClick={() => selectTrack(featured, idx)}
                          title={`Select ${track.title} in player`}
                        >
                          <Play size={12} fill="currentColor" />
                          <span>Queue</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Streaming Destinations */}
              <div className="featured-destinations">
                <span className="dest-label">DESTINATIONS:</span>
                <div className="dest-links-grid">
                  {featured.platforms.map(p => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="dest-badge glass-control"
                    >
                      <span>{p.name}</span>
                      <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="featured-cta-row">
                <Link to={`/music/${featured.slug}`} className="button outline">
                  <span>Open Full Liner Notes</span>
                  <ArrowRight size={15} />
                </Link>
                <button
                  className="button primary"
                  onClick={() => selectTrack(featured, 0)}
                >
                  <Play size={15} fill="currentColor" />
                  <span>Select in Player</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 4. ARTIST MANIFESTO */}
      <section className="manifesto-section" id="statement" aria-label="Artist manifesto">
        <div className="section-container">
          <div className="manifesto-layout glass-panel">
            <div className="manifesto-header">
              <span className="section-eyebrow-accent">02 / A QUIET MANIFESTO</span>
              <h2 className="manifesto-heading">
                Silence is not<br />
                the absence of sound.<br />
                <em>It is the frame.</em>
              </h2>
            </div>

            <div className="manifesto-body">
              <p className="manifesto-lead">
                Silent Ape treats sound as tactile material, atmosphere as architecture,
                and human attention as an instrument.
              </p>
              <p className="manifesto-text">
                Every release is an inquiry into spatial resonance: what lingers when the
                machinery powers down, the city slows to low frequencies, and the listener
                steps into the quiet between notes.
              </p>
              <div className="manifesto-links">
                <Link to="/about" className="text-cta-link">
                  <span>Read complete artist manifesto & studio notes</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELECTED SIGNALS / VISUAL ARCHIVE */}
      <section className="signals-section" aria-label="Selected signals catalogue">
        <div className="section-container">
          <div className="section-header-row">
            <div className="section-eyebrow">
              <Radio size={14} className="signal-icon" />
              <span>03 / SELECTED SIGNALS & EXPERIMENTS</span>
            </div>
            <Link to="/music" className="section-view-all-link">
              <span>View complete catalogue</span>
              <ArrowDownRight size={15} />
            </Link>
          </div>

          <div className="signals-grid">
            {signals.map((rel) => (
              <article key={rel.slug} className="signal-card glass-panel">
                <Link to={`/music/${rel.slug}`} className="signal-card-art-link">
                  <CoverArt release={rel} className="signal-card-cover" />
                  <div className="signal-art-hover-overlay">
                    <span className="view-detail-label">OPEN RELEASE</span>
                  </div>
                </Link>

                <div className="signal-card-meta">
                  <div className="signal-card-header">
                    <span className="signal-cat-tag">{rel.catalogId} · {rel.type}</span>
                    <span className="signal-year-tag">{rel.year}</span>
                  </div>

                  <h3 className="signal-card-title">
                    <Link to={`/music/${rel.slug}`}>{rel.title}</Link>
                  </h3>

                  <p className="signal-card-desc">{rel.description}</p>

                  <div className="signal-card-footer">
                    <span className="signal-mood-tag">{rel.mood}</span>
                    <button
                      className="signal-quick-play-btn glass-control"
                      onClick={() => selectTrack(rel, 0)}
                      aria-label={`Queue ${rel.title} in player`}
                      title="Select in player"
                    >
                      <Play size={13} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL TRANSMISSION INVITATION */}
      <section className="transmission-invitation" aria-label="Transmission invitation">
        <div className="section-container">
          <div className="invitation-box glass-panel">
            <div className="invitation-copy">
              <span className="invitation-eyebrow">TRANSMISSION FREQUENCY</span>
              <h2 className="invitation-heading">
                For the ones still<br />
                <em>tuning in.</em>
              </h2>
              <p className="invitation-desc">
                Subscribe to uncompressed studio stems, future vinyl notifications,
                and private midnight transmissions. Zero noise.
              </p>

              {signupSubmitted ? (
                <div className="signup-success-message glass-control">
                  <span className="pulse-indicator" />
                  <span>Frequency staged for: {signupEmail}. Transmissions launch with official release.</span>
                </div>
              ) : (
                <form className="invitation-form" onSubmit={handleSignup}>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address..."
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    className="invitation-input"
                    aria-label="Email address for transmissions"
                  />
                  <button type="submit" className="button primary invitation-submit">
                    <span>Connect Channel</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

            <div className="invitation-visual">
              <div className="frequency-orb" aria-hidden="true" />
              <Link to="/connect" className="circle-connect-btn" aria-label="Open connection channels">
                <ArrowDownRight size={34} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
