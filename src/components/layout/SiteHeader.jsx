import { Link, NavLink, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import clsx from 'clsx'
import { primaryNav, siteLogoUrl, siteName } from '../../data/siteDefaults.js'
import { useHeaderScrolled } from '../../hooks/useHeaderScrolled.js'
import { useMobileMenu } from '../../hooks/useMobileMenu.js'

function isActivePath(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function SiteHeader() {
  const scrolled = useHeaderScrolled()
  const { pathname } = useLocation()
  const { open, toggle, closeMenu } = useMobileMenu()

  return (
    <header
      id="masthead"
      className={clsx('site-header absolute left-0 top-0 z-20 w-full', scrolled && 'scrolled')}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between pb-6 pt-[15px]">
          <div className="site-logo shrink-0">
            <Link to="/" className="custom-logo-link no-underline" rel="home">
              <img
                src={siteLogoUrl}
                alt={siteName}
                className="custom-logo"
                width={200}
                height={48}
                decoding="async"
              />
            </Link>
          </div>

          <nav className="site-navigation flex items-center gap-10 xl:gap-14" role="navigation" aria-label="Primary Menu">
            <ul id="primary-menu" className="m-0 flex list-none items-center gap-8 p-0 xl:gap-12">
              {primaryNav.map((item) => (
                <li key={item.label} className={clsx('m-0', isActivePath(pathname, item.to) && 'current-menu-item')}>
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>

            <Link to="/contact" className="btn-outline whitespace-nowrap">
              Book a consultation
            </Link>
          </nav>

          <button
            id="mobile-menu-toggle"
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle Mobile Menu"
            aria-expanded={open}
            onClick={toggle}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu-overlay"
        className="mobile-menu-overlay"
        role="presentation"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu()
        }}
      >
        <div className="mobile-menu-container">
          <button
            id="mobile-menu-close"
            type="button"
            className="mobile-menu-close"
            aria-label="Close Mobile Menu"
            onClick={closeMenu}
          >
            <X className="h-8 w-8" strokeWidth={1} aria-hidden />
          </button>

          <nav className="mobile-navigation" aria-label="Mobile Menu">
            <ul id="mobile-primary-menu" className="mobile-menu-list">
              {primaryNav.map((item) => (
                <li key={item.label} className="m-0">
                  <Link to={item.to} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="m-0">
                <Link to="/contact" onClick={closeMenu}>
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mobile-menu-cta">
              <Link to="/contact" className="btn-primary" onClick={closeMenu}>
                Book a consultation
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
