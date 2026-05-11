import axios from 'axios'

/**
 * Base del API: siempre debe terminar en `/api` (rutas Express bajo `app.use('/api', …)`).
 * Si defines solo el host (p. ej. `http://localhost:5000`), se añade `/api` solo.
 */
function resolveApiBase() {
  const raw = import.meta.env.VITE_API_URL?.trim()
  if (!raw) return '/api'
  let base = raw.replace(/\/$/, '')
  if (/^https?:\/\//i.test(base) && !base.endsWith('/api')) {
    base = `${base}/api`
  }
  return base
}

const baseURL = resolveApiBase()

export const api = axios.create({
  baseURL,
  timeout: 12000,
  headers: { Accept: 'application/json' },
})
