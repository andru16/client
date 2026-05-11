import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { isMediaVideo } from '../../utils/cloudinaryUrl'

export default function PhotoLightbox({ photo, onClose }) {
  useEffect(() => {
    if (!photo) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [photo, onClose])

  const isVideo = photo && isMediaVideo(photo)

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-wonder-void/85 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.figure
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="relative z-10 max-h-[90vh] max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-wonder-night/60 shadow-[0_32px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute -inset-1 bg-gradient-to-br from-wonder-gold/20 via-transparent to-wonder-amethyst/25 opacity-60 blur-2xl" />
            {isVideo ? (
              <video
                src={photo.imageUrl}
                controls
                playsInline
                preload="metadata"
                aria-label={
                  photo.uploadedFrom
                    ? `Vídeo — ${photo.uploadedFrom}`
                    : 'Vídeo del jardín'
                }
                className="relative z-10 max-h-[78vh] w-full bg-black object-contain"
              />
            ) : (
              <img
                src={photo.imageUrl}
                alt={photo.uploadedFrom ? `Recuerdo de ${photo.uploadedFrom}` : 'Recuerdo del jardín'}
                className="relative z-10 max-h-[78vh] w-full object-contain"
                loading="eager"
              />
            )}
            {(photo.uploadedFrom || photo.createdAt) && (
              <figcaption className="relative z-10 border-t border-white/10 bg-wonder-void/70 px-5 py-4 text-center backdrop-blur-md">
                {photo.uploadedFrom && (
                  <p className="font-display text-sm tracking-wide text-wonder-gold-soft">
                    {photo.uploadedFrom}
                  </p>
                )}
                {photo.createdAt && (
                  <p className="mt-1 font-body text-xs text-rose-100/55">
                    {new Date(photo.createdAt).toLocaleString('es', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                )}
              </figcaption>
            )}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 rounded-full border border-white/15 bg-wonder-void/80 px-3 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.2em] text-rose-100/90 backdrop-blur hover:border-wonder-gold/40 hover:text-wonder-gold-soft"
            >
              Cerrar
            </button>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
