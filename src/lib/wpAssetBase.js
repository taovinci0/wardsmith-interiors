/**
 * Media URLs for homepage assets.
 *
 * By default, media resolves to `/media/...` so the frontend has no WordPress-style
 * public paths in use. Existing imported WP paths are mapped automatically.
 *
 * Optional: set `VITE_WP_ORIGIN` in `.env` to load media from a running WordPress
 * site instead (e.g. `http://ws-interiors.local`).
 */

function normalizeOrigin(origin) {
  if (!origin) return ''
  return String(origin).replace(/\/$/, '')
}

export function wpOrigin() {
  const fromEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_WP_ORIGIN : ''
  if (fromEnv) return normalizeOrigin(fromEnv)
  return ''
}

function normalizeMediaPath(path) {
  if (!path) return ''
  let p = path
  // Convert full URLs to path-only when possible.
  if (/^https?:\/\//i.test(p)) {
    try {
      p = new URL(p).pathname
    } catch {
      return p
    }
  }
  if (!p.startsWith('/')) p = `/${p}`
  // Keep media namespace neutral and independent from WP naming.
  if (p.startsWith('/wp-content/uploads/')) {
    return p.replace('/wp-content/uploads/', '/media/')
  }
  return p
}

/**
 * @param {string} path - begins with /wp-content/... or a full http(s) URL
 */
export function wpMediaUrl(path) {
  if (!path) return ''
  const p = normalizeMediaPath(path)
  if (/^https?:\/\//i.test(p)) return p
  const origin = wpOrigin()
  if (origin) return `${origin}${p}`
  return p
}
