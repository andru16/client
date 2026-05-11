import { api } from './api'

const ZIP_TIMEOUT_MS = 600000

/**
 * @returns {Promise<{
 *   totalPhotos: number,
 *   latestUploads: object[],
 *   lastUploadDate: string | null,
 *   estimatedStorageBytes: number,
 *   knownStorageBytes: number,
 *   photosWithoutSize: number
 * }>}
 */
export async function fetchAdminStats() {
  const { data } = await api.get('/admin/stats')
  return data
}

/**
 * Analytics: fotos por mesa, totales y últimas subidas.
 */
export async function fetchAdminAnalytics() {
  const { data } = await api.get('/admin/analytics')
  return data
}

export async function deleteAdminPhoto(id) {
  const { data } = await api.delete(`/admin/photo/${id}`)
  return data
}

function filenameFromDisposition(header) {
  if (!header || typeof header !== 'string') return null
  const star = /filename\*=UTF-8''([^;]+)/i.exec(header)
  if (star?.[1]) {
    try {
      return decodeURIComponent(star[1].trim())
    } catch {
      return star[1].trim()
    }
  }
  const plain = /filename="([^"]+)"/i.exec(header)
  return plain?.[1] ?? null
}

/**
 * Descarga el ZIP generado en el servidor (streaming → blob en el cliente).
 * @param {{ onProgress?: (n: number) => void }} [opts]
 */
export async function downloadAllRecuerdosZip({ onProgress } = {}) {
  const response = await api.get('/photos/download-all', {
    responseType: 'blob',
    timeout: ZIP_TIMEOUT_MS,
    onDownloadProgress: (event) => {
      if (!onProgress || !event.total) return
      onProgress(Math.min(100, Math.round((event.loaded * 100) / event.total)))
    },
  })

  const blob = response.data
  const name =
    filenameFromDisposition(response.headers['content-disposition']) ||
    'wonderland-recuerdos.zip'

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
