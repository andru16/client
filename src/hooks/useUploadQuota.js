import { useCallback, useEffect, useState } from 'react'
import { fetchUploadQuota } from '../services/photoService'

/**
 * Límites de subida según el API (incluye maxPerBatch y cuota por sesión).
 * Siempre consulta el servidor para mostrar números alineados con el backend.
 */
export function useUploadQuota(sessionId) {
  const [quota, setQuota] = useState(null)

  const refresh = useCallback(async () => {
    try {
      const data = await fetchUploadQuota(sessionId || '')
      setQuota(data)
    } catch {
      setQuota(null)
    }
  }, [sessionId])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { quota, refreshQuota: refresh }
}
