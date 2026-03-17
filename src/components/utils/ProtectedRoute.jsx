import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { routes } from '../../utils/rutas'
import { useEffect } from 'react'
import { isTokenExpired } from '../../utils/utils'
import { logout } from '../../services/login'

const ProtectedRoute = () => {
  const navigate = useNavigate()

  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    if (jwt) {
      const isExpired = isTokenExpired(jwt)
      if (isExpired) {
        logout()
      }
    }
  }, [jwt, navigate])

  if (!jwt) {
    return <Navigate to={routes.login} state={{ from: location.pathname }} replace /> // Redirige si no hay token
  }

  return <Outlet />
}

export default ProtectedRoute
