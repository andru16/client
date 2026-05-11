import { motion } from 'framer-motion'

export default function FantasyRouteLoader() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5 bg-[#05030c] px-4 text-rose-100/80">
      <motion.div
        className="relative h-16 w-16"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
      >
        <span className="absolute inset-0 rounded-full border border-wonder-gold/20" />
        <span className="absolute inset-1 rounded-full border border-t-wonder-gold border-wonder-gold/60" />
        <motion.span
          className="absolute inset-0 rounded-full bg-wonder-gold/10 blur-xl"
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
      </motion.div>
      <p className="font-display text-xs uppercase tracking-[0.45em] text-wonder-gold-soft/85">
        Abriendo el panel…
      </p>
    </div>
  )
}
