import { memo } from 'react'
import { motion } from 'framer-motion'

function GardenIllustration() {
  return (
    <svg
      viewBox="0 0 400 240"
      className="mx-auto h-40 w-full max-w-xs text-wonder-gold/40 sm:h-48"
      aria-hidden
    >
      <defs>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e8b4c8" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="200" rx="160" ry="28" fill="url(#glow)" />
      <path
        d="M200 48c-24 40-56 52-72 88 32-8 56-4 72 12 16-16 40-20 72-12-16-36-48-48-72-88z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="200" cy="96" r="5" fill="#e8d48b" opacity="0.85" />
      <path
        d="M120 140c20 24 48 36 80 36s60-12 80-36"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="4 6"
        opacity="0.6"
      />
      <text
        x="200"
        y="228"
        textAnchor="middle"
        className="fill-wonder-gold-soft/50 font-display text-[10px] tracking-[0.35em]"
      >
        EL JARDÍN ESPERA
      </text>
    </svg>
  )
}

function GalleryEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-dashed border-wonder-gold/20 bg-gradient-to-b from-wonder-night/45 via-wonder-void/40 to-wonder-night/50 px-6 py-14 text-center shadow-[0_24px_80px_-48px_rgba(92,61,143,0.4)] backdrop-blur-xl sm:px-12 sm:py-16"
    >
      <GardenIllustration />
      <h3 className="mt-8 font-display text-xl font-semibold text-rose-50 sm:text-2xl">
        El jardín aún está en silencio
      </h3>
      <p className="mx-auto mt-4 max-w-md text-rose-100/65">
        Las rosas digitales no han florecido… todavía. Sé quien abre la primera
        puerta con una foto o un vídeo y deja que el espejo lo guarde para siempre.
      </p>
      <p className="mt-6 font-display text-[0.65rem] uppercase tracking-[0.35em] text-wonder-gold/70">
        Toca «Subir recuerdo» o desciende al formulario
      </p>
    </motion.div>
  )
}

export default memo(GalleryEmptyState)
