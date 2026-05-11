import { api } from './api'
import { CLIENT_UPLOAD_CHUNK } from '../constants/uploadLimits.js'

const UPLOAD_TIMEOUT_MS = 900000
/** Subidas en tandas pequeñas: menos riesgo de timeout o UI congelada con vídeos pesados. */
const UPLOAD_BATCH_SIZE = CLIENT_UPLOAD_CHUNK

/**
 * @returns {Promise<{ photos: object[] }>}
 */
export async function fetchPhotos() {
  const { data } = await api.get('/photos')
  return data
}

/**
 * Cuota de subidas por dispositivo/sesión (ventana móvil en servidor).
 * @param {string} uploadSessionId
 */
export async function fetchUploadQuota(uploadSessionId) {
  const { data } = await api.get('/photos/quota', {
    params: { uploadSessionId: uploadSessionId || '' },
  })
  return data
}

/**
 * @param {File[]} files
 * @param {object} [options]
 * @param {string} [options.uploadedFrom]
 * @param {string} [options.table] slug de mesa (?table=)
 * @param {string} [options.deviceInfo]
 * @param {string} [options.uploadSessionId]
 * @param {(percent: number) => void} [options.onProgress]
 */
export async function uploadPhotos(files, options = {}) {
  const {
    uploadedFrom = '',
    table = '',
    deviceInfo = '',
    uploadSessionId = '',
    onProgress,
  } = options

  const formData = new FormData()
  files.forEach((file) => formData.append('images', file))
  if (uploadedFrom?.trim()) formData.append('uploadedFrom', uploadedFrom.trim())
  if (table?.trim()) formData.append('table', table.trim())
  if (deviceInfo?.trim()) formData.append('deviceInfo', deviceInfo.trim())
  if (uploadSessionId?.trim()) formData.append('uploadSessionId', uploadSessionId.trim())

  const { data } = await api.post('/photos/upload', formData, {
    timeout: UPLOAD_TIMEOUT_MS,
    onUploadProgress: (event) => {
      if (!onProgress || !event.total) return
      const percent = Math.round((event.loaded * 100) / event.total)
      onProgress(Math.min(100, percent))
    },
  })
  return data
}

/**
 * Sube muchos archivos en tandas (menos memoria y UI más fluida que un solo POST enorme).
 * @param {File[]} files
 * @param {object} options
 * @param {(overallPercent: number) => void} [options.onProgress] 0–100 global
 */
export async function uploadPhotosInBatches(files, options = {}) {
  const { onProgress, ...rest } = options
  const allPhotos = []
  const batches = Math.ceil(files.length / UPLOAD_BATCH_SIZE) || 1

  for (let b = 0; b < batches; b++) {
    const start = b * UPLOAD_BATCH_SIZE
    const chunk = files.slice(start, start + UPLOAD_BATCH_SIZE)
    const data = await uploadPhotos(chunk, {
      ...rest,
      onProgress: (p) => {
        if (!onProgress) return
        const base = (b / batches) * 100
        const slice = (1 / batches) * (p / 100) * 100
        onProgress(Math.min(99, Math.round(base + slice)))
      },
    })
    if (Array.isArray(data?.photos)) allPhotos.push(...data.photos)
  }

  onProgress?.(100)
  return {
    photos: allPhotos,
    message:
      allPhotos.length === 1
        ? '1 archivo guardado en el jardín de recuerdos.'
        : `${allPhotos.length} archivos guardados en el jardín de recuerdos.`,
  }
}

/**
 * @param {string} id
 */
export async function deletePhoto(id) {
  const { data } = await api.delete(`/photos/${id}`)
  return data
}
