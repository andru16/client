import { useTableSession } from '../hooks/useTableSession'
import { useUploadQuota } from '../hooks/useUploadQuota'
import GuestUploadIntro from './guest/GuestUploadIntro'
import WonderlandAmbientDecor from './guest/WonderlandAmbientDecor'
import UploadSection from './upload/UploadSection'

export default function SectionMemories() {
  const { tableSlug, tableLabel, sessionId } = useTableSession()
  const { quota, refreshQuota } = useUploadQuota(sessionId)

  const onUploaded = () => {
    refreshQuota()
  }

  return (
    <section
      id="recuerdos"
      className="relative w-full overflow-hidden px-4 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8"
    >
      <WonderlandAmbientDecor />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wonder-gold/25 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-16 h-[min(45vh,380px)] w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-gradient-to-b from-wonder-amethyst/12 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <GuestUploadIntro tableLabel={tableLabel} />
        <UploadSection
          onUploaded={onUploaded}
          tableSlug={tableSlug}
          sessionId={sessionId}
          quota={quota}
          onQuotaRefresh={refreshQuota}
        />
      </div>
    </section>
  )
}
