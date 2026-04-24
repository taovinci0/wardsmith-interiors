# Sanity Studio

## Setup

1. `cd sanity-studio`
2. `cp .env.example .env`
3. Fill in `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`
4. `npm install`
5. `npm run dev`

## Seed content

From the Vite app root:

1. Set `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_WRITE_TOKEN`
2. Run `npm run sanity:seed`

This seeds:
- Service pages
- Case studies
- Blog posts

Enquiry submissions are also stored into Sanity by `netlify/functions/enquiry.mjs` when `SANITY_WRITE_TOKEN` is configured in your deploy environment.
