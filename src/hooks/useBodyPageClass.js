import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Sets body classes expected by ported CSS (e.g. `page-contact`, `page-start-your-project`).
 */
export function useBodyPageClass() {
  const { pathname } = useLocation()

  useEffect(() => {
    const add = []

    if (pathname === '/') {
      add.push('home')
    }

    if (pathname === '/contact' || pathname.startsWith('/contact/')) {
      add.push('page-contact')
    }

    if (pathname === '/start-your-project' || pathname.startsWith('/start-your-project/')) {
      add.push('page-start-your-project')
    }

    add.forEach((c) => document.body.classList.add(c))

    return () => {
      add.forEach((c) => document.body.classList.remove(c))
    }
  }, [pathname])
}
