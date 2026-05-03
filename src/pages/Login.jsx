import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { useSession } from '../context/SessionContext.jsx'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const { login, user } = useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    const u = username.trim() || 'admin'
    login({ username: u, email: 'admin@gmail.com' })
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="login-page">
      <header className="login-page__header">
        <Logo size="medium" />
      </header>
      <main className="login-page__main">
        <h1 className="login-page__title">Login Admin</h1>
        <form className="login-page__form" onSubmit={handleSubmit} noValidate>
          <label className="aduin-field">
            <span className="visually-hidden">Username</span>
            <input
              className="aduin-input"
              name="username"
              autoComplete="username"
              placeholder="masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="aduin-field">
            <span className="visually-hidden">Password</span>
            <input
              className="aduin-input"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="aduin-btn aduin-btn--primary login-page__submit">
            Login
          </button>
        </form>
        <div className="login-page__links">
          <button type="button" className="aduin-link">
            Lupa password?
          </button>
          <p className="login-page__register">
            <Link to="/register" className="aduin-link aduin-link--inline">
              Belum punya akun? daftar
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
