import { VisualEditing } from '@sanity/visual-editing/react'
import { STUDIO_URL } from '../lib/sanityClient.js'
import { sanityClient, useLiveMode } from '../lib/sanityLoader.js'

// Stega-enabled client for live mode only: encodes edit-source metadata into
// strings so Presentation can show click-to-edit overlays and detect documents
// on the page. Production traffic keeps the non-encoding client.
const liveClient = sanityClient
  ? sanityClient.withConfig({ stega: { enabled: true, studioUrl: STUDIO_URL } })
  : null

/**
 * Mounted once (when Sanity is configured). `<VisualEditing>` establishes the
 * connection to Sanity's Presentation tool and, inside it, renders click-to-edit
 * overlays; `useLiveMode` streams live draft content into the loader. Both
 * self-detect Presentation and stay idle for normal visitors — so this must be
 * rendered unconditionally (gating it on "am I in Presentation?" would deadlock,
 * since the connection is what makes that true).
 */
export function SanityPreview() {
  useLiveMode({ client: liveClient })
  return <VisualEditing />
}
