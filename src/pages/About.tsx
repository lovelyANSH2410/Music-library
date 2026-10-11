import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Radio, Sparkles } from 'lucide-react'

export function About() {
  return (
    <main className="about-manifesto-page">
      <div className="section-container">
        {/* Intro */}
        <header className="about-header">
          <div className="about-eyebrow">
            <span className="pulse-indicator" />
            <span>ABOUT / ARTIST STATEMENT & STUDIO</span>
          </div>

          <div className="about-header-grid">
            <h1 className="about-main-heading">
              Keeping the<br />
              <em>noise useful.</em>
            </h1>
            <p className="about-sub-lead">
              Silent Ape is an independent music and audio-visual project based in Los Angeles,
              treating frequency as physical mass, tape hysteresis as texture, and silence as space.
            </p>
          </div>
        </header>

        {/* Layout Grid */}
        <section className="about-content-layout">
          {/* Visual Artwork / Portrait Column */}
          <div className="about-portrait-card glass-panel">
            <div className="portrait-inner-visual">
              <div className="portrait-violet-orb" aria-hidden="true" />
              <div className="portrait-grid-matrix" aria-hidden="true" />
              <div className="portrait-signal-rings" aria-hidden="true" />
            </div>
            <div className="portrait-tag-box">
              <span className="portrait-tag-label">STUDIO RESEARCH 01</span>
              <strong className="portrait-tag-val">ANALOG TAPE & GRANULAR RESYNTHESIS</strong>
            </div>
          </div>

          {/* Text and Philosophy Column */}
          <div className="about-text-column">
            <div className="about-editorial-block glass-panel">
              <h2 className="block-title">The After-Hours Philosophy</h2>
              <p className="lead-text">
                Most music is made to fill a room. Silent Ape is composed to frame what is
                already there: room tone, low electromagnetic frequencies, street reverberation,
                and the quiet tension of late-night perception.
              </p>
              <p className="body-text">
                Every release begins with analog sources—re-amped tape machines, acoustic percussion
                slowed to half-speed, and discrete voltage-controlled oscillators. Nothing is quantised
                to a clinical digital grid. The slight wobble, tape dropouts, and room noise are
                not errors; they are the signature of human presence.
              </p>
            </div>

            <div className="studio-specs-grid">
              <div className="spec-card glass-panel">
                <Cpu className="spec-icon" size={20} />
                <h3>Analog Hardware</h3>
                <p>Sequential Prophet-6, vintage Roland Space Echo RE-201, custom Eurorack granular nodes, and Nagra reel-to-reel tape decks.</p>
              </div>

              <div className="spec-card glass-panel">
                <Radio className="spec-icon" size={20} />
                <h3>Spatial Mixing</h3>
                <p>Mixed in high-dynamic-range stereo and discrete binaural fields, calibrated for nocturnal headphone immersion.</p>
              </div>

              <div className="spec-card glass-panel">
                <Sparkles className="spec-icon" size={20} />
                <h3>Visual World</h3>
                <p>Procedural generative visuals created from spectrogram audio feeds and 16mm film scans, curated for live installations.</p>
              </div>
            </div>

            <div className="milestones-panel glass-panel">
              <span className="panel-eyebrow">CURATED DISCOGRAPHY TIMELINE</span>
              <ul className="timeline-list">
                <li>
                  <span className="time-year">2026</span>
                  <div className="time-content">
                    <strong>Peripheral Vision (LP)</strong>
                    <span>Debut full-length studio release exploring nocturnal surveillance and soft city decay.</span>
                  </div>
                </li>
                <li>
                  <span className="time-year">2025</span>
                  <div className="time-content">
                    <strong>Ghost Signal (EP) & Another Sun (Single)</strong>
                    <span>Explorations into microtonal ambient kinetics and acidic synth incisions.</span>
                  </div>
                </li>
                <li>
                  <span className="time-year">2024</span>
                  <div className="time-content">
                    <strong>Melt Pattern (EP)</strong>
                    <span>Four tape-decay studies in physical tension and sub-bass resonance.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="about-cta-box glass-panel">
              <div>
                <strong>Explore the sonic output</strong>
                <p>Browse the complete discography and examine full liner notes.</p>
              </div>
              <Link to="/music" className="button primary">
                <span>View Discography</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
