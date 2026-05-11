/**
 * Configuración Vercel del FRONT: proxy de `/api/*` hacia el backend.
 *
 * En Vercel → proyecto del cliente → Environment Variables (Production y Preview):
 *   VITE_API_URL=https://tu-backend.vercel.app
 * (con o sin `/api`; debe ser https en producción para el destino del rewrite.)
 *
 * Sin esta variable el build **sí termina**, pero las peticiones a `/api/*` van al SPA
 * y los POST pueden devolver 405 hasta que la definas y vuelvas a desplegar.
 */
function backendHttpsOrigin() {
  const raw = process.env.VITE_API_URL?.trim()
  if (!raw) {
    if (process.env.VERCEL === '1') {
      // eslint-disable-next-line no-console
      console.warn(
        '[vercel.mjs] Falta VITE_API_URL: no hay proxy /api → backend. ' +
          'Añádela en Settings → Environment Variables y redeploy.',
      )
    }
    return ''
  }
  let u = raw.replace(/\/$/, '')
  if (u.toLowerCase().endsWith('/api')) u = u.slice(0, -4)
  if (!/^https:\/\//i.test(u)) {
    // eslint-disable-next-line no-console
    console.warn(
      '[vercel.mjs] VITE_API_URL debe ser HTTPS para el rewrite (ej. https://tu-api.vercel.app). Valor ignorado:',
      raw,
    )
    return ''
  }
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
