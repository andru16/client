import { motion } from 'framer-motion'

const blobs = [
  {
    className:
      'left-[-20%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-gradient-to-br from-wonder-amethyst/40 via-wonder-royal/20 to-transparent blur-3xl',
    duration: 28,
    x: [0, 40, 0],
    y: [0, 30, 0],
  },
  {
    className:
      'right-[-15%] top-[35%] h-[45vmin] w-[45vmin] rounded-full bg-gradient-to-bl from-wonder-blush/25 via-wonder-gold/10 to-transparent blur-3xl',
    duration: 34,
    x: [0, -35, 0],
    y: [0, 45, 0],
  },
  {
    className:
      'bottom-[-25%] left-[20%] h-[60vmin] w-[60vmin] rounded-full bg-gradient-to-t from-wonder-royal/50 via-wonder-night/30 to-transparent blur-3xl',
    duration: 40,
    x: [0, 25, 0],
    y: [0, -20, 0],
  },
]

/**
 * Capa de atmósfera: orbes difuminados y velo de grano sutil (estética cinematográfica).
 */
export default function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(92,61,143,0.35),transparent_55%)]" />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute ${b.className}`}
          animate={{ x: b.x, y: b.y }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wonder-void/20 to-wonder-void" />
    </div>
  )
}
