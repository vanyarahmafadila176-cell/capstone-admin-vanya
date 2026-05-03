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
      <section className="dashboard__stats" aria-label="Ringkasan laporan">
        <article className="dashboard__stat-card">
          <p className="dashboard__stat-label">Total Laporan</p>
          <p className="dashboard__stat-value">{stats.total}</p>
        </article>
        <article className="dashboard__stat-card">
          <p className="dashboard__stat-label">Diproses</p>
          <p className="dashboard__stat-value">{stats.diproses}</p>
        </article>
        <article className="dashboard__stat-card">
          <p className="dashboard__stat-label">Selesai</p>
          <p className="dashboard__stat-value">{stats.selesai}</p>
        </article>
        <article className="dashboard__stat-card">
          <p className="dashboard__stat-label">Ditolak</p>
          <p className="dashboard__stat-value">{stats.ditolak}</p>
        </article>
      </section>

      <div className="dashboard__section-title">Data Laporan</div>

      <div className="dashboard__toolbar">
        <label className="dashboard__search">
          <span className="visually-hidden">Cari laporan</span>
          <span className="dashboard__search-icon" aria-hidden>
            <IconSearch />
          </span>
          <input
            type="search"
            className="aduin-input dashboard__search-input"
            placeholder="Cari judul, pelapor, atau kategori…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </label>
        <button
          type="button"
          className="aduin-btn aduin-btn--primary dashboard__filter-btn"
          onClick={() => setFilterOpen((v) => !v)}
          aria-expanded={filterOpen}
        >
          Filter
        </button>
      </div>

      {filterOpen ? (
        <div className="dashboard__filter-panel" role="region" aria-label="Filter kategori">
          <label className="dashboard__filter-field">
            <span>Kategori</span>
            <select
              className="aduin-input dashboard__select"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            >
              <option value="">Semua kategori</option>
              {REPORT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          {kategori ? (
            <button
              type="button"
              className="aduin-link dashboard__filter-clear"
              onClick={() => setKategori('')}
            >
              Hapus filter kategori
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="dashboard__table-wrap" role="region" aria-label="Daftar laporan">
        <table className="dashboard__table">
          <thead>
            <tr>
              <th scope="col">Laporan</th>
              <th scope="col" className="dashboard__th-cat">
                Kategori
              </th>
              <th scope="col" className="dashboard__th-status">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className="dashboard__cell-main">
                    <span className="dashboard__date">{r.tanggalLabel}</span>
                    <span className="dashboard__name">{r.pelapor}</span>
                    <span className="dashboard__title">{r.judul}</span>
                    <span className="dashboard__cat-mobile">{r.kategori}</span>
                    <Link to={`/laporan/${r.id}`} className="dashboard__detail-link">
                      Detail Laporan…
                    </Link>
                  </div>
                </td>
                <td className="dashboard__td-cat">{r.kategori}</td>
                <td className="dashboard__td-status">
                  <span className={`dashboard__badge dashboard__badge--${badgeKind(r.status)}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 ? (
        <p className="dashboard__empty">Tidak ada laporan yang cocok dengan filter.</p>
      ) : null}
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
