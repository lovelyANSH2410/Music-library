export interface Track {
  title: string
  duration: string
  number: string
}

export interface PlatformLink {
  name: string
  url: string
  label: string
}

export interface Release {
  slug: string
  title: string
  type: 'Album' | 'EP' | 'Single'
  catalogId: string
  year: string
  duration: string
  mood: string
  cover: 'image' | 'violet' | 'lime' | 'red'
  description: string
  extendedNotes?: string
  tracks: string[] | Track[]
  credits?: {
    writtenBy?: string
    producedBy?: string
    masteredBy?: string
    artworkBy?: string
  }
  platforms?: PlatformLink[]
}

export interface PlayerState {
  currentRelease: Release | null
  currentTrackIndex: number
  isPlaying: boolean
  audioAvailable: boolean
  volume: number
  isMuted: boolean
  progress: number
  statusMessage: string
  selectTrack: (release: Release, trackIndex?: number, autoPlay?: boolean) => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  setVolume: (vol: number) => void
  toggleMute: () => void
  seek: (percent: number) => void
}
