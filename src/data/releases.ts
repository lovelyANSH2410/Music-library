export interface TrackItem {
  title: string
  duration: string
  number: string
  audioSrc?: string
  previewCredit?: string
}

export interface PlatformLink {
  name: string
  url: string
  badge: string
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
  extendedNotes: string
  tracks: TrackItem[]
  credits: {
    writtenBy: string
    producedBy: string
    masteredBy: string
    artworkBy: string
  }
  platforms: PlatformLink[]
}

export const releases: Release[] = [
  {
    slug: 'peripheral-vision',
    title: 'Peripheral Vision',
    type: 'Album',
    catalogId: 'SA-001',
    year: '2026',
    duration: '38 min',
    mood: 'Nocturnal / Textural',
    cover: 'image',
    description: 'A full-length archive exploring soft surveillance, city weather, and the strange comfort of distant light after midnight.',
    extendedNotes: 'Recorded between October 2025 and January 2026 in Los Angeles. Built from field recordings of electrical hum, vintage analog tape loops, and modular synthesizers tuned to sub-bass resonances.',
    tracks: [
      {
        number: '01', title: 'In the Static', duration: '00:54',
        audioSrc: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/UDkMLnEIWuv4pRUxenw42QEBrs2ZVVTy38Q7rBzM.mp3',
        previewCredit: 'Dormant · 1000 Handz · CC BY 4.0',
      },
      {
        number: '02', title: 'Peripheral Vision', duration: '02:15',
        audioSrc: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/hWd8a00w2NN5qBpYOjlQmcufNjzJKOArNMRhC4gZ.mp3',
        previewCredit: 'World Is Yourz · 1000 Handz · CC BY 4.0',
      },
      {
        number: '03', title: 'Rooms Without Corners', duration: '01:26',
        audioSrc: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/urJexhI5n5PMhMRMb9NSNX8OD8w8hoJ2gSXzpp11.mp3',
        previewCredit: 'Smoke Alarm · 1000 Handz · CC BY 4.0',
      },
      {
        number: '04', title: 'Silver Interference', duration: '02:36',
        audioSrc: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/OqK1Cnf69ceB3005gF883TFXLEhJ8sxnN8iqSDrX.mp3',
        previewCredit: 'Electronika · 1000 Handz · CC BY 4.0',
      },
      { number: '05', title: 'A Soft Exit', duration: '09:55' },
    ],
    credits: {
      writtenBy: 'Silent Ape',
      producedBy: 'Silent Ape',
      masteredBy: 'Telegraph Mastering',
      artworkBy: 'Visual Archive 01'
    },
    platforms: [
      { name: 'Bandcamp', url: 'https://bandcamp.com', badge: 'High-Res Audio' },
      { name: 'Spotify', url: 'https://spotify.com', badge: 'Streaming' },
      { name: 'Apple Music', url: 'https://apple.com/apple-music', badge: 'Lossless' },
      { name: 'Vinyl Edition', url: '#', badge: '180g Heavyweight' },
    ]
  },
  {
    slug: 'ghost-signal',
    title: 'Ghost Signal',
    type: 'EP',
    catalogId: 'SA-002',
    year: '2025',
    duration: '19 min',
    mood: 'Ambient / Kinetic',
    cover: 'violet',
    description: 'A compact transmission from the space between waking and return, hovering between granular stillness and sudden sub-bass tremors.',
    extendedNotes: 'Conceived as three continuous movements. Developed using modified acoustic instruments routed through custom DSP delays and ultraviolet tape machines.',
    tracks: [
      { number: '01', title: 'Ghost Signal', duration: '05:48' },
      { number: '02', title: 'Antenna Bloom', duration: '06:32' },
      { number: '03', title: 'Two Minutes of Blue', duration: '06:40' },
    ],
    credits: {
      writtenBy: 'Silent Ape',
      producedBy: 'Silent Ape',
      masteredBy: 'Telegraph Mastering',
      artworkBy: 'Procedural Violet Study'
    },
    platforms: [
      { name: 'Bandcamp', url: 'https://bandcamp.com', badge: 'High-Res Audio' },
      { name: 'Spotify', url: 'https://spotify.com', badge: 'Streaming' },
      { name: 'Apple Music', url: 'https://apple.com/apple-music', badge: 'Lossless' },
    ]
  },
  {
    slug: 'another-sun',
    title: 'Another Sun',
    type: 'Single',
    catalogId: 'SA-003',
    year: '2025',
    duration: '4 min',
    mood: 'Warm / Fractured',
    cover: 'lime',
    description: 'One bright frequency held against a darker field. An exploration of harmonic tension and sharp rhythmic incisions.',
    extendedNotes: 'A single take captured live with a semi-modular synth patch and distorted tape saturation. Emphasizes acidic harmonic overtones and kinetic pacing.',
    tracks: [
      { number: '01', title: 'Another Sun', duration: '04:18' },
    ],
    credits: {
      writtenBy: 'Silent Ape',
      producedBy: 'Silent Ape',
      masteredBy: 'Studio B',
      artworkBy: 'Acid Grid Matrix'
    },
    platforms: [
      { name: 'Bandcamp', url: 'https://bandcamp.com', badge: 'Digital Single' },
      { name: 'Spotify', url: 'https://spotify.com', badge: 'Streaming' },
      { name: 'Apple Music', url: 'https://apple.com/apple-music', badge: 'Spatial Audio' },
    ]
  },
  {
    slug: 'melt-pattern',
    title: 'Melt Pattern',
    type: 'EP',
    catalogId: 'SA-004',
    year: '2024',
    duration: '24 min',
    mood: 'Pressure / Drift',
    cover: 'red',
    description: 'A set of low-lit studies in tension and release, featuring dense low-frequency drones and fractured metallic percussive events.',
    extendedNotes: 'Four tracks recorded in late autumn 2024. Uses hydrophone samples, decayed tape loops, and resonant analog filters designed to emulate physical melting patterns.',
    tracks: [
      { number: '01', title: 'Melt Pattern', duration: '06:12' },
      { number: '02', title: 'Unfixed', duration: '05:44' },
      { number: '03', title: 'The Last Frame', duration: '05:30' },
      { number: '04', title: 'Return Path', duration: '06:34' },
    ],
    credits: {
      writtenBy: 'Silent Ape',
      producedBy: 'Silent Ape',
      masteredBy: 'Studio B',
      artworkBy: 'Chrominance Red Field'
    },
    platforms: [
      { name: 'Bandcamp', url: 'https://bandcamp.com', badge: 'High-Res Audio' },
      { name: 'Spotify', url: 'https://spotify.com', badge: 'Streaming' },
      { name: 'Apple Music', url: 'https://apple.com/apple-music', badge: 'Lossless' },
      { name: 'Cassette Edition', url: '#', badge: 'Limited Run of 100' },
    ]
  },
]
