import { useCallback, useEffect, useState } from 'react'
import { fetchPhotos } from '../services/photoService'
import { getFriendlyErrorMessage } from '../utils/httpErrorMessage'

export function usePhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPhotos()
      setPhotos(Array.isArray(data.photos) ? data.photos : [])
    } catch (err) {
      setPhotos([])
      setError(
        getFriendlyErrorMessage(
          err,
          'No pudimos cargar la galería. Verifica la conexión y el servidor.',
        ),
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { photos, setPhotos, loading, error, refresh }
}
