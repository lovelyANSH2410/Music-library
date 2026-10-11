import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  X,
  Play,
  ArrowRight,
  LayoutGrid,
  List,
  Filter,
} from 'lucide-react'
import { releases, type Release } from '../data/releases'
import { CoverArt } from '../components/CoverArt'
import { usePlayer } from '../context/usePlayer'

type FilterCategory = 'ALL' | 'ALBUM' | 'EP' | 'SINGLE'
type ViewMode = 'grid' | 'list'

export function Music() {
  const { selectTrack, currentRelease } = usePlayer()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // Filter & Search Logic
  const filteredReleases = useMemo(() => {
    return releases.filter(rel => {
      // Category filter
      if (activeFilter === 'ALBUM' && rel.type !== 'Album') return false
      if (activeFilter === 'EP' && rel.type !== 'EP') return false
      if (activeFilter === 'SINGLE' && rel.type !== 'Single') return false

      // Search query
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      const titleMatch = rel.title.toLowerCase().includes(q)
      const moodMatch = rel.mood.toLowerCase().includes(q)
      const yearMatch = rel.year.includes(q)
      const trackMatch = rel.tracks.some(t => t.title.toLowerCase().includes(q))
      return titleMatch || moodMatch || yearMatch || trackMatch
    })
  }, [activeFilter, searchQuery])

  // Count helper
  const counts = useMemo(() => {
    return {
      all: releases.length,
      albums: releases.filter(r => r.type === 'Album').length,
      eps: releases.filter(r => r.type === 'EP').length,
      singles: releases.filter(r => r.type === 'Single').length,
    }
  }, [])

  return (
    <main className="music-archive-page">
      <div className="section-container">
        {/* Page Intro Header */}
        <header className="archive-intro-header">
          <div className="archive-eyebrow">
            <span className="pulse-indicator" />
            <span>DISCOGRAPHY / COMPLETE ARCHIVE</span>
          </div>

          <div className="archive-title-row">
            <h1 className="archive-heading">
              Every<br />
              <em>signal.</em>
            </h1>
            <p className="archive-subtext">
              A chronological archive of albums, EPs, and standalone singles.
              Mastered for high-fidelity playback and deep spatial listening.
            </p>
          </div>
        </header>

        {/* Catalog Control Toolbar */}
        <section className="catalog-toolbar glass-panel" aria-label="Archive filters and search">
          {/* Filter Tabs */}
          <div className="filter-pill-group" role="tablist" aria-label="Filter by format">
            <button
              className={`filter-tab ${activeFilter === 'ALL' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('ALL')}
              role="tab"
              aria-selected={activeFilter === 'ALL'}
            >
              <span>ALL</span>
              <span className="filter-count">({counts.all})</span>
            </button>
            <button
              className={`filter-tab ${activeFilter === 'ALBUM' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('ALBUM')}
              role="tab"
              aria-selected={activeFilter === 'ALBUM'}
            >
              <span>ALBUMS</span>
              <span className="filter-count">({counts.albums})</span>
            </button>
            <button
              className={`filter-tab ${activeFilter === 'EP' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('EP')}
              role="tab"
              aria-selected={activeFilter === 'EP'}
            >
              <span>EPS</span>
              <span className="filter-count">({counts.eps})</span>
            </button>
            <button
              className={`filter-tab ${activeFilter === 'SINGLE' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('SINGLE')}
              role="tab"
              aria-selected={activeFilter === 'SINGLE'}
            >
              <span>SINGLES</span>
              <span className="filter-count">({counts.singles})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="search-input-box">
            <Search className="search-icon" size={15} />
            <input
              type="text"
              placeholder="Search release, track, or mood..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="catalog-search-field"
              aria-label="Search releases by title, mood, or track"
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Layout Mode Toggles & Counter */}
          <div className="toolbar-right-actions">
            <span className="results-counter">
              SHOWING {filteredReleases.length} OF {releases.length}
            </span>
            <div className="view-mode-toggles">
              <button
                className={`view-mode-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Switch to grid view"
                title="Grid view"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                className={`view-mode-btn ${viewMode === 'list' ? 'is-active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="Switch to list view"
                title="List view"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* Releases Display */}
        {filteredReleases.length === 0 ? (
          <div className="empty-search-state glass-panel">
            <Filter size={32} className="empty-icon" />
            <h3>No transmissions found</h3>
            <p>No releases match the search query "{searchQuery}".</p>
            <button
              className="button outline"
              onClick={() => {
                setSearchQuery('')
                setActiveFilter('ALL')
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="catalog-grid-layout">
            {filteredReleases.map((rel: Release) => (
              <article
                key={rel.slug}
                className={`catalog-card glass-panel ${currentRelease.slug === rel.slug ? 'is-currently-playing' : ''}`}
              >
                <Link to={`/music/${rel.slug}`} className="catalog-card-art-wrap">
                  <CoverArt release={rel} className="catalog-card-cover" />
                  <div className="catalog-card-hover-cue">
                    <span>INSPECT RELEASE</span>
                    <ArrowRight size={13} />
                  </div>
                </Link>

                <div className="catalog-card-body">
                  <div className="catalog-card-top-row">
                    <span className="catalog-cat-code">{rel.catalogId}</span>
                    <span className="catalog-type-pill">{rel.type} · {rel.year}</span>
                  </div>

                  <h2 className="catalog-card-heading">
                    <Link to={`/music/${rel.slug}`}>{rel.title}</Link>
                  </h2>

                  <p className="catalog-card-synopsis">{rel.description}</p>

                  <div className="catalog-card-meta-bar">
                    <span className="catalog-mood-tag">{rel.mood}</span>
                    <span className="catalog-duration-tag">{rel.duration}</span>
                  </div>

                  <div className="catalog-card-actions">
                    <button
                      className="catalog-play-btn button primary-sm"
                      onClick={() => selectTrack(rel, 0)}
                      aria-label={`Queue ${rel.title} in player`}
                    >
                      <Play size={12} fill="currentColor" />
                      <span>Queue</span>
                    </button>
                    <Link to={`/music/${rel.slug}`} className="catalog-details-link">
                      <span>Liner Notes</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="catalog-list-layout glass-panel">
            <div className="list-header-row">
              <span className="col-idx">CAT ID</span>
              <span className="col-title">RELEASE TITLE</span>
              <span className="col-type">FORMAT</span>
              <span className="col-year">YEAR</span>
              <span className="col-duration">LENGTH</span>
              <span className="col-tracks">TRACKS</span>
              <span className="col-actions">ACTION</span>
            </div>
            {filteredReleases.map((rel: Release) => (
              <div
                key={rel.slug}
                className={`list-item-row ${currentRelease.slug === rel.slug ? 'is-currently-playing' : ''}`}
              >
                <span className="col-idx cat-code">{rel.catalogId}</span>
                <div className="col-title title-cell">
                  <div className="mini-thumb">
                    <CoverArt release={rel} />
                  </div>
                  <div>
                    <Link to={`/music/${rel.slug}`} className="row-release-link">
                      <strong>{rel.title}</strong>
                    </Link>
                    <small className="row-mood">{rel.mood}</small>
                  </div>
                </div>
                <span className="col-type">{rel.type}</span>
                <span className="col-year">{rel.year}</span>
                <span className="col-duration">{rel.duration}</span>
                <span className="col-tracks">{rel.tracks.length} tracks</span>
                <div className="col-actions actions-cell">
                  <button
                    className="row-play-btn glass-control"
                    onClick={() => selectTrack(rel, 0)}
                    title={`Queue ${rel.title}`}
                    aria-label={`Queue ${rel.title}`}
                  >
                    <Play size={13} fill="currentColor" />
                  </button>
                  <Link
                    to={`/music/${rel.slug}`}
                    className="row-inspect-btn glass-control"
                    title="View details"
                    aria-label={`View details of ${rel.title}`}
                  >
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
