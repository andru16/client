import axios from 'axios'

/**
 * En producción siempre `/api`: en Vercel el proxy lo define `vercel.mjs` → backend.
 * En desarrollo: si pones `VITE_API_URL` en `.env`, Axios va directo al servidor (CORS en el API);
 * si no, usa `/api` con el proxy de Vite (`vite.config.js`).
 */
function resolveApiBase() {
  const raw = import.meta.env.VITE_API_URL?.trim()
  if (import.meta.env.PROD) {
    return '/api'
  }
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
