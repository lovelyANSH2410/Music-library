import { useState } from 'react'
import { Play, Pause } from 'lucide-react'

const tickerItems = [
  'THE SIGNAL IS ALWAYS THERE',
  'NOCTURNAL ELECTRONIC ARCHIVE',
  'LISTEN CLOSER',
  'FREQUENCY 432HZ // TEXTURAL DRIFT',
  'CATALOGUE 2024—2026',
  'SOUND AS MATERIAL · ATMOSPHERE AS ARCHITECTURE',
]

export function SignalTicker() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className="signal-ticker-wrap"
      aria-label="Artist transmission marquee"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="ticker-track-container">
        <div className={`ticker-motion-track ${isPaused ? 'is-paused' : ''}`}>
          {/* Double array for seamless infinite marquee loop */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={`${item}-${idx}`} className="ticker-element">
              <span className="ticker-text">{item}</span>
              <span className="ticker-symbol" aria-hidden="true">✳</span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="ticker-toggle-btn"
        onClick={() => setIsPaused(prev => !prev)}
        aria-label={isPaused ? 'Resume ticker movement' : 'Pause ticker movement'}
        title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
      >
        {isPaused ? <Play size={12} /> : <Pause size={12} />}
      </button>
    </div>
  )
}
