import { VisualEditing } from '@sanity/visual-editing/react'
import { sanityClient, useLiveMode } from '../lib/sanityLoader.js'

/**
 * Mounted once (when Sanity is configured). `<VisualEditing>` establishes the
 * connection to Sanity's Presentation tool and, inside it, renders click-to-edit
 * overlays; `useLiveMode` streams live draft content into the loader. Both
 * self-detect Presentation and stay idle for normal visitors — so this must be
 * rendered unconditionally (gating it on "am I in Presentation?" would deadlock,
 * since the connection is what makes that true).
 */
export function SanityPreview() {
  useLiveMode({ client: sanityClient })
  return <VisualEditing />
}
