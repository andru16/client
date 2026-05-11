import { useState } from 'react'
import { motion } from 'framer-motion'
import { galleryThumbnailUrl, isMediaVideo } from '../../utils/cloudinaryUrl'
import { getFriendlyErrorMessage } from '../../utils/httpErrorMessage'
import PhotoLightbox from '../gallery/PhotoLightbox'

export default function AdminPhotoGrid({ photos, onDeleted }) {
  const [preview, setPreview] = useState(null)
  const [busyId, setBusyId] = useState(null)

  if (!photos?.length) {
    return (
      <p className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-12 text-center text-rose-100/50">
        Aún no hay fotos en el jardín.
      </p>
    )
  }

  const handleDelete = async (photo) => {
    if (!onDeleted) return
    const ok = window.confirm('¿Eliminar esta imagen del almacenamiento y la base de datos?')
    if (!ok) return
    setBusyId(photo._id)
    try {
      await onDeleted(photo._id)
      if (preview?._id === photo._id) setPreview(null)
    } catch (err) {
      window.alert(getFriendlyErrorMessage(err, 'No se pudo eliminar la imagen.'))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <motion.li
            key={photo._id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04, type: 'spring', stiffness: 260, damping: 26 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.85)]"
          >
            <button
              type="button"
              onClick={() => setPreview(photo)}
              className="block w-full text-left"
            >
              <img
                src={galleryThumbnailUrl(photo, 640)}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110"
              />
              {isMediaVideo(photo) && (
                <span className="pointer-events-none absolute left-2 top-2 rounded border border-wonder-gold/35 bg-black/70 px-1.5 py-0.5 font-display text-[0.5rem] uppercase tracking-wider text-wonder-gold-soft">
                  Vídeo
                </span>
              )}
            </button>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-wonder-gold/0 transition group-hover:ring-wonder-gold/25" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
              <p className="min-w-0 truncate text-[0.6rem] uppercase tracking-[0.15em] text-wonder-gold-soft/90">
                {photo.createdAt
                  ? new Date(photo.createdAt).toLocaleString('es', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  : '—'}
              </p>
            </div>
            <button
              type="button"
              disabled={busyId === photo._id}
              onClick={() => handleDelete(photo)}
              className="absolute right-2 top-2 rounded-full border border-red-500/40 bg-black/70 px-3 py-1 font-display text-[0.55rem] uppercase tracking-[0.2em] text-red-100/95 opacity-0 backdrop-blur transition hover:bg-red-950/80 group-hover:opacity-100 disabled:opacity-40"
            >
              {busyId === photo._id ? '…' : 'Eliminar'}
            </button>
          </motion.li>
        ))}
      </ul>

      <PhotoLightbox photo={preview} onClose={() => setPreview(null)} />
    </>
  )
}
