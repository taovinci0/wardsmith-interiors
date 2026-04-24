import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { parseVideoUrl } from '../../utils/videoEmbed.js'

export function VideoModal({ open, onClose, videoUrl }) {
  const parsed = parseVideoUrl(videoUrl)

  useEffect(() => {
    if (!open) return undefined
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  let iframeSrc = ''
  if (parsed.type === 'youtube' && parsed.id) {
    iframeSrc = `https://www.youtube.com/embed/${parsed.id}?autoplay=1&rel=0`
  } else if (parsed.type === 'vimeo' && parsed.id) {
    iframeSrc = `https://player.vimeo.com/video/${parsed.id}?autoplay=1&title=0&byline=0&portrait=0`
  } else if (parsed.url) {
    iframeSrc = parsed.url
  }

  const modal = (
    <div
      className="fixed inset-0 z-[99999] bg-black/85"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="fixed left-1/2 top-1/2 w-[90%] max-w-5xl -translate-x-1/2 -translate-y-1/2 bg-black pt-[56.25%]">
        <button
          type="button"
          className="absolute right-5 top-5 z-[100000] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white"
          aria-label="Close video"
          onClick={onClose}
        >
          <svg width="24" height="24" fill="none" stroke="#224A4F" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="absolute inset-0">
          {iframeSrc ? (
            <iframe
              title="Video"
              src={iframeSrc}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
