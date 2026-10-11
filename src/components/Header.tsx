import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Radio } from 'lucide-react'
import { usePlayer } from '../context/usePlayer'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/music', label: 'Music' },
  { to: '/about', label: 'About' },
  { to: '/connect', label: 'Connect' },
]

export function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <span className="brand-logo-wrap" style={{ width: size, height: size }}>
      <img
        src="/Neon Gorilla Cyberpunk App Icon.png"
        alt="Silent Ape neon gorilla logo"
        className="brand-logo-img"
        width={size}
        height={size}
      />
      <span className="brand-logo-rim" aria-hidden="true" />
    </span>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { currentRelease, currentTrack } = usePlayer()
  const location = useLocation()

  // Track scroll position to enhance glass opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change during render
  const [prevPathname, setPrevPathname] = useState(location.pathname)
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setMenuOpen(false)
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link className="brand-link" to="/" aria-label="Silent Ape Home">
          <BrandMark />
          <span className="brand-text">
            <strong>SILENT</strong>
            <span>APE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-navigation" aria-label="Primary site navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  {isActive && <span className="active-pill" aria-hidden="true" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Live Status Badge */}
        <div className="header-status-badge glass-control" title={`Currently selected: ${currentTrack.title} (${currentRelease.title})`}>
          <Radio className="status-radio-icon" size={13} />
          <span className="status-label">TRANSMISSION ACTIVE</span>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="mobile-menu-trigger glass-control"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)} />
        <nav className="mobile-drawer-content glass-panel" aria-label="Mobile navigation menu">
          <div className="mobile-drawer-top">
            <span className="mobile-drawer-eyebrow">NAVIGATION ARCHIVE</span>
            <button
              className="mobile-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
          <div className="mobile-links-list">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>{label}</span>
                <span className="mobile-nav-arrow">↘</span>
              </NavLink>
            ))}
          </div>
          <div className="mobile-drawer-footer">
            <div className="mobile-status-row">
              <span className="pulse-dot" />
              <span>SELECTED: {currentTrack.title}</span>
            </div>
            <p className="mobile-drawer-note">Independent music & visual world. 2026.</p>
          </div>
        </nav>
      </div>
    </header>
  )
}
