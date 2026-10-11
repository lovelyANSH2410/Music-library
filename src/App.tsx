import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Player } from './components/Player'
import { CursorGlow } from './components/CursorGlow'
import { Home } from './pages/Home'
import { Music } from './pages/Music'
import { ReleaseDetail } from './pages/ReleaseDetail'
import { About } from './pages/About'
import { Connect } from './pages/Connect'
import { NotFound } from './pages/NotFound'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'Silent Ape',
    genre: ['Electronic', 'Ambient', 'Experimental'],
    description: 'Independent music & visual world. Music for the afterimage.',
    url: 'https://silentape.com',
  }

  return (
    <PlayerProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="site-wrapper">
        <CursorGlow />
        <Header />
        <ScrollToTop />
        <div className="page-content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/music/:slug" element={<ReleaseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <Player />
      </div>
    </PlayerProvider>
  )
}
