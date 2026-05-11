import { memo } from 'react'
import { motion } from 'framer-motion'

function AdminStatCard({ label, value, hint, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full bg-wonder-gold/15 blur-3xl" />
      <p className="font-display text-[0.6rem] uppercase tracking-[0.35em] text-wonder-gold/75">
        {label}
      </p>
      <p className="mt-4 font-display text-3xl font-semibold text-rose-50 md:text-4xl">
        {value}
      </p>
      {hint && (
        <p className="mt-3 text-sm text-rose-100/45">{hint}</p>
      )}
    </motion.article>
  )
}

export default memo(AdminStatCard)
