import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AdminStatCard from '../components/admin/AdminStatCard'
import AdminPhotoGrid from '../components/admin/AdminPhotoGrid'
import AdminDownloadCard from '../components/admin/AdminDownloadCard'
import AdminAnalyticsPanel from '../components/admin/AdminAnalyticsPanel'
import {
  deleteAdminPhoto,
  fetchAdminAnalytics,
  fetchAdminStats,
} from '../services/adminService'
import { formatBytes } from '../utils/formatBytes'
import { getFriendlyErrorMessage } from '../utils/httpErrorMessage'

export default function AdminPage() {
  const [stats, setStats] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [s, a] = await Promise.all([fetchAdminStats(), fetchAdminAnalytics()])
      setStats(s)
      setAnalytics(a)
    } catch (err) {
      setStats(null)
      setAnalytics(null)
      setError(
        getFriendlyErrorMessage(
          err,
          'No se pudieron cargar las estadísticas. Comprueba el servidor.',
        ),
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const onDeleted = async (id) => {
    await deleteAdminPhoto(id)
    await load()
  }

  const lastHint = stats?.lastUploadDate
    ? new Date(stats.lastUploadDate).toLocaleString('es', {
        dateStyle: 'full',
        timeStyle: 'short',
      })
    : 'Aún no hay fotos en el jardín.'

  return (
    <div className="space-y-14">
      <header className="text-center md:text-left">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[0.65rem] uppercase tracking-[0.5em] text-wonder-gold/70"
        >
          Administración velada
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-4 font-display text-3xl font-semibold text-rose-50 md:text-4xl"
        >
          Control del espejo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="mt-4 max-w-2xl text-rose-100/55"
        >
          Acceso por URL reservada. Sin credenciales: mantén la ruta en privado y
          compártela solo con quien organice el evento.
        </motion.p>
      </header>

      {loading && (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
          <motion.div
            className="h-14 w-14 rounded-full border-2 border-wonder-gold/25 border-t-wonder-gold"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
          />
          <p className="font-display text-xs uppercase tracking-[0.35em] text-wonder-gold/80">
            Sincronizando archivos…
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/40 px-6 py-8 text-center">
          <p className="text-red-100/95">{error}</p>
          <button
            type="button"
            onClick={load}
            className="mt-6 rounded-full border border-wonder-gold/40 px-6 py-2 font-display text-xs uppercase tracking-[0.25em] text-wonder-gold-soft hover:bg-wonder-gold/10"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && stats && (
        <>
          <section className="grid gap-5 md:grid-cols-3">
            <AdminStatCard
              label="Total de imágenes"
              value={stats.totalPhotos}
              hint="Todas las instantáneas publicadas en el jardín."
              delay={0}
            />
            <AdminStatCard
              label="Almacenamiento (estim.)"
              value={formatBytes(stats.estimatedStorageBytes)}
              hint={
                stats.photosWithoutSize > 0
                  ? `Incluye heurística para ${stats.photosWithoutSize} archivo(s) sin tamaño registrado.`
                  : 'Suma de bytes conocidos en base de datos.'
              }
              delay={0.06}
            />
            <AdminStatCard
              label="Última subida"
              value={
                stats.lastUploadDate
                  ? new Date(stats.lastUploadDate).toLocaleDateString('es', {
                      dateStyle: 'medium',
                    })
                  : '—'
              }
              hint={lastHint}
              delay={0.12}
            />
          </section>

          {analytics && <AdminAnalyticsPanel data={analytics} />}

          <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-rose-50">
                  Galería admin
                </h3>
                <p className="mt-2 text-sm text-rose-100/50">
                  Vista previa amplia, fecha de carga y eliminación inmediata.
                </p>
              </div>
            </div>
            <AdminPhotoGrid photos={stats.latestUploads} onDeleted={onDeleted} />
            {stats.totalPhotos > stats.latestUploads.length && (
              <p className="text-center text-xs text-rose-100/40">
                Mostrando las {stats.latestUploads.length} más recientes. El ZIP incluye las{' '}
                {stats.totalPhotos} completas.
              </p>
            )}
          </section>

          <AdminDownloadCard />
        </>
      )}
    </div>
  )
}
