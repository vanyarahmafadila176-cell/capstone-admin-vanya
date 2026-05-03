import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { SplashIllustration } from './SplashIllustration.jsx'
import './Splash.css'

export default function Splash() {
  const navigate = useNavigate()

  return (
    <div className="splash-page">
      <div className="splash-page__art">
        <SplashIllustration />
      </div>
      <div className="splash-page__brand">
        <Logo size="large" />
        <p className="splash-page__tagline">Pusat pengaduan masyarakat</p>
      </div>
      <div className="splash-page__actions">
        <button
          type="button"
          className="aduin-btn aduin-btn--primary splash-page__login"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
      <p className="splash-page__footer">@sobaduin</p>
    </div>
  )
}
