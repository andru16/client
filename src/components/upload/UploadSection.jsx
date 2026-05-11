import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CLIENT_UPLOAD_CHUNK,
  MAX_FILES_PER_BATCH,
  MAX_GUEST_SELECTION,
} from '../../constants/uploadLimits'
import { uploadPhotosInBatches } from '../../services/photoService'
import { getFriendlyErrorMessage } from '../../utils/httpErrorMessage'
import UploadSuccessOverlay from './UploadSuccessOverlay'
import WonderlandFormCorners from '../guest/WonderlandFormCorners'

const ACCEPT_IMAGE = 'image/jpeg,image/png,image/webp,image/gif'
const ACCEPT_VIDEO = 'video/mp4,video/webm,video/quicktime'
const ACCEPT = `${ACCEPT_IMAGE},${ACCEPT_VIDEO}`

const MAX_BYTES_IMAGE = 15 * 1024 * 1024
const MAX_BYTES_VIDEO = 120 * 1024 * 1024
function maxBytesForFile(file) {
  if (ACCEPT_VIDEO.split(',').includes(file.type)) return MAX_BYTES_VIDEO
  if (ACCEPT_IMAGE.split(',').includes(file.type)) return MAX_BYTES_IMAGE
  return 0
}

function validateFiles(fileList) {
  const arr = Array.from(fileList)
  const errors = []
  const ok = []
  for (const file of arr) {
    const cap = maxBytesForFile(file)
    if (!cap) {
      errors.push(
        `«${file.name}»: solo JPG, PNG, WebP, GIF, MP4, WebM o MOV.`,
      )
      continue
    }
    if (file.size > cap) {
      const mb = Math.round(cap / (1024 * 1024))
      errors.push(`«${file.name}» supera el máximo de ${mb} MB para este tipo.`)
      continue
    }
    ok.push(file)
  }
  return { ok, errors }
}

/**
 * @param {object} props
 * @param {() => void} [props.onUploaded]
 * @param {string} [props.tableSlug]
 * @param {string} [props.sessionId]
 * @param {{ unlimited?: boolean, limit: number | null, used: number, remaining: number | null, maxPerBatch: number, windowHours: number } | null} [props.quota]
 * @param {() => void} [props.onQuotaRefresh]
 */
export default function UploadSection({
  onUploaded,
  tableSlug = '',
  sessionId = '',
  quota = null,
  onQuotaRefresh,
}) {
  const inputRef = useRef(null)
  const itemsRef = useRef([])
  const [items, setItems] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState(0)
  const [batchLabel, setBatchLabel] = useState('')
  const [error, setError] = useState(null)
  const [successOpen, setSuccessOpen] = useState(false)
  const [successCount, setSuccessCount] = useState(0)

  const maxSelectable = useMemo(() => {
    const unlimited = quota?.unlimited === true || quota?.limit == null
    if (unlimited) return MAX_GUEST_SELECTION
    const rem = typeof quota?.remaining === 'number' ? quota.remaining : 0
    return Math.min(MAX_GUEST_SELECTION, Math.max(0, rem))
  }, [quota])

  const revokePreviews = useCallback((list) => {
    list.forEach((i) => {
      if (i.previewUrl) URL.revokeObjectURL(i.previewUrl)
    })
  }, [])

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  useEffect(() => {
    return () => revokePreviews(itemsRef.current)
  }, [revokePreviews])

  const mergeFiles = useCallback(
    (incoming) => {
      setError(null)
      const { ok, errors } = validateFiles(incoming)
      if (errors.length) {
        setError(errors.slice(0, 3).join(' '))
      }
      if (!ok.length) return

      setItems((prev) => {
        const next = [...prev]
        const room = maxSelectable - next.length
        if (room <= 0) {
          setError(
            maxSelectable === 0
              ? 'Has alcanzado el límite de subidas en este dispositivo por ahora. Vuelve más tarde o usa otro navegador si lo permiten los anfitriones.'
              : `Solo puedes añadir hasta ${maxSelectable} archivo(s) en esta selección (tandas más pequeñas al servidor).`,
          )
          return prev
        }
        const slice = ok.slice(0, room)
        if (ok.length > room) {
          setError(
            `Solo se añadieron ${room} archivo(s). El máximo en cola es ${maxSelectable} por envío.`,
          )
        }
        const stamped = slice.map((file) => ({
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
          file,
          previewUrl: URL.createObjectURL(file),
        }))
        return [...next, ...stamped]
      })
    },
    [maxSelectable],
  )

  const onInputChange = (e) => {
    const { files } = e.target
    if (files?.length) mergeFiles(files)
    e.target.value = ''
  }

  const removeAt = (id) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === id)
      if (found?.previewUrl) URL.revokeObjectURL(found.previewUrl)
      return prev.filter((p) => p.id !== id)
    })
  }

  const clearAll = () => {
    revokePreviews(items)
    setItems([])
    setError(null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!items.length) {
      setError('Añade al menos un archivo para continuar.')
      return
    }
    if (items.length > maxSelectable) {
      setError(`En este envío solo caben ${maxSelectable} archivo(s). Divide en dos envíos o vacía parte de la cola.`)
      return
    }
    setBusy(true)
    setProgress(0)
    setBatchLabel('')
    setError(null)
    try {
      const files = items.map((i) => i.file)
      const deviceInfo =
        typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 400) : ''
      const batches = Math.ceil(files.length / CLIENT_UPLOAD_CHUNK) || 1
      let bDone = 0
      const data = await uploadPhotosInBatches(files, {
        uploadedFrom: guestName,
        table: tableSlug,
        deviceInfo,
        uploadSessionId: sessionId,
        onProgress: (p) => {
          setProgress(p)
          bDone = Math.min(batches - 1, Math.floor((p / 100) * batches))
          setBatchLabel(batches > 1 ? `Tanda ${bDone + 1} de ${batches}` : '')
        },
      })
      const count = Array.isArray(data?.photos) ? data.photos.length : files.length
      setSuccessCount(count)
      setSuccessOpen(true)
      revokePreviews(items)
      setItems([])
      setGuestName('')
      onUploaded?.()
      onQuotaRefresh?.()
    } catch (err) {
      setError(
        getFriendlyErrorMessage(
          err,
          'No pudimos subir los archivos. Revisa tu conexión e intenta otra vez.',
        ),
      )
    } finally {
      setBusy(false)
      setProgress(0)
      setBatchLabel('')
    }
  }

  const quotaLine =
    quota?.unlimited === true || quota?.limit == null
      ? `Sin tope por dispositivo · ${quota?.maxPerBatch ?? MAX_FILES_PER_BATCH} archivos por tanda al servidor`
      : typeof quota?.remaining === 'number'
        ? `${quota.remaining} disponibles · ${quota.used}/${quota.limit} usados (${quota.windowHours}h)`
        : `Hasta ${MAX_FILES_PER_BATCH} por tanda`

  return (
    <>
      <UploadSuccessOverlay
        open={successOpen}
        count={successCount}
        onClose={() => setSuccessOpen(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="pointer-events-none absolute -inset-[2px] rounded-[1.35rem] bg-gradient-to-br from-wonder-gold/25 via-wonder-amethyst/15 to-transparent opacity-90 blur-2xl" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-wonder-gold/40 to-transparent" />

        <form
          onSubmit={onSubmit}
          className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-wonder-night/55 via-wonder-void/40 to-wonder-night/70 px-5 py-9 shadow-[0_32px_100px_-40px_rgba(0,0,0,0.75)] backdrop-blur-2xl sm:px-10 sm:py-11"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(201,162,39,0.12),transparent_50%)]" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-wonder-amethyst/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-wonder-blush/5 blur-2xl" />
          <WonderlandFormCorners />

          <div className="relative z-10 space-y-8">
            <header className="text-center">
              <p className="font-display text-[0.65rem] uppercase tracking-[0.48em] text-wonder-gold-soft">
                Jardín de recuerdos
              </p>
              <h3 className="mt-4 font-display text-[1.65rem] font-semibold leading-tight text-rose-50 sm:text-3xl sm:leading-tight">
                Deja constancia en el espejo
              </h3>
            
            </header>

            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  inputRef.current?.click()
                }
              }}
              onDragEnter={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                setDragOver(false)
              }}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
                if (e.dataTransfer.files?.length) mergeFiles(e.dataTransfer.files)
              }}
              onClick={() => maxSelectable > 0 && inputRef.current?.click()}
              className={[
                'group relative cursor-pointer rounded-xl border-2 border-dashed px-4 py-14 text-center transition-all duration-500',
                maxSelectable === 0
                  ? 'cursor-not-allowed border-white/10 bg-wonder-night/20 opacity-50'
                  : dragOver
                    ? 'border-wonder-gold/75 bg-wonder-gold/10 shadow-[0_0_48px_-12px_rgba(201,162,39,0.4)]'
                    : 'border-white/18 bg-wonder-night/35 hover:border-wonder-gold/40 hover:bg-wonder-night/50',
              ].join(' ')}
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                multiple
                disabled={maxSelectable === 0}
                className="hidden"
                onChange={onInputChange}
              />
              <motion.div
                animate={{ scale: dragOver && maxSelectable > 0 ? 1.02 : 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="mx-auto flex max-w-md flex-col items-center gap-3"
              >
                <span className="font-display text-xs uppercase tracking-[0.38em] text-wonder-gold/95">
                  {maxSelectable === 0 ? 'Cuota completa' : 'Suelta aquí'}
                </span>
                <p className="font-body text-lg text-rose-100/88">
                  {maxSelectable === 0
                    ? 'Vuelve cuando se renueve la ventana o consulta con organización.'
                    : 'o toca para elegir desde tu dispositivo'}
                </p>
                <span className="rounded-full border border-white/12 bg-black/25 px-4 py-1.5 text-xs text-rose-100/65 backdrop-blur-sm">
                  {items.length} / {maxSelectable} en este envío
                </span>
              </motion.div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="guest-from"
                className="block text-left text-[0.65rem] uppercase tracking-[0.28em] text-wonder-gold-soft/90"
              >
                Tu nombre o mensaje breve (opcional)
              </label>
              <input
                id="guest-from"
                type="text"
                maxLength={200}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                disabled={busy}
                placeholder="Ej. Familia López — con cariño"
                className="w-full rounded-xl border border-white/10 bg-wonder-void/45 px-4 py-3.5 font-body text-rose-50 placeholder:text-rose-100/30 outline-none ring-wonder-gold/25 transition focus:border-wonder-gold/35 focus:ring-2"
              />
            </div>

            <AnimatePresence mode="wait">
              {items.length > 0 && (
                <motion.div
                  key="previews"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-rose-100/75">Vista previa</p>
                    <button
                      type="button"
                      onClick={clearAll}
                      disabled={busy}
                      className="text-xs uppercase tracking-[0.2em] text-rose-100/45 underline-offset-4 hover:text-wonder-gold-soft hover:underline disabled:opacity-40"
                    >
                      Vaciar selección
                    </button>
                  </div>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {items.map((item) => (
                      <motion.li
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-wonder-night/50 shadow-lg ring-1 ring-inset ring-white/5"
                      >
                        <img
                          src={item.previewUrl}
                          alt=""
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <button
                          type="button"
                          onClick={(ev) => {
                            ev.stopPropagation()
                            removeAt(item.id)
                          }}
                          disabled={busy}
                          className="absolute right-2 top-2 rounded-full bg-wonder-void/85 px-2 py-1 text-[0.65rem] uppercase tracking-wider text-rose-100/90 opacity-0 backdrop-blur transition group-hover:opacity-100 disabled:opacity-40"
                        >
                          Quitar
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {busy && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="space-y-2 rounded-xl border border-wonder-gold/30 bg-gradient-to-r from-wonder-gold/8 to-transparent px-4 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.2em] text-wonder-gold-soft">
                    <span>Enviando al espejo {batchLabel ? `· ${batchLabel}` : ''}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-wonder-night/80">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-wonder-gold via-wonder-gold-soft to-wonder-blush shadow-[0_0_20px_rgba(201,162,39,0.35)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="rounded-xl border border-red-400/35 bg-red-950/45 px-4 py-3 text-center text-sm text-red-100/95"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              <motion.button
                type="submit"
                disabled={busy || items.length === 0 || maxSelectable === 0}
                whileHover={{ scale: busy ? 1 : 1.02 }}
                whileTap={{ scale: busy ? 1 : 0.98 }}
                className="relative overflow-hidden rounded-full border border-wonder-gold/45 bg-gradient-to-r from-wonder-royal/95 via-wonder-amethyst/90 to-wonder-royal/95 px-10 py-4 font-display text-sm uppercase tracking-[0.32em] text-wonder-gold-soft shadow-[0_0_48px_-14px_rgba(201,162,39,0.55)] transition disabled:cursor-not-allowed disabled:opacity-45"
              >
                <span className="relative z-10">
                  {busy ? 'Subiendo…' : 'Enviar al jardín'}
                </span>
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.14),transparent)] opacity-0 transition group-hover:opacity-100" />
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  )
}
