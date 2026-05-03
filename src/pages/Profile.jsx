import { Link } from 'react-router-dom'
import { useSession } from '../context/SessionContext.jsx'
import './Profile.css'

export default function Profile() {
  const { user } = useSession()

  return (
    <div className="profile-page">
      <div className="profile-page__avatar" aria-hidden>
        <span />
      </div>
      <h1 className="profile-page__name">Admin</h1>
      <p className="profile-page__email">{user?.email ?? 'admin@gmail.com'}</p>

      <section className="profile-page__panel" aria-label="Informasi admin">
        <nav className="profile-page__nav">
          <Link to="/dashboard" className="profile-page__nav-link">
            data laporan
          </Link>
          <span className="profile-page__nav-sep" aria-hidden>
            ·
          </span>
          <span className="profile-page__nav-hint">detail laporan lewat daftar</span>
        </nav>
        <p className="profile-page__line">
          <span className="profile-page__key">Nomor Telepon</span>
          <span className="profile-page__val">086483550774</span>
        </p>
        <p className="profile-page__line">
          <span className="profile-page__key">Status</span>
          <span className="profile-page__val">Admin</span>
        </p>
      </section>
    </div>
  )
}
