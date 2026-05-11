import { motion } from 'framer-motion'

/**
 * CTA fijo para invitados en móvil (QR en mesa): acceso inmediato a la subida.
 */
export default function FloatingUploadButton() {
  return (
    <motion.div
      className="fixed bottom-5 left-0 right-0 z-40 flex justify-center px-4 md:hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href="#recuerdos"
        className="group relative flex items-center gap-3 rounded-full border border-wonder-gold/40 bg-wonder-night/80 px-6 py-3.5 font-display text-[0.65rem] uppercase tracking-[0.28em] text-wonder-gold-soft shadow-[0_12px_40px_-12px_rgba(201,162,39,0.55)] backdrop-blur-xl"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-wonder-gold/15 via-transparent to-wonder-amethyst/20 opacity-0 transition group-hover:opacity-100" />
        <span className="relative flex h-2 w-2 rounded-full bg-wonder-gold shadow-[0_0_12px_rgba(201,162,39,0.9)] animate-pulse" />
        <span className="relative">Subir recuerdo</span>
      </a>
    </motion.div>
  )
}
