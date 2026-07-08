import { VisualEditing, useIsPresentationTool } from '@sanity/visual-editing/react'
import { sanityClient, useLiveMode } from '../lib/sanityLoader.js'

/**
 * Mounted once (when Sanity is configured). Inside Sanity's Presentation tool it
 * streams live draft content into the loader and renders click-to-edit overlays.
 * Outside Presentation (normal visitors) it is idle and renders nothing.
 */
export function SanityPreview() {
  const isPresentation = useIsPresentationTool()
  useLiveMode({ client: sanityClient })
  return isPresentation ? <VisualEditing /> : null
}
