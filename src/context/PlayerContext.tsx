import { useState, type ReactNode, useCallback, useEffect, useRef } from 'react'
import { releases, type Release } from '../data/releases'
import { PlayerContext } from './playerContextDef'

const playablePreviews = releases.flatMap(release =>
  release.tracks
    .map((track, trackIndex) => ({ release, trackIndex, hasAudio: Boolean(track.audioSrc) }))
    .filter(({ hasAudio }) => hasAudio)
)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentRelease, setCurrentRelease] = useState<Release>(releases[0])
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolumeState] = useState<number>(85)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [statusBanner, setStatusBanner] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playbackIntentRef = useRef(false)

  if (!audioRef.current) {
    audioRef.current = new Audio()
  }

  const currentTrack = currentRelease.tracks[currentTrackIndex] || currentRelease.tracks[0]
  const audioAvailable = Boolean(currentTrack.audioSrc)

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
    setElapsedTime(0)
  }, [])

  const moveToPreview = useCallback((direction: 1 | -1) => {
    const activePreviewIndex = playablePreviews.findIndex(
      ({ release, trackIndex }) => release.slug === currentRelease.slug && trackIndex === currentTrackIndex
    )
    const nextPreviewIndex = activePreviewIndex === -1
      ? (direction === 1 ? 0 : playablePreviews.length - 1)
      : (activePreviewIndex + direction + playablePreviews.length) % playablePreviews.length
    const nextPreview = playablePreviews[nextPreviewIndex]

    if (!nextPreview) return
    setCurrentRelease(nextPreview.release)
    setCurrentTrackIndex(nextPreview.trackIndex)
    setProgress(0)
    setElapsedTime(0)
  }, [currentRelease.slug, currentTrackIndex])

  const nextTrack = useCallback(() => moveToPreview(1), [moveToPreview])
  const prevTrack = useCallback(() => moveToPreview(-1), [moveToPreview])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audioAvailable || !audio) {
      playbackIntentRef.current = false
      setIsPlaying(false)
      showDemoNotice(`No playable preview is attached to "${currentTrack.title}" yet.`)
      return
    }

    if (audio.paused) {
      playbackIntentRef.current = true
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        playbackIntentRef.current = false
        setIsPlaying(false)
        showDemoNotice('Playback could not start. Check your connection and try again.')
      }
      return
    }

    playbackIntentRef.current = false
    audio.pause()
    setIsPlaying(false)
  }, [audioAvailable, currentTrack.title, showDemoNotice])

  const setVolume = useCallback((val: number) => {
    setVolumeState(val)
    if (val > 0 && isMuted) {
      setIsMuted(false)
    }
  }, [isMuted])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const seek = useCallback((percent: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration)) return
    audio.currentTime = Math.max(0, Math.min(1, percent)) * audio.duration
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    audio.src = currentTrack.audioSrc || ''
    audio.load()
    setProgress(0)
    setElapsedTime(0)

    if (playbackIntentRef.current && currentTrack.audioSrc) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          playbackIntentRef.current = false
          setIsPlaying(false)
          showDemoNotice('Playback could not continue. Check your connection and try again.')
        })
    } else {
      playbackIntentRef.current = false
      setIsPlaying(false)
    }
  }, [currentTrack.audioSrc, showDemoNotice])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume / 100
    audio.muted = isMuted
  }, [volume, isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      const time = audio.currentTime || 0
      setElapsedTime(time)
      setProgress(Number.isFinite(audio.duration) && audio.duration > 0 ? (time / audio.duration) * 100 : 0)
    }
    const handleEnded = () => nextTrack()
    const handleError = () => {
      playbackIntentRef.current = false
      setIsPlaying(false)
      showDemoNotice(`Unable to load the preview for "${currentTrack.title}".`)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [currentTrack.title, nextTrack, showDemoNotice])

  useEffect(() => () => audioRef.current?.pause(), [])

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
        elapsedTime,
        statusBanner,
        selectTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        setVolume,
        toggleMute,
        seek,
        dismissBanner,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
