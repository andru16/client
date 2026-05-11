import { memo } from 'react'
import { motion } from 'framer-motion'

function AdminAnalyticsPanel({ data }) {
  if (!data) return null

  const rows = data.photosByTable ?? []

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8"
    >
      <h3 className="font-display text-xl font-semibold text-rose-50">
        Analytics por mesa
      </h3>
      <p className="mt-2 text-sm text-rose-100/50">
        Fotos agrupadas según el código QR ({data.totalUploads} subidas en total).
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead className="border-b border-white/10 bg-black/30 font-display text-[0.6rem] uppercase tracking-[0.2em] text-wonder-gold/75">
            <tr>
              <th className="px-4 py-3">Mesa / origen</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-right">Fotos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row) => (
              <tr key={row.tableSlug || '__none'} className="text-rose-100/80">
                <td className="px-4 py-3 font-medium">{row.tableLabel}</td>
                <td className="px-4 py-3 font-mono text-xs text-rose-100/50">
                  {row.tableSlug || '—'}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.topTables?.length > 0 && (
        <div className="mt-6 rounded-xl border border-wonder-gold/20 bg-wonder-gold/5 px-4 py-3 text-sm text-rose-100/70">
          <span className="font-display text-[0.65rem] uppercase tracking-[0.25em] text-wonder-gold-soft">
            Mesas más activas
          </span>
          <p className="mt-2">
            {data.topTables
              .map((t) => `${t.tableLabel} (${t.count})`)
              .join(' · ')}
          </p>
        </div>
      )}
    </motion.section>
  )
}

export default memo(AdminAnalyticsPanel)
