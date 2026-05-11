import { memo } from 'react'
import { motion } from 'framer-motion'

/**
 * Cabecera premium para la galería: límites técnicos (por tanda) y cuota opcional por dispositivo.
 */
function GardenGalleryHeader({
  totalInGarden = 0,
  maxPerBatch,
  sessionLimitUnlimited,
  perDeviceLimit,
  windowHours,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mb-12 max-w-4xl"
    >
      <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-b from-wonder-gold/[0.07] via-transparent to-wonder-amethyst/[0.08] blur-2xl" />
    
    </motion.div>
  )
}

export default memo(GardenGalleryHeader)
