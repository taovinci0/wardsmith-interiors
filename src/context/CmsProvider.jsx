import { useMemo } from 'react'
import { CmsContext } from './cmsContext.js'
import { isSanityConfigured } from '../lib/sanityClient.js'
import { useQuery } from '../lib/sanityLoader.js'
import { homePageQuery, siteSettingsQuery } from '../sanity/queries.js'

/**
 * Sanity-configured branch fetches through the live query store so the
 * homepage/site settings participate in Presentation draft streaming.
 * The branch is stable for the app's lifetime (env is fixed at build time).
 */
function CmsProviderLive({ children }) {
  const { data: home, loading: homeLoading } = useQuery(homePageQuery)
  const { data: siteSettings, loading: settingsLoading } = useQuery(siteSettingsQuery)

  const value = useMemo(
    () => ({
      loading: Boolean(homeLoading || settingsLoading),
      home: home ?? null,
      siteSettings: siteSettings ?? null,
      sanityConfigured: true,
      error: null,
    }),
    [home, siteSettings, homeLoading, settingsLoading],
  )

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}

const STATIC_VALUE = {
  loading: false,
  home: null,
  siteSettings: null,
  sanityConfigured: false,
  error: null,
}

export function CmsProvider({ children }) {
  if (!isSanityConfigured()) {
    return <CmsContext.Provider value={STATIC_VALUE}>{children}</CmsContext.Provider>
  }
  return <CmsProviderLive>{children}</CmsProviderLive>
}
