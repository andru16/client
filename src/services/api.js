import axios from 'axios'

/**
 * Base del API: siempre debe terminar en `/api` (rutas Express bajo `app.use('/api', …)`).
 * Si defines solo el host (p. ej. `http://localhost:5000`), se añade `/api` solo.
 */
function resolveApiBase() {
  const raw = import.meta.env.VITE_API_URL?.trim()
  if (!raw) {
    if (import.meta.env.PROD) {
      // Mismo host + /api en Vercel (SPA) suele responder 405 al POST; el API debe ser otra URL.
      console.error(
        '[api] Falta VITE_API_URL en el build. Define en Vercel (proyecto del cliente) la URL del backend, p. ej. VITE_API_URL=https://tu-server.vercel.app',
      )
    }
    return '/api'
  }
  let base = raw.replace(/\/$/, '')
  if (/^https?:\/\//i.test(base) && !base.endsWith('/api')) {
    base = `${base}/api`
  }
  if (import.meta.env.PROD && /^https?:\/\/(localhost|127\.0\.0\.1)/i.test(base)) {
    console.error(
      '[api] VITE_API_URL apunta a localhost en producción; el navegador no alcanzará tu API. Corrige la variable en el despliegue del cliente.',
    )
  }
  return base
}

const baseURL = resolveApiBase()

export const api = axios.create({
  baseURL,
  timeout: 12000,
  headers: { Accept: 'application/json' },
})
