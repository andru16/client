import { lazy, memo, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { galleryThumbnailUrl, isMediaVideo } from '../../utils/cloudinaryUrl'
import GallerySkeleton from './GallerySkeleton'
import GalleryEmptyState from './GalleryEmptyState'

const PhotoLightbox = lazy(() => import('./PhotoLightbox'))

const columnVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 26 },
  },
}

function GallerySection({ photos, loading, error, onRetry }) {
  const [active, setActive] = useState(null)

  if (loading && photos.length === 0) {
    return (
      <div className="space-y-6 rounded-2xl border border-white/10 bg-wonder-mist/40 px-4 py-8 backdrop-blur-md sm:px-6 sm:py-10">
        <div className="flex items-center justify-center gap-3 text-wonder-gold-soft/90">
          <motion.div
            className="h-9 w-9 rounded-full border-2 border-wonder-gold/30 border-t-wonder-gold"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
          <p className="font-display text-xs uppercase tracking-[0.35em]">
            Desplegando el jardín…
          </p>
        </div>
        <GallerySkeleton />
      </div>
    )
  }

  if (error && photos.length === 0) {
    return (
      <div className="rounded-2xl border border-red-400/25 bg-red-950/30 px-6 py-10 text-center backdrop-blur-md">
        <p className="text-red-100/90">{error}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 rounded-full border border-wonder-gold/40 px-6 py-2 font-display text-xs uppercase tracking-[0.25em] text-wonder-gold-soft hover:bg-wonder-gold/10"
          >
            Reintentar
          </button>
        )}
      </div>
    )
  }

  if (!photos.length) {
    return <GalleryEmptyState />
  }

  return (
    <>
      <motion.ul
        variants={columnVariants}
        initial="hidden"
        animate="show"
        className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4"
      >
        {photos.map((photo) => (
          <motion.li
            key={photo._id}
            variants={itemVariants}
            layout
            className="mb-3 break-inside-avoid sm:mb-4"
          >
            <button
              type="button"
              onClick={() => setActive(photo)}
              className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-wonder-night/40 text-left shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] outline-none ring-wonder-gold/0 transition hover:border-wonder-gold/35 focus-visible:ring-2 focus-visible:ring-wonder-gold/50"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-wonder-void/80 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <img
                src={galleryThumbnailUrl(photo, 720)}
                alt=""
                loading="lazy"
                decoding="async"
                className="block w-full object-cover transition duration-700 group-hover:scale-[1.04] group-hover:brightness-110"
              />
              {isMediaVideo(photo) && (
                <span className="pointer-events-none absolute left-2 top-2 rounded-full border border-wonder-gold/40 bg-wonder-void/75 px-2 py-0.5 font-display text-[0.55rem] uppercase tracking-[0.15em] text-wonder-gold-soft">
                  Vídeo
                </span>
              )}
              <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
              {photo.uploadedFrom && (
                <span className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-wonder-void/95 to-transparent px-3 pb-3 pt-10 font-display text-[0.65rem] uppercase tracking-[0.2em] text-wonder-gold-soft transition duration-300 group-hover:translate-y-0">
                  {photo.uploadedFrom}
                </span>
              )}
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <Suspense fallback={null}>
        <PhotoLightbox photo={active} onClose={() => setActive(null)} />
      </Suspense>
    </>
  )
}

export default memo(GallerySection)
