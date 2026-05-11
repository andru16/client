import { motion } from 'framer-motion'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#historia', label: 'La velada' },
  { href: '#recuerdos', label: 'Recuerdos' },
]

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-white/5 bg-wonder-night/35 px-4 py-4 backdrop-blur-xl md:px-8"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <a
          href="#inicio"
          className="font-display text-sm font-semibold tracking-[0.35em] text-wonder-gold-soft md:text-base"
        >
          WONDERLAND
          <span className="ml-2 text-wonder-rose/90">XV</span>
        </a>
        <ul className="flex flex-wrap items-center justify-end gap-4 text-sm md:gap-8 md:text-[0.95rem]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-rose-100/75 transition-colors hover:text-wonder-gold-soft"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
