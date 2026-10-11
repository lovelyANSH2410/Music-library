import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { BrandMark } from './Header'

export function Footer() {
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Grid */}
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-link">
              <BrandMark />
              <span className="footer-brand-title">
                <strong>SILENT</strong>
                <span>APE</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Independent electronic music & visual research world.
              Composed and recorded after midnight.
            </p>
            <div className="footer-coordinates">
              <span>LOS ANGELES STUDIO // 34°02′52″N 118°14′37″W</span>
              <span className="live-clock">LOCAL TIME: {timeStr || '00:00:00 UTC'}</span>
            </div>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-heading">ARCHIVE NAVIGATION</span>
            <ul className="footer-nav-links">
              <li><Link to="/">Home Archive</Link></li>
              <li><Link to="/music">Discography & Stems</Link></li>
              <li><Link to="/about">Artist Manifesto & Studio</Link></li>
              <li><Link to="/connect">Transmission Channels</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-col-heading">EXTERNAL DESTINATIONS</span>
            <ul className="footer-external-links">
              <li>
                <a href="https://bandcamp.com" target="_blank" rel="noreferrer">
                  <span>Bandcamp</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href="https://spotify.com" target="_blank" rel="noreferrer">
                  <span>Spotify</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href="https://soundcloud.com" target="_blank" rel="noreferrer">
                  <span>SoundCloud</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <span>Instagram</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <span>© 2026 SILENT APE · INDEPENDENT RELEASE ARCHIVE</span>
            <span className="footer-specs">SYSTEM v2.0 // ZERO TELEMETRY</span>
          </div>

          <button
            className="back-to-top-btn glass-control"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
