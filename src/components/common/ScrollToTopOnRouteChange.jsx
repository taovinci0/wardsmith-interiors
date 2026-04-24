import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Keep SPA navigation feeling like full page loads.
 * Scroll to top on every pathname change.
 */
export function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

