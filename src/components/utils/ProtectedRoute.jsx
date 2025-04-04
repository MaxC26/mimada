import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { routes } from '../../utils/rutas'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = () => {
  const navigate = useNavigate()

  const jwt = sessionStorage.getItem('jwt')
  console.log('🚀 ~ ProtectedRoute ~ jwt:', jwt)

  if (jwt) {
    const decoded = jwtDecode(jwt)
    const isExpired = decoded.exp < Date.now() / 1000
    if (isExpired) {
      sessionStorage.removeItem('jwt')
      navigate(routes.login)
    }
  }

  if (!jwt) {
    return <Navigate to={routes.login} state={{ from: location.pathname }} replace /> // Redirige si no hay token
  }

  return <Outlet />
}

export default ProtectedRoute
