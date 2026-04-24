/**
 * Media URLs for homepage assets.
 *
 * By default, paths are same-origin (e.g. `/wp-content/uploads/...`) so Vite serves
 * files from `public/wp-content/uploads/` — no Local/WordPress server required.
 *
 * Optional: set `VITE_WP_ORIGIN` in `.env` to load media from a running WordPress
 * site instead (e.g. `http://ws-interiors.local`).
 */

function normalizeOrigin(origin) {
  if (!origin) return ''
  return String(origin).replace(/\/$/, '')
}

export function wpOrigin() {
  const fromEnv = import.meta.env.VITE_WP_ORIGIN
  if (fromEnv) return normalizeOrigin(fromEnv)
  return ''
}

/**
 * @param {string} path - begins with /wp-content/... or a full http(s) URL
 */
export function wpMediaUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  const p = path.startsWith('/') ? path : `/${path}`
  const origin = wpOrigin()
  if (origin) return `${origin}${p}`
  return p
}
