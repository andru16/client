import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative px-4 pb-20 pt-12 md:px-8 md:pb-32 md:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 flex justify-center opacity-30">
        <div className="h-[min(70vh,520px)] w-[min(90vw,720px)] rounded-[50%] bg-gradient-to-b from-wonder-amethyst/30 via-transparent to-transparent blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="font-display text-[0.7rem] uppercase tracking-[0.55em] text-wonder-gold md:text-xs"
        >
          Alicia en el País de las Maravillas
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-5 font-display text-[1.85rem] font-semibold leading-[1.12] tracking-tight text-rose-50 drop-shadow-[0_0_40px_rgba(200,162,39,0.15)] sm:text-5xl md:mt-6 md:text-6xl lg:text-7xl"
        >
          <span className="md:hidden">El tiempo se dobla</span>
          <span className="hidden md:inline">Donde el tiempo se dobla</span>{' '}
          <span className="bg-gradient-to-r from-wonder-rose via-wonder-blush to-wonder-gold-soft bg-clip-text text-transparent">
            y la magia respira
          </span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base text-rose-100/75 md:mt-8 md:text-xl"
        >
          <span className="md:hidden">
            Quince años en clave cinematográfica: luz de ensueño y un cuento que
            no termina.
          </span>
          <span className="hidden md:inline">
            Una celebración de quince años concebida como escena de película: luz
            de ensueño, silencios elegantes y el eco de un cuento que no termina.
          </span>
        </motion.p>
        <motion.div variants={item} className="mt-12 flex justify-center">
          <a
            href="#recuerdos"
            className="group relative inline-flex items-center justify-center px-10 py-4 font-display text-sm uppercase tracking-[0.3em] text-wonder-night"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-wonder-gold via-wonder-gold-soft to-wonder-gold opacity-95 shadow-[0_0_40px_rgba(201,162,39,0.35)] transition group-hover:opacity-100" />
            <span className="absolute -inset-px rounded-full border border-wonder-gold-soft/50" />
            <span className="relative">Descender al jardín</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
