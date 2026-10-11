# Silent Ape

Frontend-first demo for a premium music artist site. It uses React, TypeScript, Vite, React Router, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

## Routes

- `/` — artist landing page
- `/music` — discography
- `/music/:slug` — reusable release template
- `/about` — editable artist statement
- `/connect` — contact placeholders

## Content and assets

Demo catalog content is centralized in `src/data/releases.ts`. The original generated demo artwork is at `public/art/peripheral-vision.png`; other demo covers are CSS compositions. Replace these and the placeholder email/social URLs with verified artist content before launch.

## Scope boundary

The player is intentionally UI-only and labels audio as unavailable; no audio source, backend, user accounts, forms, persistence, or analytics are present. A future backend can provide real release data, streaming URLs, contact handling, and media assets without replacing the route or player interfaces.

`public/robots.txt` and `public/sitemap.xml` use `example.com` as a production-domain placeholder and must be updated before release.
