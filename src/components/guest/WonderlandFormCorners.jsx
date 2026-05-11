import { IconRabbit, IconTeapot, IconPocketWatch, IconPlayingCard } from './wonderlandIcons'

/** Detalle suave en las esquinas del formulario de subida */
export default function WonderlandFormCorners() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-2xl"
      aria-hidden
    >
      <IconRabbit className="absolute left-3 top-14 h-10 w-10 -rotate-6 text-wonder-gold/14 sm:left-5 sm:top-16 sm:h-12 sm:w-12" />
      <IconTeapot className="absolute right-3 top-20 h-11 w-11 rotate-6 text-wonder-gold/12 sm:right-6 sm:top-24 sm:h-12 sm:w-12" />
      <IconPocketWatch className="absolute bottom-28 left-3 hidden h-9 w-9 text-wonder-gold/12 sm:block sm:left-5" />
      <IconPlayingCard className="absolute bottom-20 right-3 h-9 w-9 rotate-12 text-wonder-gold/12 sm:right-5 sm:bottom-24" />
    </div>
  )
}
