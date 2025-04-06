import { useEffect, useState } from 'react'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { routes } from './utils/rutas'
import ProtectedRoute from './components/utils/ProtectedRoute'
import { jwtDecode } from 'jwt-decode'
import { HomeInicioPage } from './pages/previsualizar/HomeInicioPage'
import HomeHistoriaPage from './pages/previsualizar/HomeHistoriaPage'
import HomeServicioPage from './pages/previsualizar/HomeServicioPage'

function App() {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  if (token) {
    const decoded = jwtDecode(token)
    const isExpired = decoded.exp < Date.now() / 1000
    if (isExpired) {
      localStorage.removeItem('token')
      navigate(routes.login)
    }
  }

  useEffect(() => {
    AOS.init({
      once: true,
    })
  }, [])

  return (
    <>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path={routes.settings} element={<DashboardPage />} />
          <Route path={routes.previsualizarInicio} element={<HomeInicioPage />} />
          <Route path={routes.previsualizarHistoria} element={<HomeHistoriaPage />} />
          <Route path={routes.previsualizarServicio} element={<HomeServicioPage />} />
        </Route>
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App

