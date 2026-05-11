/**
 * Mensaje legible a partir de errores de Axios u otros.
 */
export function getFriendlyErrorMessage(err, fallback = 'Algo salió mal. Intenta de nuevo.') {
  if (!err) return fallback
  const data = err.response?.data
  if (typeof data === 'string' && data.trimStart().toLowerCase().startsWith('<!')) {
    const status = err.response?.status
    return `El servidor respondió con una página HTML (${status ?? '?'}) en lugar de JSON. Suele pasar si la petición va al sitio estático (p. ej. Vercel) y no al API Node, o si falta el prefijo /api en la URL base. Comprueba VITE_API_URL (debe ser como http://localhost:5000/api o tu URL de Render …/api) o deja VITE_API_URL vacío en local para usar el proxy de Vite.`
  }
  if (data && typeof data.message === 'string' && data.message.trim()) {
    return data.message.trim()
  }
  if (typeof err.message === 'string' && err.message.trim()) {
    return err.message.trim()
  }
  return fallback
}
