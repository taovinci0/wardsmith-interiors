# Ward-Smith Interiors — Vite frontend (migration)

This folder is the new frontend, built next to the existing WordPress theme under `app/public/wp-content/themes/ward-smith-interiors/`. Nothing in WordPress is removed or replaced until you cut over.

## Requirements

- Node **20** (see `.nvmrc`). Use nvm: `nvm use` inside this directory.

## Commands

```bash
cd vite-sanity-frontend
nvm use
npm install
npm run dev
npm run build
npm run preview
```

### Local enquiry API (optional)

The multi-step form POSTs JSON to `/api/enquiry`. In dev, Vite proxies that path to a tiny Node server:

```bash
# Terminal 1
npm run dev:api

# Terminal 2
npm run dev
```

Or one command: `npm run dev:full` (runs both). Without the API process, submission shows an error until you point `VITE_ENQUIRY_API_URL` at a live endpoint.

### Netlify

`netlify.toml` builds the Vite app, SPA-redirects `/*` to `index.html`, maps `/api/enquiry` → `netlify/functions/enquiry.mjs`, and runs serverless handlers from `netlify/functions/`. Add email delivery (e.g. Resend) inside that function when you are ready.

### Sanity (optional)

Copy `.env.example` to `.env.development` and set `VITE_SANITY_PROJECT_ID` (and dataset if not `production`). The app fetches `homePage` and `siteSettings` documents — see `docs/sanity-schema-notes.md`. With no project id, the UI uses static data only.

## What is implemented

- Vite + React + React Router
- Tailwind CSS v4 with design tokens aligned to the WP theme (see `src/index.css`)
- Adobe Fonts / Typekit stylesheet for Gotham (same kit id as WP: `rxg7sbq`)
- `@sanity/client` + `CmsContext` for homepage hero / process intro overrides
- `react-helmet-async` + route-aware titles/descriptions (`src/seo/`)
- Enquiry form wired to `/api/enquiry` (dev proxy + Netlify function stub)

## Migration docs

- `docs/parity-checklist.md`
- `docs/wp-to-sanity-model-map.md`
- `docs/route-and-seo-map.md`
- `docs/wp-meta-to-sanity-field-map.md`
- `docs/implementation-backlog.md`
- `docs/sanity-schema-notes.md`

Parent plan: `../VITE-SANITY-MIGRATION-PLAN.md`

## Next steps

1. Define full Sanity schemas in Studio and migrate remaining page types (services, case studies, blog).
2. Extend `netlify/functions/enquiry.mjs` with email notifications and optional file storage.
3. Visual regression and SEO review against the WordPress baseline.
