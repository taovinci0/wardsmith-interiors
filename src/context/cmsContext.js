import { createContext } from 'react'

export const CmsContext = createContext({
  loading: false,
  home: null,
  siteSettings: null,
  sanityConfigured: false,
  error: null,
})
