import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDownRight,
  ArrowRight,
  Play,
  Radio,
} from 'lucide-react'
import { releases } from '../data/releases'
import { CoverArt } from '../components/CoverArt'
import { SignalTicker } from '../components/SignalTicker'
import { FeaturedScrollStory } from '../components/FeaturedScrollStory'
import { usePlayer } from '../context/usePlayer'
import { Reveal } from '../components/motion/Reveal'
import { TextReveal } from '../components/motion/TextReveal'
import { ParallaxMedia } from '../components/motion/ParallaxMedia'

export function Home() {
  const { selectTrack } = usePlayer()
  const featured = releases[0] // Peripheral Vision
  const signals = releases.slice(1) // Ghost Signal, Another Sun, Melt Pattern

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
            <Reveal variant="fade" delay={50}>
              <div className="eyebrow-badge">
                <span className="pulse-indicator" />
                <span>INDEPENDENT TRANSMISSION · 01 / CATALOG ARCHIVE</span>
              </div>
            </Reveal>

            {/* Line-clipped typography reveal */}
            <TextReveal
              as="h1"
              className="hero-headline"
              delay={120}
              lines={[
                'Music for',
                { text: 'the afterimage.', italic: true }
              ]}
            />

            <Reveal variant="up" delay={260}>
              <p className="hero-intro-text">
                A home for new frequencies, visual experiments, and everything heard
                after midnight. Electronic music crafted with analog tape loops and
                sculptural synthesizer design.
              </p>
            </Reveal>

            <Reveal variant="up" delay={340}>
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
            </Reveal>

            <Reveal variant="fade" delay={420}>
              <div className="hero-meta-strip">
                <a href="#statement" className="anchor-jump-link">
                  <span>Enter the manifesto</span>
                  <ArrowDownRight size={14} />
                </a>
                <span className="meta-sep" aria-hidden="true">·</span>
                <span className="meta-spec">CAT. 2024–2026 ARCHIVE</span>
              </div>
            </Reveal>
          </div>

          <div className="hero-artwork-column">
            <ParallaxMedia speed={0.14}>
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
            </ParallaxMedia>
          </div>
        </div>
      </section>

      {/* 2. SCROLLING SIGNAL STRIP */}
      <SignalTicker />

      {/* 3. FEATURED RELEASE PINNED SCROLL STORY */}
      <FeaturedScrollStory />

      {/* 4. ARTIST MANIFESTO */}
      <section className="manifesto-section" id="statement" aria-label="Artist manifesto">
        <div className="section-container">
          <Reveal variant="mask" threshold={0.25}>
            <div className="manifesto-layout glass-panel">
              <div className="manifesto-header">
                <span className="section-eyebrow-accent">02 / A QUIET MANIFESTO</span>
                <TextReveal
                  as="h2"
                  className="manifesto-heading"
                  delay={100}
                  lines={[
                    'Silence is not',
                    'the absence of sound.',
                    { text: 'It is the frame.', italic: true }
                  ]}
                />
              </div>

              <div className="manifesto-body">
                <Reveal variant="up" delay={200}>
                  <p className="manifesto-lead">
                    Silent Ape treats sound as tactile material, atmosphere as architecture,
                    and human attention as an instrument.
                  </p>
                </Reveal>
                <Reveal variant="up" delay={280}>
                  <p className="manifesto-text">
                    Every release is an inquiry into spatial resonance: what lingers when the
                    machinery powers down, the city slows to low frequencies, and the listener
                    steps into the quiet between notes.
                  </p>
                </Reveal>
                <Reveal variant="fade" delay={340}>
                  <div className="manifesto-links">
                    <Link to="/about" className="text-cta-link">
                      <span>Read complete artist manifesto & studio notes</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. SELECTED SIGNALS / VISUAL ARCHIVE */}
      <section className="signals-section" aria-label="Selected signals catalogue">
        <div className="section-container">
          <div className="section-header-row">
            <Reveal variant="fade">
              <div className="section-eyebrow">
                <Radio size={14} className="signal-icon" />
                <span>03 / SELECTED SIGNALS & EXPERIMENTS</span>
              </div>
            </Reveal>
            <Reveal variant="fade" delay={80}>
              <Link to="/music" className="section-view-all-link">
                <span>View complete catalogue</span>
                <span className="arrow-accent">↘</span>
              </Link>
            </Reveal>
          </div>

          <div className="signals-grid">
            {signals.map((rel, index) => (
              <Reveal
                key={rel.slug}
                variant="scale"
                delay={index * 120}
                threshold={0.15}
                as="article"
                className="signal-card-wrapper"
              >
                <div className="signal-card glass-panel">
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
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL TRANSMISSION INVITATION */}
      <section className="transmission-invitation" aria-label="Transmission invitation">
        <div className="section-container">
          <Reveal variant="mask" threshold={0.2}>
            <div className="invitation-box glass-panel">
              <div className="invitation-copy">
                <span className="invitation-eyebrow">TRANSMISSION FREQUENCY</span>
                <TextReveal
                  as="h2"
                  className="invitation-heading"
                  lines={[
                    'For the ones still',
                    { text: 'tuning in.', italic: true }
                  ]}
                />
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
          </Reveal>
        </div>
      </section>
    </main>
  )
}
