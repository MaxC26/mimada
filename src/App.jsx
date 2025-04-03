import { useEffect, useState } from 'react'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { routes } from './utils/rutas'
import { getAllContenido } from './services/contenido'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [contenido, setContenido] = useState([])
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      once: true,
    })

    {
      /* Solo si voy al home*/
    }
    if (location.pathname === routes.home) {
      setIsLoading(true)
      getContent()
    }
  }, [location.pathname])

  const getContent = async () => {
    const content = await getAllContenido()
    setContenido(content.data)
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && location.pathname === routes.home ? (
        <div>Cargando...</div>
      ) : (
        <Routes>
          <Route path={routes.home} element={<Home contenido={contenido} />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.settings} element={<DashboardPage />} />
        </Routes>
      )}
    </>
  )
}

export default App

