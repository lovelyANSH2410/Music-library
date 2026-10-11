import { createContext } from 'react'
import type { Release, TrackItem } from '../data/releases'

export interface PlayerContextType {
  currentRelease: Release
  currentTrack: TrackItem
  currentTrackIndex: number
  isPlaying: boolean
  audioAvailable: boolean
  volume: number
  isMuted: boolean
  progress: number
  elapsedTime: number
  statusBanner: string | null
  selectTrack: (release: Release, trackIndex?: number) => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  setVolume: (val: number) => void
  toggleMute: () => void
  seek: (percent: number) => void
  dismissBanner: () => void
}

export const PlayerContext = createContext<PlayerContextType | null>(null)
