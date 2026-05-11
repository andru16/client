import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

function burst() {
  const colors = ['#c9a227', '#e8d48b', '#f5d0e0', '#e8b4c8', '#5c3d8f']
  confetti({
    particleCount: 90,
    spread: 62,
    startVelocity: 28,
    gravity: 1.05,
    ticks: 200,
    zIndex: 9999,
    scalar: 0.85,
    origin: { y: 0.72 },
    colors,
  })
}

export default function UploadSuccessOverlay({ open, count = 1, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    burst()
    const t = window.setTimeout(() => burst(), 280)
    return () => window.clearTimeout(t)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-wonder-void/88 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="relative z-10 max-w-md overflow-hidden rounded-2xl border border-wonder-gold/35 bg-gradient-to-b from-wonder-royal/50 via-wonder-night/85 to-wonder-void/95 px-8 py-10 text-center shadow-[0_32px_120px_-48px_rgba(201,162,39,0.45)] backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute -inset-1 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(201,162,39,0.12),transparent,rgba(92,61,143,0.15),transparent)] opacity-70 blur-2xl" />
            <p className="relative font-display text-[0.65rem] uppercase tracking-[0.45em] text-wonder-gold-soft">
              El espejo lo guardó todo
            </p>
            <h3 className="relative mt-4 font-display text-2xl font-semibold text-rose-50">
              {count === 1
                ? 'Tu recuerdo ya brilla en el jardín'
                : `${count} recuerdos ya brillan en el jardín`}
            </h3>
            <p className="relative mt-4 text-rose-100/70">
              Gracias por añadir un destello a esta noche. La magia está en los
              detalles — y en cada imagen que el tiempo no quiere olvidar.
            </p>
            <motion.button
              type="button"
              onClick={onClose}
              className="relative mt-8 rounded-full border border-wonder-gold/45 bg-wonder-gold/10 px-8 py-3 font-display text-xs uppercase tracking-[0.3em] text-wonder-gold-soft transition hover:bg-wonder-gold/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Continuar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
