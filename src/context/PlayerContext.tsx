import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { releases, type Release, type TrackItem } from '../data/releases'

interface PlayerContextType {
  currentRelease: Release
  currentTrack: TrackItem
  currentTrackIndex: number
  isPlaying: boolean
  audioAvailable: boolean
  volume: number
  isMuted: boolean
  progress: number
  statusBanner: string | null
  selectTrack: (release: Release, trackIndex?: number) => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  setVolume: (val: number) => void
  toggleMute: () => void
  dismissBanner: () => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentRelease, setCurrentRelease] = useState<Release>(releases[0])
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolumeState] = useState<number>(85)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [statusBanner, setStatusBanner] = useState<string | null>(null)

  // In this demo archive, master stems and full stream files are unreleased placeholders.
  const audioAvailable = false

  const currentTrack = currentRelease.tracks[currentTrackIndex] || currentRelease.tracks[0]

  const showDemoNotice = useCallback((msg: string) => {
    setStatusBanner(msg)
    const t = setTimeout(() => {
      setStatusBanner(null)
    }, 4500)
    return () => clearTimeout(t)
  }, [])

  const selectTrack = useCallback((release: Release, trackIndex = 0) => {
    setCurrentRelease(release)
    const safeIndex = Math.max(0, Math.min(trackIndex, release.tracks.length - 1))
    setCurrentTrackIndex(safeIndex)
    setProgress(0)
    // Honest playback state: notify user that this release is queued in player
    showDemoNotice(`Selected: "${release.tracks[safeIndex].title}" (${release.title}). Audio preview unreleased in demo catalogue.`)
  }, [showDemoNotice])

  const togglePlay = useCallback(() => {
    if (!audioAvailable) {
      showDemoNotice(`Playback unavailable: master audio stream for "${currentTrack.title}" is pending official label release.`)
      setIsPlaying(false)
      return
    }
    setIsPlaying(prev => !prev)
  }, [audioAvailable, currentTrack.title, showDemoNotice])

  const nextTrack = useCallback(() => {
    if (currentTrackIndex < currentRelease.tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1)
      setProgress(0)
    } else {
      // Loop or go to next release
      const currentRelIndex = releases.findIndex(r => r.slug === currentRelease.slug)
      const nextRel = releases[(currentRelIndex + 1) % releases.length]
      setCurrentRelease(nextRel)
      setCurrentTrackIndex(0)
      setProgress(0)
    }
  }, [currentRelease, currentTrackIndex])

  const prevTrack = useCallback(() => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1)
      setProgress(0)
    } else {
      const currentRelIndex = releases.findIndex(r => r.slug === currentRelease.slug)
      const prevRel = releases[(currentRelIndex - 1 + releases.length) % releases.length]
      setCurrentRelease(prevRel)
      setCurrentTrackIndex(prevRel.tracks.length - 1)
      setProgress(0)
    }
  }, [currentRelease, currentTrackIndex])

  const setVolume = useCallback((val: number) => {
    setVolumeState(val)
    if (val > 0 && isMuted) {
      setIsMuted(false)
    }
  }, [isMuted])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const dismissBanner = useCallback(() => {
    setStatusBanner(null)
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        currentRelease,
        currentTrack,
        currentTrackIndex,
        isPlaying,
        audioAvailable,
        volume,
        isMuted,
        progress,
        statusBanner,
        selectTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        setVolume,
        toggleMute,
        dismissBanner,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
