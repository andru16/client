import { Link, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import SoftParticles from '../components/effects/SoftParticles'

/**
 * Shell del panel admin: sin navbar pública, atmósfera oscura y discreta.
 */
export default function AdminLayout() {
  return (
    <div className="relative min-h-svh overflow-x-hidden bg-[#05030c] text-rose-100/90">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-20%,rgba(92,61,143,0.35),transparent_55%)]" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-[#05030c]/20 to-[#05030c]" />
      <SoftParticles className="opacity-70" />

      <div className="relative z-10 flex min-h-svh flex-col">
        <header className="border-b border-white/5 bg-black/25 px-4 py-5 backdrop-blur-xl md:px-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display text-[0.6rem] uppercase tracking-[0.55em] text-wonder-gold/80">
                Panel reservado
              </p>
              <h1 className="mt-2 font-display text-lg font-semibold tracking-wide text-rose-50 md:text-xl">
                Espejo lateral
              </h1>
            </div>
            <Link
              to="/"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-display text-[0.65rem] uppercase tracking-[0.25em] text-rose-100/75 transition hover:border-wonder-gold/35 hover:text-wonder-gold-soft"
            >
              Volver al jardín
            </Link>
          </div>
        </header>

        <motion.main
          className="flex-1 px-4 py-10 md:px-10 md:py-14"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </motion.main>

        <footer className="border-t border-white/5 px-4 py-6 text-center text-xs text-rose-100/35 md:px-10">
          <p className="font-display tracking-[0.35em]">Wonderland · uso interno</p>
        </footer>
      </div>
    </div>
  )
}
