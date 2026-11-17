import { createQueryStore } from '@sanity/react-loader'
import { getSanityClient } from './sanityClient.js'

/**
 * Client-side query store. Powers useSanityData in production (published content)
 * and, inside the Presentation tool, streams live draft content via useLiveMode.
 */
export const sanityClient = getSanityClient()

// With no client configured (e.g. missing VITE_SANITY_* env), ssr:true is the
// loader's inert mode — ssr:false with client:false throws at import time.
export const { useQuery, useLiveMode } = createQueryStore(
  sanityClient ? { client: sanityClient, ssr: false } : { client: false, ssr: true },
)
