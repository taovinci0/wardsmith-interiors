import { createClient } from '@sanity/client/stega'

export const STUDIO_URL = 'https://wardsmith.sanity.studio'

/**
 * Browser-safe Sanity client. Returns null when env is not configured (static fallbacks only).
 * Uses the stega-capable client so Presentation / Visual Editing overlays work in preview.
 * Stega encoding stays OFF in production (clean text); it is only active inside the
 * Presentation tool, where the studio streams encoded draft content over the live channel.
 */
export function getSanityClient() {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
  if (!projectId) return null

  return createClient({
    projectId,
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: import.meta.env.VITE_SANITY_USE_CDN !== 'false',
    stega: {
      studioUrl: STUDIO_URL,
    },
  })
}

export function isSanityConfigured() {
  return Boolean(import.meta.env.VITE_SANITY_PROJECT_ID)
}
