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

function logApiFailure(error) {
  const cfg = error.config
  const method = (cfg?.method || 'GET').toUpperCase()
  let fullUrl = '(sin URL)'
  try {
    fullUrl = cfg ? axios.getUri(cfg) : fullUrl
  } catch {
    fullUrl = cfg?.baseURL && cfg?.url ? `${cfg.baseURL}${cfg.url}` : fullUrl
  }

  if (error.response) {
    const { status, statusText, data } = error.response
    // eslint-disable-next-line no-console
    console.error('[api] Respuesta de error del servidor', {
      method,
      url: fullUrl,
      status,
      statusText,
      body: data,
    })
    return
  }

  if (error.request) {
    // eslint-disable-next-line no-console
    console.error('[api] Sin respuesta (red, CORS, proxy o servidor caído)', {
      method,
      url: fullUrl,
      code: error.code,
      message: error.message,
    })
    return
  }

  // eslint-disable-next-line no-console
  console.error('[api] Error al preparar la petición', {
    method,
    url: fullUrl,
    message: error.message,
  })
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    logApiFailure(error)
    return Promise.reject(error)
  },
)
