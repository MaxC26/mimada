import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import './App.css'
import Home from './pages/Home'
import Explore from './pages/Explore'
import { BottomNav } from './components/nabvar/BottomNav'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { routes } from './utils/rutas'
import ProtectedRoute from './components/utils/ProtectedRoute'
import { HomeInicioPage } from './pages/previsualizar/HomeInicioPage'
import HomeHistoriaPage from './pages/previsualizar/HomeHistoriaPage'
import HomeServicioPage from './pages/previsualizar/HomeServicioPage'
import NotFoundPage from './pages/NotFoundPage'
import { jwtDecode } from 'jwt-decode'

function App() {
  const location = useLocation()
  const hideBottomNav = [routes.login, routes.settings].some(r =>
    location.pathname.startsWith(r)
  )

  return (
    <>
      <Routes>
        <Route path={routes.inicio} element={<Home />} />
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.explorar} element={<Explore />} />
        <Route path={routes.login} element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path={routes.settings} element={<DashboardPage />} />
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

