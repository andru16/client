import { motion } from 'framer-motion'

const COUNT = 18

/**
 * Partículas muy ligeras (solo divs + motion) para profundidad sin canvas.
 */
export default function SoftParticles({ className = '' }) {
  const items = Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: (i % 5) * 0.4,
    duration: 10 + (i % 6),
  }))

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[1] overflow-hidden ${className}`}
      aria-hidden
    >
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-wonder-gold-soft/50 shadow-[0_0_12px_rgba(232,212,139,0.45)]"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [0, -24, 0],
            opacity: [0.15, 0.55, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
