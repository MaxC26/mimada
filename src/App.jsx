import { useEffect } from 'react'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { routes } from './utils/rutas'

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
    })
  }, [])

  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.settings} element={<DashboardPage />} />
    </Routes>
  )
}

export default App
