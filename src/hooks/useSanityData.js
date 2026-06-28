import { useEffect, useState } from 'react'
import { getSanityClient, isSanityConfigured } from '../lib/sanityClient.js'

/**
 * Generic Sanity fetch hook. Returns { data, loading }.
 * When Sanity is not configured the hook is a no-op (data stays null), so callers
 * can fall back to their static content.
 */
export function useSanityData(query, params) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(isSanityConfigured()))
  const paramsKey = JSON.stringify(params || null)

  useEffect(() => {
    const client = getSanityClient()
    if (!client) {
      setLoading(false)
      return undefined
    }
    let cancelled = false
    setLoading(true)
    client
      .fetch(query, params || {})
      .then((res) => {
        if (!cancelled) {
          setData(res)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, paramsKey])

  return { data, loading }
}
