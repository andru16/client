/**
 * Formato legible para estimaciones de almacenamiento.
 */
export function formatBytes(bytes) {
  const n = Number(bytes)
  if (!Number.isFinite(n) || n <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let v = n
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i += 1
  }
  const decimals = i === 0 ? 0 : 1
  return `${v.toFixed(decimals)} ${units[i]}`
}
