import { useEffect, useState } from 'react'
import { api } from '../services/api'

/**
 * Comprueba el endpoint de salud del backend (útil para validar CORS y despliegue).
 * No bloquea la UI si el servidor no está disponible.
 */
export function useApiHealth() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function ping() {
      try {
        const { data } = await api.get('/health')
        if (!cancelled && data?.status === 'ok') setStatus('ok')
        else if (!cancelled) setStatus('unknown')
      } catch (e) {
        if (!cancelled) {
          setStatus('error')
          setError(e)
        }
      }
    }

    ping()
    return () => {
      cancelled = true
    }
  }, [])

  return { status, error }
}
