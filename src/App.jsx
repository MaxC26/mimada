import { Toaster } from 'sonner'
import './App.css'
import Home from './pages/Home'
import Explore from './pages/Explore'
import { BottomNav } from './components/nabvar/BottomNav'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { routes } from './utils/rutas'
import ProtectedRoute from './components/utils/ProtectedRoute'
import { HomeInicioPage } from './pages/previsualizar/HomeInicioPage'
import HomeHistoriaPage from './pages/previsualizar/HomeHistoriaPage'
import HomeServicioPage from './pages/previsualizar/HomeServicioPage'
import NotFoundPage from './pages/NotFoundPage'
import NotAllowedPage from './pages/NotAllowedPage'
import { ROLES, SECCIONES_DASHBOARD } from './utils/constantes'
import { decodeToken } from './utils/utils'
import SubirVideoSection from './pages/dashboard/SubirVideoSection'
import ContenidoSection from './pages/dashboard/ContenidoSection'
import Cursos from './components/settings/Cursos'
import { Inicio } from './components/settings/Inicio'
import Servicios from './components/settings/Servicios'
import Historia from './components/settings/Historia'
import Categorias from './components/settings/Categorias'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const jwt = localStorage.getItem('jwt')
  const rol = (decodeToken(jwt)?.rol || '').toLowerCase()

  const hideBottomNav = [routes.login, routes.settings].some((r) =>
    location.pathname.startsWith(r),
  )

  return (
    <>
      <Routes>
        <Route path={routes.inicio} element={<Home />} />
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.explorar} element={<Explore />} />
        <Route path={routes.login} element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          {/* Dashboard con rutas anidadas */}
          {rol === ROLES.ADMINISTRADOR ? (
            <Route path={routes.settings} element={<DashboardPage />}>
              <Route index element={<Navigate to={routes.dashboard.inicio} replace />} />
              <Route
                path={routes.dashboard.inicio}
                element={
                  <ContenidoSection seccion={SECCIONES_DASHBOARD.INICIO}>
                    {(contenido, setIsLoading) => (
                      <Inicio contenido={contenido} setIsLoading={setIsLoading} />
                    )}
                  </ContenidoSection>
                }
              />
              <Route
                path={routes.dashboard.servicios}
                element={
                  <ContenidoSection seccion={SECCIONES_DASHBOARD.SERVICIOS}>
                    {(contenido, setIsLoading) => (
                      <Servicios contenido={contenido} setIsLoading={setIsLoading} />
                    )}
                  </ContenidoSection>
                }
              />
              <Route
                path={routes.dashboard.historia}
                element={
                  <ContenidoSection seccion='historia'>
                    {(contenido, setIsLoading) => (
                      <Historia contenido={contenido} setIsLoading={setIsLoading} />
                    )}
                  </ContenidoSection>
                }
              />
              <Route
                path={routes.dashboard.cursos}
                element={
                  <Cursos
                    onNuevoCurso={() => navigate(routes.dashboard.nuevoCurso)}
                    onEditCurso={(curso) =>
                      navigate(routes.dashboard.editarCurso.replace(':id', curso.id), {
                        state: { curso },
                      })
                    }
                  />
                }
              />
              <Route path={routes.dashboard.nuevoCurso} element={<SubirVideoSection />} />
              <Route
                path={routes.dashboard.editarCurso}
                element={<SubirVideoSection />}
              />
              <Route path={routes.dashboard.categorias} element={<Categorias />} />
            </Route>
          ) : (
            <Route path={routes.settings + '/*'} element={<NotAllowedPage />} />
          )}

          <Route path={routes.previsualizarInicio} element={<HomeInicioPage />} />
          <Route path={routes.previsualizarHistoria} element={<HomeHistoriaPage />} />
          <Route path={routes.previsualizarServicio} element={<HomeServicioPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      <Toaster className='ps-1' position='top-right' richColors='true' />
      {!hideBottomNav && <BottomNav />}
    </>
  )
}

export default App
