export function parseVideoUrl(url) {
  if (!url) {
    return { type: null, id: null, url: null }
  }

  const shorts = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/)
  if (shorts?.[1]) {
    return { type: 'youtube', id: shorts[1], url }
  }

  const yt = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/,
  )
  if (yt?.[1]) {
    return { type: 'youtube', id: yt[1], url }
  }

  const vim = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/)
  if (vim?.[1]) {
    return { type: 'vimeo', id: vim[1], url }
  }

  return { type: 'self-hosted', id: null, url }
}
