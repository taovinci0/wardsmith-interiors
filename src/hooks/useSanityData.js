import { isSanityConfigured } from '../lib/sanityClient.js'
import { useQuery } from '../lib/sanityLoader.js'

// Constant for the app's lifetime (env is fixed at build time), so the branch
// below keeps a stable hook order across every render of a given component.
const CONFIGURED = isSanityConfigured()

/**
 * Fetch Sanity data via the live-loader. In production this returns published
 * content; inside the Presentation tool it updates live with draft edits.
 * Returns { data, loading }; callers fall back to static content when data is null.
 */
export function useSanityData(query, params) {
  if (!CONFIGURED) return { data: null, loading: false }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading } = useQuery(query, params ?? {})
  return { data: data ?? null, loading }
}
