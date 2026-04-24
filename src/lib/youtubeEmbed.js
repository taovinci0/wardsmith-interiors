/**
 * Extract YouTube video id from common URL shapes (watch, embed, shorts, youtu.be).
 */
export function getYoutubeVideoId(url) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()
  const shorts = trimmed.match(/youtube\.com\/shorts\/([^?&#/]+)/i)
  if (shorts?.[1]) return shorts[1]
  const embed = trimmed.match(/youtube\.com\/embed\/([^?&#/]+)/i)
  if (embed?.[1]) return embed[1]
  const watch = trimmed.match(/[?&]v=([^?&#]+)/i)
  if (watch?.[1]) return watch[1]
  const be = trimmed.match(/youtu\.be\/([^?&#/]+)/i)
  if (be?.[1]) return be[1]
  return null
}

export function getYoutubeEmbedSrc(url) {
  const id = getYoutubeVideoId(url)
  if (!id) return null
  return `https://www.youtube.com/embed/${id}?rel=0`
}
