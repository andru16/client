import {
  IconRabbit,
  IconTeapot,
  IconPocketWatch,
  IconPlayingCard,
  IconMushrooms,
  IconCheshireArc,
} from './wonderlandIcons'

/**
 * Motivos decorativos tipo “merienda imposible” (SVG propios, trazo simple).
 */
export default function WonderlandAmbientDecor() {
  const common = 'pointer-events-none absolute text-wonder-gold/18 select-none'
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <IconRabbit className={`${common} -left-2 top-[8%] h-24 w-24 -rotate-6 sm:left-[4%] sm:h-28 sm:w-28`} />
      <IconTeapot className={`${common} -right-4 top-[6%] h-28 w-28 rotate-6 sm:right-[6%] sm:h-32 sm:w-32`} />
      <IconPocketWatch className={`${common} left-[8%] bottom-[12%] hidden h-20 w-20 sm:block md:left-[10%]`} />
      <IconPlayingCard className={`${common} right-[6%] bottom-[14%] h-16 w-16 rotate-12 md:right-[12%]`} />
      <IconMushrooms className={`${common} left-1/2 top-[2%] h-20 w-20 -translate-x-1/2 opacity-80 sm:top-[4%]`} />
      <IconCheshireArc className={`${common} bottom-[6%] left-1/2 w-40 -translate-x-1/2 sm:w-48`} />
    </div>
  )
}
