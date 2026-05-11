import { motion } from 'framer-motion'

/**
 * Transición suave al entrar en viewport (scroll) entre secciones de la home.
 */
export default function PageSectionWrapper({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px', amount: 0.2 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
