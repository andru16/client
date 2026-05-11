/**
 * Inserta transformaciones de entrega en URLs de Cloudinary para miniaturas
 * ligeras (ancho máximo, calidad y formato automáticos).
 *
 * @param {string} url
 * @param {number} [maxWidth=640]
 */
export function cloudinaryThumbnail(url, maxWidth = 640) {
  if (!url || typeof url !== 'string') return ''
  const marker = '/upload/'
  if (!url.includes('res.cloudinary.com') || !url.includes(marker)) {
    return url
  }
  const transformation = `c_limit,w_${maxWidth},q_auto,f_auto`
  return url.replace(marker, `${marker}${transformation}/`)
}

/**
 * Miniatura JPEG a partir del primer segundo de un vídeo en Cloudinary.
 */
export function cloudinaryVideoPoster(url, maxWidth = 720) {
  if (!url || typeof url !== 'string') return ''
  const marker = '/upload/'
  if (!url.includes('res.cloudinary.com') || !url.includes('/video/upload/')) {
    return url
  }
  if (!url.includes(marker)) return url
  const transformation = `so_0.5,f_jpg,c_limit,w_${maxWidth},q_auto`
  return url.replace(marker, `${marker}${transformation}/`)
}

/**
 * @param {{ kind?: string, imageUrl?: string }} photo
 */
export function isMediaVideo(photo) {
  if (!photo) return false
  if (photo.kind === 'video') return true
  if (photo.kind === 'image') return false
  return typeof photo.imageUrl === 'string' && photo.imageUrl.includes('/video/upload/')
}

/**
 * URL de miniatura en grid (imagen o poster de vídeo).
 */
export function galleryThumbnailUrl(photo, maxWidth = 720) {
  if (!photo?.imageUrl) return ''
  return isMediaVideo(photo)
    ? cloudinaryVideoPoster(photo.imageUrl, maxWidth)
    : cloudinaryThumbnail(photo.imageUrl, maxWidth)
}
