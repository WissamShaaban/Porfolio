import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'
import { parseGoogleCredential } from '../services/googleAuth'

export default function Login() {
  const { state, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/admin/projects'

  useEffect(() => {
    if (state.isAuthenticated) navigate(from, { replace: true })
  }, [state.isAuthenticated, navigate, from])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 flex flex-col items-center gap-8 w-full max-w-md">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-3xl font-bold text-gray-900">Admin</span>
          <p className="text-gray-500 text-sm">Connectez-vous avec votre compte Google pour accéder au tableau de bord.</p>
        </div>

        <div className="w-16 h-1 bg-yellow-400 rounded-full" />

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              const user = parseGoogleCredential(credentialResponse.credential)
              login(user)
            }
          }}
          onError={() => console.error('Google login failed')}
          shape="pill"
          size="large"
          text="signin_with"
        />

        <p className="text-xs text-gray-400 text-center">
          Seuls les utilisateurs autorisés peuvent accéder à l'administration.
        </p>
      </div>
    </div>
  )
}
