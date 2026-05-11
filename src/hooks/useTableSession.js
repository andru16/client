import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const STORAGE_TABLE = 'wonderland-table-slug'
const STORAGE_SESSION = 'wonderland-upload-session'

function normalizeTableSlug(raw) {
  if (!raw) return ''
  const normalized = raw.replace(/\s+/g, '-').toLowerCase()
  if (!/^[a-z0-9]([a-z0-9_-]{0,62}[a-z0-9])?$/i.test(normalized)) return ''
  return normalized
}

function prettyLabel(slug) {
  if (!slug) return ''
  return slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Lee ?table= de la URL, persiste en sessionStorage para el resto de la visita
 * y expone un id de sesión estable para correlación en backend.
 */
export function useTableSession() {
  const [params] = useSearchParams()

  const [sessionId] = useState(() => {
    if (typeof window === 'undefined') return ''
    let id = sessionStorage.getItem(STORAGE_SESSION)
    if (!id) {
      id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `sess-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
      sessionStorage.setItem(STORAGE_SESSION, id)
    }
    return id
  })

  const tableSlug = useMemo(() => {
    const fromUrl = normalizeTableSlug(params.get('table') ?? '')
    if (fromUrl) return fromUrl
    if (typeof window !== 'undefined') {
      const stored = normalizeTableSlug(sessionStorage.getItem(STORAGE_TABLE) ?? '')
      if (stored) return stored
    }
    return ''
  }, [params])

  useEffect(() => {
    const fromUrl = normalizeTableSlug(params.get('table') ?? '')
    if (fromUrl) {
      sessionStorage.setItem(STORAGE_TABLE, fromUrl)
    }
  }, [params])

  const tableLabel = useMemo(() => prettyLabel(tableSlug), [tableSlug])

  return { tableSlug, tableLabel, sessionId }
}
