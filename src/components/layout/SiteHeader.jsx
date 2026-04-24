import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import clsx from 'clsx'
import { primaryNav, serviceCards, siteLogoUrl, siteName } from '../../data/siteDefaults.js'
import { useHeaderScrolled } from '../../hooks/useHeaderScrolled.js'
import { useMobileMenu } from '../../hooks/useMobileMenu.js'

function isActivePath(pathname, to, hasMega) {
  if (hasMega) {
    return pathname === '/services' || pathname.startsWith('/services/')
  }
  if (to === '/') {
    return pathname === '/'
  }
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function SiteHeader() {
  const scrolled = useHeaderScrolled()
  const { pathname } = useLocation()
  const { open, toggle, closeMenu } = useMobileMenu()
  const [mobileMegaOpen, setMobileMegaOpen] = useState(false)

  return (
    <header
      id="masthead"
      className={clsx(
        'site-header absolute left-0 top-0 z-20 w-full',
        scrolled && 'scrolled',
      )}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between pb-6 pt-[15px]">
          <div className="site-logo">
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

          <nav
            className="site-navigation flex items-center gap-16"
            role="navigation"
            aria-label="Primary Menu"
          >
            <ul id="primary-menu" className="m-0 flex list-none items-center gap-16 p-0">
              {primaryNav.map((item) => {
                const active = isActivePath(pathname, item.to, item.hasMega)

                if (item.hasMega) {
                  return (
                    <li
                      key={item.label}
                      className={clsx(
                        'menu-item-has-mega has-mega-menu m-0',
                        active && 'current-menu-item',
                      )}
                    >
                      <NavLink to={item.to}>
                        {item.label}
                        <span className="dropdown-indicator inline-flex items-center">
                          <ChevronDown className="h-4 w-4" strokeWidth={1} aria-hidden />
                        </span>
                      </NavLink>
                      <div className="mega-menu services-mega-menu">
                        <div className="mega-menu-container">
                          <div
                            className="services-grid"
                            data-service-count={serviceCards.length}
                            style={{
                              gridTemplateColumns: `repeat(${serviceCards.length}, minmax(0, 1fr))`,
                            }}
                          >
                            {serviceCards.map((s) => (
                              <Link
                                key={s.slug}
                                to={`/services/${s.slug}`}
                                className="service-card-link"
                              >
                                <div className="service-card">
                                  <div className="service-card-image">
                                    <img
                                      src={
                                        s.imageUrl ||
                                        `https://placehold.co/600x450/E8E6E1/224A4F?text=${encodeURIComponent(s.title)}`
                                      }
                                      alt=""
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="service-card-content">
                                    <h4 className="service-card-title">{s.title}</h4>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                }

                return (
                  <li
                    key={item.label}
                    className={clsx('m-0', active && 'current-menu-item')}
                  >
                    <NavLink to={item.to}>{item.label}</NavLink>
                  </li>
                )
              })}
            </ul>

            <Link to="/start-your-project" className="btn-outline">
              Start Your Project
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
              {primaryNav.map((item) => {
                if (item.hasMega) {
                  return (
                    <li
                      key={item.label}
                      className={clsx(
                        'has-mega-menu m-0',
                        mobileMegaOpen && 'mobile-mega-menu-open',
                      )}
                    >
                      <a
                        href="/services"
                        onClick={(e) => {
                          e.preventDefault()
                          setMobileMegaOpen((v) => !v)
                        }}
                      >
                        {item.label}
                        <span className="dropdown-indicator inline-flex items-center">
                          <ChevronDown className="h-4 w-4" strokeWidth={1} aria-hidden />
                        </span>
                      </a>
                      <div className="mega-menu services-mega-menu">
                        <div className="mega-menu-container">
                          <div className="services-grid">
                            {serviceCards.map((s) => (
                              <Link
                                key={s.slug}
                                to={`/services/${s.slug}`}
                                className="service-card-link"
                                onClick={() => {
                                  closeMenu()
                                  setMobileMegaOpen(false)
                                }}
                              >
                                <div className="service-card">
                                  <div className="service-card-image">
                                    <img
                                      src={
                                        s.imageUrl ||
                                        `https://placehold.co/400x300/E8E6E1/224A4F?text=${encodeURIComponent(s.title)}`
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="service-card-content">
                                    <h4 className="service-card-title">{s.title}</h4>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                }

                return (
                  <li key={item.label} className="m-0">
                    <Link to={item.to} onClick={closeMenu}>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mobile-menu-cta">
              <Link to="/start-your-project" className="btn-primary" onClick={closeMenu}>
                Start Your Project
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
