# Implementation Backlog

Execution order for the Vite + Sanity rebuild.

## Blockers

- [x] Upgrade local Node to 18+ (20 preferred) — use `nvm use` with `.nvmrc`
- [x] Scaffold Vite app in `vite-sanity-frontend/`

## Phase 1 (In Progress): Discovery + Mapping

- [x] Route/template inventory
- [x] High-level WP -> Sanity model map
- [x] Field-level meta/option map
- [ ] Confirm JSON payload structures for all serialized meta fields
- [ ] Finalize parity test matrix (devices/browsers)

## Phase 2: Frontend Foundation

- [x] Initialize Vite + React
- [x] Add routing skeleton for all mapped routes
- [x] Port design tokens (colors, fonts, spacing, buttons, container)
- [x] Add global layout shell (header/footer)

## Phase 3: Section/Template Build

- [x] Home route — hero + sections (static + optional Sanity overrides for hero / process intro)
- [x] Global header + footer (static nav + mega menu; Sanity menus later)
- [x] About route
- [x] Contact route
- [x] FAQs route
- [x] Start Your Project route (multi-step enquiry UI)
- [x] Legal routes
- [x] Service archive + detail (static bundles + WP-shaped sections)
- [x] Case study archive + detail
- [x] Blog archive + detail

## Phase 4: Interaction Parity

- [x] Hero animation + slider (home)
- [x] Sticky header behavior
- [x] Mobile menu + mobile mega menu
- [x] Horizontal scroll sections (process / service steps)
- [x] FAQ accordion + section reveals (where used)

## Phase 5: Sanity Integration

- [ ] Full Studio schemas for all document types (homepage notes: `docs/sanity-schema-notes.md`)
- [x] `@sanity/client` + GROQ for `homePage` + `siteSettings` + `CmsContext` (optional when env set)
- [ ] Seed/migrate full site content
- [ ] GROQ + adapters for services, case studies, blog (beyond homepage)
- [ ] Plug all routes into live CMS content

## Phase 6: Forms + API

- [ ] Consultation / contact submission endpoint (if separate from enquiry)
- [x] Enquiry JSON submission — dev proxy (`scripts/enquiry-api-dev.mjs`) + `netlify/functions/enquiry.mjs`
- [ ] File uploads persisted (names/sizes only in API stub today)
- [ ] Email notifications (Resend/SendGrid/etc. in Netlify function)
- [x] Success/error UX on enquiry (inline error + thank-you step)

## Phase 7: QA + Cutover

- [ ] Visual regression pass against WP baseline
- [ ] Interaction parity pass
- [x] SEO/metadata — `react-helmet-async` + per-route titles/descriptions (`src/seo/`)
- [ ] Full SEO parity (OG images per page, sitemap, hreflang if needed)
- [ ] UAT fixes
- [ ] Launch + hypercare

## Recent additions (infra)

- [x] Skip link + focusable `<main>` for accessibility baseline
- [x] Case study testimonial YouTube embed (optional field on seed)
- [x] `.env.example` for Sanity + WP origin + enquiry URL
