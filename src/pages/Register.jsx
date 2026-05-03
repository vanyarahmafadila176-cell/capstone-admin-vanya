import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import './Register.css'

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="register-page">
      <header className="register-page__header">
        <Logo size="medium" />
      </header>
      <main className="register-page__main">
        <h1 className="register-page__title">Sign up</h1>
        <form className="register-page__form" onSubmit={handleSubmit} noValidate>
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
            <span className="visually-hidden">Email</span>
            <input
              className="aduin-input"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="aduin-field">
            <span className="visually-hidden">Password</span>
            <input
              className="aduin-input"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="aduin-field">
            <span className="visually-hidden">Ulang password</span>
            <input
              className="aduin-input"
              name="password2"
              type="password"
              autoComplete="new-password"
              placeholder="masukkan ulang password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </label>
          <button type="submit" className="aduin-btn aduin-btn--primary register-page__submit">
            Sign up
          </button>
        </form>
        <p className="register-page__login">
          Sudah punya akun?{' '}
          <Link to="/login" className="aduin-link aduin-link--inline">
            Login
          </Link>
        </p>
      </main>
    </div>
  )
}
