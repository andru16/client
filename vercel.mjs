/**
 * Configuración Vercel del FRONT: proxy de `/api/*` hacia el backend.
 * Así el navegador solo habla con `*.vercel.app` (sin CORS extra) y Vercel reenvía al API.
 *
 * Define en el proyecto del cliente (Production + Preview):
 *   VITE_API_URL=https://tu-backend.vercel.app
 * (con o sin `/api` al final; debe ser https público.)
 */
function backendHttpsOrigin() {
  const raw = process.env.VITE_API_URL?.trim()
  if (!raw) return ''
  let u = raw.replace(/\/$/, '')
  if (u.toLowerCase().endsWith('/api')) u = u.slice(0, -4)
  if (!/^https:\/\//i.test(u)) return ''
  return u.replace(/\/$/, '')
}

const apiOrigin = backendHttpsOrigin()

const rewrites = []
if (apiOrigin) {
  rewrites.push(
    { source: '/api/:path*', destination: `${apiOrigin}/api/:path*` },
    { source: '/api', destination: `${apiOrigin}/api` },
  )
}
rewrites.push({ source: '/(.*)', destination: '/index.html' })

export const config = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  framework: 'vite',
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  rewrites,
}

const failIfMissingBackend =
  process.env.VERCEL === '1' &&
  process.env.VERCEL_ENV !== 'development' &&
  !apiOrigin

if (failIfMissingBackend) {
  throw new Error(
    '[client/vercel.mjs] Falta VITE_API_URL (URL HTTPS del servidor API). ' +
      'En Vercel → proyecto del cliente → Settings → Environment Variables (Production y Preview). ' +
      'Ejemplo: VITE_API_URL=https://tu-api.vercel.app',
  )
}
