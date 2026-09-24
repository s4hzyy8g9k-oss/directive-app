# Directive — Marketing Site

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
4. **Charter application submit** (`DiagnosticModal.tsx`) — currently a
   local state stub. Wire the `submit` handler to your email-capture
   endpoint (Resend, Postmark, a serverless route, etc).
5. **Support form** (`app/support/SupportForm.tsx`) — same: wire to a real
   ticketing/email endpoint.
6. **Metadata** — set the real production domain in
   `app/layout.tsx` (`metadataBase`).
7. **Favicon / OG image** — add `app/favicon.ico` and an OG image; only a
   text reference is scaffolded.

## Design tokens

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
