import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReports } from '../context/ReportsContext.jsx'
import { REPORT_CATEGORIES } from '../data/categories.js'
import './Dashboard.css'

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function Dashboard() {
  const { reports, stats } = useReports()
  const [query, setQuery] = useState('')
  const [kategori, setKategori] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return reports.filter((r) => {
      if (kategori && r.kategori !== kategori) return false
      if (!q) return true
      return (
        r.judul.toLowerCase().includes(q) ||
        r.pelapor.toLowerCase().includes(q) ||
        r.kategori.toLowerCase().includes(q)
      )
    })
  }, [reports, query, kategori])

  return (
    <div className="dashboard">

      <section className="dashboard__stats">
        <div className="dashboard__stat-card">
          <p>Total Laporan</p>
          <h2>{stats.total}</h2>
        </div>
        <div className="dashboard__stat-card">
          <p>Diproses</p>
          <h2>{stats.diproses}</h2>
        </div>
        <div className="dashboard__stat-card">
          <p>Selesai</p>
          <h2>{stats.selesai}</h2>
        </div>
        <div className="dashboard__stat-card">
          <p>Ditolak</p>
          <h2>{stats.ditolak}</h2>
        </div>
      </section>

      <div className="dashboard__section-title">Data Laporan</div>

      <div className="dashboard__toolbar">
        <div className="dashboard__search">
          <IconSearch />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          className="dashboard__filter-btn"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          Filter
        </button>
      </div>

      {filterOpen && (
        <div className="dashboard__filter-panel">
          <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
            <option value="">Semua kategori</option>
            {REPORT_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      <div className="dashboard__header">
        <span>Laporan</span>
        <span>Status</span>
      </div>

      <div className="dashboard__list">
        {filtered.map((r) => (
          <div key={r.id} className="dashboard__card">

            <div>
              <p className="date">{r.tanggalLabel}</p>
              <p><b>Pelapor:</b> {r.pelapor}</p>
              <p><b>Judul:</b> {r.judul}</p>

              <Link to={`/laporan/${r.id}`} className="detail">
                Detail Laporan...
              </Link>
            </div>

            <div className="status">
              <span className={`badge ${badgeKind(r.status)}`}>
                {r.status}
              </span>
            </div>

          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="dashboard__empty">Tidak ada laporan</p>
      )}
    </div>
  )
}

function badgeKind(status) {
  switch (status) {
    case 'Selesai':
      return 'ok'
    case 'Ditolak':
      return 'bad'
    case 'Diproses':
      return 'progress'
    default:
      return 'new'
  }
}