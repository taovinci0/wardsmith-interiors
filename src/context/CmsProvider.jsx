import { useEffect, useMemo, useState } from 'react'
import { CmsContext } from './cmsContext.js'
import { getSanityClient, isSanityConfigured } from '../lib/sanityClient.js'
import { homePageQuery, siteSettingsQuery } from '../sanity/queries.js'

export function CmsProvider({ children }) {
  const [loading, setLoading] = useState(Boolean(isSanityConfigured()))
  const [home, setHome] = useState(null)
  const [siteSettings, setSiteSettings] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const client = getSanityClient()
    if (!client) {
      setLoading(false)
      return undefined
    }

    let cancelled = false
    ;(async () => {
      try {
        const [homeDoc, settingsDoc] = await Promise.all([
          client.fetch(homePageQuery).catch(() => null),
          client.fetch(siteSettingsQuery).catch(() => null),
        ])
        if (!cancelled) {
          setHome(homeDoc || null)
          setSiteSettings(settingsDoc || null)
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Sanity fetch failed')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(
    () => ({
      loading,
      home,
      siteSettings,
      sanityConfigured: isSanityConfigured(),
      error,
    }),
    [loading, home, siteSettings, error],
  )

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}
