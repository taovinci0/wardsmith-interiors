import { useCallback, useEffect, useState } from 'react'

/**
 * Mobile menu open state + body scroll lock (matches mobile-menu.js behavior).
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false)

  const openMenu = useCallback(() => setOpen(true), [])
  const closeMenu = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((o) => !o), [])

  useEffect(() => {
    const body = document.body

    if (open) {
      body.classList.add('mobile-menu-open')
      if (window.innerWidth < 1024) {
        const scrollY = window.scrollY
        body.dataset.scrollLockY = String(scrollY)
        body.style.position = 'fixed'
        body.style.top = `-${scrollY}px`
        body.style.width = '100%'
      }
    } else {
      body.classList.remove('mobile-menu-open')
      const y = body.dataset.scrollLockY
      if (y !== undefined) {
        body.style.position = ''
        body.style.top = ''
        body.style.width = ''
        delete body.dataset.scrollLockY
        window.scrollTo(0, parseInt(y, 10) || 0)
      }
    }

    return () => {
      body.classList.remove('mobile-menu-open')
      const y = body.dataset.scrollLockY
      if (y !== undefined) {
        body.style.position = ''
        body.style.top = ''
        body.style.width = ''
        delete body.dataset.scrollLockY
        window.scrollTo(0, parseInt(y, 10) || 0)
      }
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeMenu])

  return { open, openMenu, closeMenu, toggle }
}
