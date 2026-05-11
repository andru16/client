import { memo } from 'react'
import { motion } from 'framer-motion'

function displayTableName(slug, label) {
  if (!slug || !label) return ''
  const lower = label.toLowerCase()
  if (lower.includes('mesa')) return label
  if (/^\d+$/.test(slug)) return `Mesa ${slug}`
  return `Mesa ${label}`
}

function TableWelcomeBanner({ tableSlug, tableLabel }) {
  const name = displayTableName(tableSlug, tableLabel)
  if (!name) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mb-10 max-w-3xl overflow-hidden rounded-2xl border border-wonder-gold/30 bg-gradient-to-r from-wonder-royal/35 via-wonder-night/50 to-wonder-amethyst/25 px-5 py-4 text-center shadow-[0_20px_60px_-40px_rgba(201,162,39,0.35)] backdrop-blur-xl sm:px-8 sm:py-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,162,39,0.2),transparent_45%)]" />
      <p className="relative font-display text-[0.65rem] uppercase tracking-[0.4em] text-wonder-gold-soft">
        Código de mesa detectado
      </p>
      <p className="relative mt-2 font-body text-lg text-rose-50 sm:text-xl">
        Estás compartiendo recuerdos desde la{' '}
        <span className="bg-gradient-to-r from-wonder-gold-soft to-wonder-blush bg-clip-text font-semibold text-transparent">
          {name}
        </span>{' '}
        <span aria-hidden>✨</span>
      </p>
      <p className="relative mt-1 text-sm text-rose-100/55">
        Tus fotos quedarán vinculadas a esta mesa para el álbum del evento.
      </p>
    </motion.div>
  )
}

export default memo(TableWelcomeBanner)
