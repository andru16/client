import { motion } from 'framer-motion'

export default function GallerySkeleton({ columnsClass = 'columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4' }) {
  const placeholders = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className={`${columnsClass}`}>
      {placeholders.map((i) => (
        <div key={i} className="mb-3 break-inside-avoid sm:mb-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-wonder-night/50">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.08,
              }}
            />
            <div className="absolute inset-0 bg-wonder-royal/20" />
          </div>
        </div>
      ))}
    </div>
  )
}
