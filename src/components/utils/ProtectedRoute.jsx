import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { routes } from '../../utils/rutas'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <div className='min-h-screen flex items-center justify-center text-[#c2a381]'>Cargando...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to={routes.login} state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
