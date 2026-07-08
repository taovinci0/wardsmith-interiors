import { createQueryStore } from '@sanity/react-loader'
import { getSanityClient } from './sanityClient.js'

/**
 * Client-side query store. Powers useSanityData in production (published content)
 * and, inside the Presentation tool, streams live draft content via useLiveMode.
 */
export const sanityClient = getSanityClient()

export const { useQuery, useLiveMode } = createQueryStore({
  client: sanityClient || false,
  ssr: false,
})
