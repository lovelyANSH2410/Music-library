import { useState } from 'react'
import {
  ArrowDownRight,
  Send,
  CheckCircle2,
  Mail,
  Compass,
} from 'lucide-react'

export function Connect() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'Booking & Live Performances',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate clean network dispatch
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 900)
  }

  return (
    <main className="connect-channels-page">
      <div className="section-container">
        {/* Header */}
        <header className="connect-header">
          <div className="connect-eyebrow">
            <span className="pulse-indicator" />
            <span>OPEN TRANSMISSION CHANNELS / 24H</span>
          </div>

          <div className="connect-header-grid">
            <h1 className="connect-main-heading">
              Say<br />
              <em>hello.</em>
            </h1>
            <p className="connect-sub-lead">
              Booking, scoring inquiries, press access, stem requests, or a dispatch from
              the other side of the room. Channels monitored daily.
            </p>
          </div>
        </header>

        {/* Content Columns */}
        <section className="connect-layout-grid">
          {/* Transmission Dispatch Form */}
          <div className="connect-form-panel glass-panel">
            <span className="panel-eyebrow">TRANSMISSION DISPATCH</span>
            <h2 className="form-heading">Send an Inquiry</h2>

            {isSuccess ? (
              <div className="form-success-alert glass-panel">
                <CheckCircle2 size={24} className="success-icon" />
                <h3>Transmission Staged</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Your message regarding{' '}
                  <em>{formData.purpose}</em> has been staged in the client demo.
                </p>
                <div className="boundary-note">
                  <small>
                    * Frontend boundary verified: connect production webhook / API endpoint
                    in deployment to dispatch real emails.
                  </small>
                </div>
                <button
                  className="button outline reset-form-btn"
                  onClick={() => {
                    setIsSuccess(false)
                    setFormData({
                      name: '',
                      email: '',
                      purpose: 'Booking & Live Performances',
                      message: '',
                    })
                  }}
                >
                  Send another transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="dispatch-form">
                <div className="form-field-group">
                  <label htmlFor="name-input">YOUR NAME / IDENTITY</label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="dispatch-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="email-input">RETURN FREQUENCY / EMAIL</label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="dispatch-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="purpose-select">INQUIRY SUBJECT</label>
                  <select
                    id="purpose-select"
                    value={formData.purpose}
                    onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                    className="dispatch-select"
                  >
                    <option value="Booking & Live Performances">Live Performances & Booking</option>
                    <option value="Original Film & Game Scoring">Film, Game & Installation Scoring</option>
                    <option value="Press, Interviews & Radio">Press, Interviews & Broadcast</option>
                    <option value="Audio Stems & Remix Licensing">Stems & Remix Licensing</option>
                    <option value="General Dispatch">General Dispatch</option>
                  </select>
                </div>

                <div className="form-field-group">
                  <div className="label-with-count">
                    <label htmlFor="message-input">TRANSMISSION MESSAGE</label>
                    <span className="char-count">{formData.message.length}/1000</span>
                  </div>
                  <textarea
                    id="message-input"
                    required
                    rows={5}
                    maxLength={1000}
                    placeholder="Enter project details, dates, or specifications..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="dispatch-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button primary submit-dispatch-btn"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Channels */}
          <div className="direct-channels-column">
            <div className="channels-card glass-panel">
              <span className="panel-eyebrow">DIRECT INBOXES</span>
              <ul className="direct-channels-list">
                <li>
                  <a href="mailto:hello@example.com" className="channel-link">
                    <div className="channel-info">
                      <span className="channel-label">GENERAL & BOOKING</span>
                      <strong className="channel-val">hello@example.com</strong>
                    </div>
                    <ArrowDownRight size={16} />
                  </a>
                </li>
                <li>
                  <a href="mailto:press@example.com" className="channel-link">
                    <div className="channel-info">
                      <span className="channel-label">PRESS & LICENSING</span>
                      <strong className="channel-val">press@example.com</strong>
                    </div>
                    <ArrowDownRight size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="channel-link">
                    <div className="channel-info">
                      <span className="channel-label">INSTAGRAM ARCHIVE</span>
                      <strong className="channel-val">@silentape</strong>
                    </div>
                    <ArrowDownRight size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://bandcamp.com" target="_blank" rel="noreferrer" className="channel-link">
                    <div className="channel-info">
                      <span className="channel-label">BANDCAMP MERCH & VINYL</span>
                      <strong className="channel-val">silentape.bandcamp.com</strong>
                    </div>
                    <ArrowDownRight size={16} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="studio-location-card glass-panel">
              <div className="location-header">
                <Compass size={18} />
                <span className="location-title">STUDIO LOCATION & PHYSICAL BASE</span>
              </div>
              <p className="location-desc">
                Analog sound lab based in Los Angeles, California. Studio visits and tape session
                collaborations arranged by prior appointment.
              </p>
              <div className="location-coord-strip">
                <span>LAT: 34°02′52.1″ N</span>
                <span>LON: 118°14′37.2″ W</span>
                <span>ELEV: 84M</span>
              </div>
            </div>

            <div className="disclaimer-panel glass-panel">
              <Mail size={16} />
              <p>
                All placeholder contact destinations are clearly labeled. To connect custom domains
                or transactional email APIs, update environment variables before deployment.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
