import { useEffect, useState } from 'react'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import { routes } from './utils/rutas'
import { getAllContenido } from './services/contenido'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [contenido, setContenido] = useState([])

  useEffect(() => {
    getContent()
    AOS.init({
      once: true,
    })
  }, [])

  const getContent = async () => {
    const content = await getAllContenido()
    setContenido(content.data)
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
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
