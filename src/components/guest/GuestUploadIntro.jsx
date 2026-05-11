/**
 * Texto de contexto para invitados: qué es esta pantalla y qué deben hacer.
 * @param {{ tableLabel?: string }} props
 */
export default function GuestUploadIntro({ tableLabel = '' }) {
  return (
    <header className="mb-8 text-center md:mb-10">
      <p className="font-display text-[0.65rem] uppercase tracking-[0.42em] text-wonder-gold-soft/90">
        Wonderland XV · Alicia en el País de las Maravillas
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-rose-50 sm:text-3xl md:text-[2rem]">
        Aquí dejas tus fotos y vídeos del evento
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-rose-100/78 md:text-lg">
        Esta página es solo para subir recuerdos: elige archivos desde tu móvil o arrástralos
        al recuadro. La familia los recibirá en la galería privada de la celebración.
      </p>
      {tableLabel ? (
        <p className="mt-4 inline-block rounded-full border border-wonder-gold/25 bg-wonder-void/50 px-4 py-2 font-body text-sm text-wonder-gold-soft/95 backdrop-blur-sm">
          Estás compartiendo desde la mesa «{tableLabel}»
        </p>
      ) : null}
    </header>
  )
}
