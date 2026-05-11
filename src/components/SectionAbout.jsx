import { motion } from 'framer-motion'

export default function SectionAbout() {
  return (
    <section
      id="historia"
      className="relative px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-xs uppercase tracking-[0.45em] text-wonder-gold">
            La velada
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-rose-50 md:text-4xl">
            Un salón que se abre como la primera página de un libro antiguo
          </h2>
          <p className="mt-6 text-rose-100/80">
            Cada detalle —desde la penumbra violeta hasta los reflejos dorados—
            invita a olvidar el reloj. No es un tema decorativo: es una
            narrativa. Tú entras, y el mundo ordinario se queda al otro lado del
            espejo.
          </p>
          <p className="mt-4 text-rose-100/80">
            El escenario digital acompaña la velada: invitación, recuerdos
            compartidos y un hilo narrativo que se amplía con cada foto que cae
            en el jardín.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-sm border border-white/10 bg-gradient-to-br from-wonder-royal/60 via-wonder-night/80 to-wonder-void p-8 shadow-[0_0_60px_rgba(42,26,74,0.5)] md:p-10">
            <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full border border-wonder-gold/40" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-wonder-blush/10 blur-2xl" />
            <blockquote className="relative font-body text-xl italic leading-relaxed text-rose-100/90 md:text-2xl">
              «Lo que es imposible, solo tarda un poco más en volverse
              inolvidable.»
            </blockquote>
            <p className="relative mt-8 font-display text-xs tracking-[0.35em] text-wonder-gold-soft">
              — INVITACIÓN A CREER
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
