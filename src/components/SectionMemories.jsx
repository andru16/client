import { motion } from 'framer-motion'
import { useApiHealth } from '../hooks/useApiHealth'
import { usePhotos } from '../hooks/usePhotos'
import { useTableSession } from '../hooks/useTableSession'
import { useUploadQuota } from '../hooks/useUploadQuota'
import UploadSection from './upload/UploadSection'
import GallerySection from './gallery/GallerySection'
import GardenGalleryHeader from './gallery/GardenGalleryHeader'
import TableWelcomeBanner from './welcome/TableWelcomeBanner'
import { MAX_FILES_PER_BATCH } from '../constants/uploadLimits'

export default function SectionMemories() {
  const { status } = useApiHealth()
  const { photos, loading, error, refresh } = usePhotos()
  const { tableSlug, tableLabel, sessionId } = useTableSession()
  const { quota, refreshQuota } = useUploadQuota(sessionId)

  const onUploaded = () => {
    refresh()
    refreshQuota()
  }

  return (
    <section
      id="recuerdos"
      className="relative overflow-hidden px-4 py-20 md:px-8 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wonder-gold/25 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[min(50vh,420px)] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-gradient-to-b from-wonder-amethyst/12 via-transparent to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-display text-xs uppercase tracking-[0.5em] text-wonder-gold">
            Galería de invitados
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-rose-50 md:text-4xl lg:text-[2.65rem]">
            Recuerdos suspendidos en el tiempo
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-rose-100/82 md:text-lg">
            Cada imagen o vídeo es un susurro en el cristal. El jardín está preparado para{' '}
            <span className="text-wonder-gold-soft/95">miles de archivos</span> entre todos los
            invitados; tu móvil envía en tandas para que la experiencia siga siendo fluida y
            elegante.
          </p>
        </motion.div>

        <div className="mt-20 space-y-20 md:mt-24 md:space-y-24">
          <TableWelcomeBanner tableSlug={tableSlug} tableLabel={tableLabel} />
          <UploadSection
            onUploaded={onUploaded}
            tableSlug={tableSlug}
            sessionId={sessionId}
            quota={quota}
            onQuotaRefresh={refreshQuota}
          />
          <div>
            <GardenGalleryHeader
              totalInGarden={photos.length}
              maxPerBatch={quota?.maxPerBatch ?? MAX_FILES_PER_BATCH}
              sessionLimitUnlimited={quota == null || quota.unlimited === true}
              perDeviceLimit={typeof quota?.limit === 'number' ? quota.limit : null}
              windowHours={quota?.windowHours ?? 24}
            />
            <GallerySection
              photos={photos}
              loading={loading}
              error={error}
              onRetry={refresh}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
