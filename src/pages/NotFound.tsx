import { Link } from 'react-router-dom'
import { ArrowLeft, Radio } from 'lucide-react'

export function NotFound() {
  return (
    <main className="not-found-page">
      <div className="section-container">
        <div className="not-found-card glass-panel">
          <div className="not-found-eyebrow">
            <Radio size={16} />
            <span>404 // TRANSMISSION LOST</span>
          </div>

          <h1 className="not-found-heading">
            Nothing<br />
            <em>here.</em>
          </h1>

          <p className="not-found-desc">
            The requested frequency is outside the active spectrum, or has decayed
            into background static. Return to the archive to reconnect.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="button primary">
              <ArrowLeft size={15} />
              <span>Return to Archive Home</span>
            </Link>
            <Link to="/music" className="button outline">
              <span>Browse All Releases</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
