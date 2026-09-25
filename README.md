# Directive — Marketing Site (v2)

## What changed in v2
- New look: live starfield, brushed-gold instrument bezels, Instrument Serif display type
- Hero animation: real-looking weigh-in data; the scale "panics", Directive separates water, reveals the smooth true trend and Nov 15 runway
- Working Fuel grid and Burn logger previews, animated watch-dial complications
- **All copy lives in `app/content.ts`** — edit messaging there without touching layout
- Upgraded to Next 15.1 + React 19 (delete `node_modules` and `package-lock.json`, then `npm install`)


Next.js 15 (App Router) + Tailwind CSS + Framer Motion. Dark-mode "avionics"
identity: obsidian background, navy/slate panels, Avionics Gold accents —
matching the Mission Control app's horology direction.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `app/page.tsx` — landing page, assembles all sections
- `app/components/` — Nav, Hero, HeroChart (animated Station 1 preview),
  Traps, Pillars, Stations, DiagnosticModal, Footer
- `app/privacy`, `app/terms`, `app/support` — crawlable, App Store–compliant
  subroutes
- `public/.well-known/` — placeholders for universal links / App Links

## Before shipping

1. **`public/.well-known/apple-app-site-association`** — replace
   `TEAMID.com.directive.app` with your real Apple Team ID + bundle ID.
2. **`public/.well-known/assetlinks.json`** — replace `package_name` and
   `sha256_cert_fingerprints` with your real Android signing cert.
3. **Contact emails** — `privacy@directive.app`, `legal@directive.app`,
   `support@directive.app` are placeholders; point them at real inboxes.
4. **Charter application submit** (`DiagnosticModal.tsx`, see the TODO) — currently a
   local state stub. Wire the `submit` handler to your email-capture
   endpoint (Resend, Postmark, a serverless route, etc).
5. **Support form** (`app/support/SupportForm.tsx`) — same: wire to a real
   ticketing/email endpoint.
6. **Metadata** — set the real production domain in
   `app/layout.tsx` (`metadataBase`).
7. **Favicon / OG image** — add `app/favicon.ico` and an OG image; only a
   text reference is scaffolded.

## Brand assets (from your uploaded artwork)
- `public/brand/lockup.png` — the mark + wordmark + tagline, cropped from your
  banner. Used at the top of the hero, edges feathered with a CSS mask so it
  blends into the starfield instead of sitting in a visible box.
- `public/brand/icon.png` — the chevron mark alone, square-cropped. Used in
  the nav bar, footer, and the Charter modal header.
- `public/brand/banner.jpg` — your original full banner (with the Earth
  horizon), used as the social preview (Open Graph / Twitter card) image.
- `app/favicon.ico`, `public/brand/apple-touch-icon.png`,
  `public/brand/icon-192.png`, `public/brand/icon-512.png` — generated from
  the mark crop for browser tabs, iOS home screen, and PWA installs.
- `public/manifest.json` — points at the two PWA icon sizes above.

If you get a cleaner, higher-resolution export of the mark/wordmark as
transparent PNGs from whoever designed them, swap these files 1:1 (same
filenames) and everything above updates automatically — no code changes
needed.



| Token | Value |
|---|---|
| Obsidian (bg) | `#030612` |
| Slate deep | `#0B1528` |
| Slate mid | `#1B3152` |
| Hairline | `#2A3B5C` |
| Avionics Gold | `#D4AF37` |
| Cyan (fluid band) | `#38BDF8` |
| Display font | Space Grotesk |
| Data/mono font | IBM Plex Mono |
