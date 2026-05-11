import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { downloadAllRecuerdosZip } from '../../services/adminService'
import { getFriendlyErrorMessage } from '../../utils/httpErrorMessage'

async function messageFromBlobError(err) {
  const data = err?.response?.data
  if (data instanceof Blob) {
    try {
      const text = await data.text()
      const parsed = JSON.parse(text)
      if (typeof parsed.message === 'string') return parsed.message
    } catch {
      /* ignore */
    }
  }
  return getFriendlyErrorMessage(err, 'No se pudo descargar el archivo.')
}

export default function AdminDownloadCard() {
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  const onDownload = async () => {
    setBusy(true)
    setProgress(0)
    setError(null)
    try {
      await downloadAllRecuerdosZip({
        onProgress: (p) => setProgress(p),
      })
    } catch (err) {
      setError(await messageFromBlobError(err))
    } finally {
      setBusy(false)
      setProgress(0)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-wonder-gold/25 bg-gradient-to-br from-wonder-royal/25 via-black/40 to-wonder-night/60 p-8 shadow-[0_28px_100px_-40px_rgba(201,162,39,0.35)] backdrop-blur-2xl md:p-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.12),transparent_45%)]" />
      <div className="relative text-center">
        <p className="font-display text-[0.65rem] uppercase tracking-[0.45em] text-wonder-gold-soft">
          Archivo maestro
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-rose-50 md:text-3xl">
          Descargar todos los recuerdos
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-rose-100/55 md:text-base">
          Se genera un ZIP al vuelo con todas las imágenes, orden cronológico y nombres
          claros. Ideal para respaldo tras el evento.
        </p>

        <motion.button
          type="button"
          disabled={busy}
          onClick={onDownload}
          whileHover={{ scale: busy ? 1 : 1.02 }}
          whileTap={{ scale: busy ? 1 : 0.98 }}
          className="relative mx-auto mt-10 flex min-h-[3.5rem] min-w-[min(100%,280px)] items-center justify-center overflow-hidden rounded-full border border-wonder-gold/50 bg-gradient-to-r from-wonder-royal/90 via-wonder-amethyst/80 to-wonder-royal/90 px-10 py-4 font-display text-xs uppercase tracking-[0.4em] text-wonder-gold-soft shadow-[0_0_48px_-12px_rgba(201,162,39,0.55)] transition disabled:cursor-not-allowed disabled:opacity-45"
        >
          <span className="pointer-events-none absolute inset-0 animate-pulseGlow bg-wonder-gold/10 blur-2xl" />
          <span className="relative">{busy ? 'Tejiendo el archivo…' : 'Descargar todos los recuerdos'}</span>
        </motion.button>

        <AnimatePresence>
          {busy && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mx-auto mt-8 max-w-md space-y-2 text-left"
            >
              <div className="flex justify-between text-[0.6rem] uppercase tracking-[0.25em] text-wonder-gold/80">
                <span>Progreso</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-black/50">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-wonder-gold via-wonder-gold-soft to-wonder-blush"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 22 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.p
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-lg border border-red-500/30 bg-red-950/50 px-4 py-3 text-sm text-red-100/95"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
