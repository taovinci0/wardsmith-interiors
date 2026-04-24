import { createClient } from '@sanity/client'

/**
 * Browser-safe Sanity client. Returns null when env is not configured (static fallbacks only).
 */
export function getSanityClient() {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
  if (!projectId) return null

  return createClient({
    projectId,
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: import.meta.env.VITE_SANITY_USE_CDN !== 'false',
  })
}

export function isSanityConfigured() {
  return Boolean(import.meta.env.VITE_SANITY_PROJECT_ID)
}
