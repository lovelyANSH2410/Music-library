import { useState } from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Info,
  X,
} from 'lucide-react'
import { usePlayer } from '../context/usePlayer'
import { CoverArt } from './CoverArt'

export function Player() {
  const {
    currentRelease,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    volume,
    isMuted,
    statusBanner,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    dismissBanner,
    selectTrack,
  } = usePlayer()

  const [expandedMobile, setExpandedMobile] = useState(false)

  return (
    <>
      {/* Dynamic Status Toast Banner */}
      {statusBanner && (
        <aside
          className="player-toast glass-panel"
          role="status"
          aria-live="polite"
        >
          <div className="player-toast-content">
            <Info className="toast-icon" size={15} />
            <p>{statusBanner}</p>
          </div>
          <button
            className="toast-close-btn"
            onClick={dismissBanner}
            aria-label="Dismiss notice"
          >
            <X size={14} />
          </button>
        </aside>
      )}

      {/* Floating macOS Glass Player Dock */}
      <aside
        className={`audio-player-dock glass-player ${expandedMobile ? 'is-mobile-expanded' : ''}`}
        aria-label="Global release playback player"
      >
        <div className="player-main-bar">
          {/* Release Artwork Thumbnail */}
          <div className="player-thumb-container">
            <CoverArt release={currentRelease} className="player-cover-thumb" />
          </div>

          {/* Track Details & Status */}
          <div className="player-metadata">
            <div className="player-status-line">
              <span className="track-status-pill">
                <span className="status-indicator-dot" />
                {currentRelease.catalogId} · {currentTrack.number}
              </span>
              <span className="audio-availability-tag">
                DEMO PREVIEW UNAVAILABLE
              </span>
            </div>
            <strong className="track-title-heading" title={currentTrack.title}>
              {currentTrack.title}
            </strong>
            <span className="release-title-sub">
              {currentRelease.title} · {currentRelease.type} ({currentRelease.year})
            </span>
          </div>

          {/* Transport Controls */}
          <div className="player-transport-controls">
            <button
              className="player-btn control-prev glass-control"
              onClick={prevTrack}
              aria-label="Previous track"
              title="Previous track"
            >
              <SkipBack size={15} />
            </button>

            <button
              className="player-btn control-play primary-play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause preview' : 'Play preview (Demo notice)'}
              title={isPlaying ? 'Pause' : 'Play (Demo stream unreleased)'}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            </button>

            <button
              className="player-btn control-next glass-control"
              onClick={nextTrack}
              aria-label="Next track"
              title="Next track"
            >
              <SkipForward size={15} />
            </button>
          </div>

          {/* Track Duration & Waveform Indicator */}
          <div className="player-timeline">
            <span className="timeline-time start-time">00:00</span>
            <div
              className="timeline-track"
              role="progressbar"
              aria-valuenow={0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Track progress"
            >
              <div className="timeline-fill" style={{ width: '0%' }} />
              <div className="timeline-scrubber" style={{ left: '0%' }} />
            </div>
            <span className="timeline-time end-time">{currentTrack.duration}</span>
          </div>

          {/* Volume Control */}
          <div className="player-volume-group">
            <button
              className="player-btn volume-mute-btn glass-control"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
            >
              {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="volume-slider"
              aria-label="Master volume"
              style={{ '--volume-pct': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
            />
          </div>

          {/* Mobile expand / toggle button */}
          <button
            className="player-mobile-expand-btn glass-control"
            onClick={() => setExpandedMobile(!expandedMobile)}
            aria-expanded={expandedMobile}
            aria-label={expandedMobile ? 'Collapse player drawer' : 'Expand player tracklist'}
          >
            {expandedMobile ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>

        {/* Mobile / Expanded Track Drawer */}
        {expandedMobile && (
          <div className="player-drawer-content">
            {/* Mobile Expanded Transport Controls */}
            <div className="drawer-transport-row">
              <button
                className="player-btn control-prev glass-control"
                onClick={prevTrack}
                aria-label="Previous track"
                title="Previous track"
              >
                <SkipBack size={18} />
              </button>

              <button
                className="player-btn control-play primary-play-btn drawer-play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                className="player-btn control-next glass-control"
                onClick={nextTrack}
                aria-label="Next track"
                title="Next track"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Mobile Timeline in Drawer */}
            <div className="drawer-mobile-timeline">
              <span className="timeline-time">00:00</span>
              <div className="timeline-track" role="progressbar" aria-valuenow={0} aria-label="Track progress">
                <div className="timeline-fill" style={{ width: '0%' }} />
              </div>
              <span className="timeline-time">{currentTrack.duration}</span>
            </div>

            {/* Mobile Secondary Controls Row */}
            <div className="drawer-mobile-controls-row">
              <div className="drawer-volume-group">
                <button
                  className="player-btn volume-mute-btn glass-control"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="volume-slider"
                  aria-label="Master volume"
                  style={{ '--volume-pct': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
                />
              </div>
              <span className="drawer-demo-badge">
                DEMO PREVIEW UNAVAILABLE
              </span>
            </div>

            <div className="drawer-header">
              <span className="drawer-title">TRACKS IN {currentRelease.title.toUpperCase()}</span>
              <span className="drawer-format">{currentRelease.type} · {currentRelease.year}</span>
            </div>
            <div className="drawer-track-list">
              {currentRelease.tracks.map((t, idx) => (
                <button
                  key={t.title}
                  className={`drawer-track-item ${idx === currentTrackIndex ? 'is-active-track' : ''}`}
                  onClick={() => selectTrack(currentRelease, idx)}
                >
                  <span className="drawer-track-num">{t.number}</span>
                  <span className="drawer-track-name">{t.title}</span>
                  <span className="drawer-track-time">{t.duration}</span>
                </button>
              ))}
            </div>
            <div className="drawer-footer-note">
              <span>* High-resolution stems will be activated with official distribution.</span>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
