import { useState } from 'react'
import Footer from '../components/utils/Footer'
import { Head } from '../components/head/Head'
import Body from '../components/home/Body'

import OurStory from '../components/home/OurStory'
import { Navbar } from '../components/nabvar/Navbar'
import { useEffect } from 'react'
import { getAllContenido } from '../services/contenido'
import LoadingSpinner from '../components/utils/LoadingSpinner'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()
  const rol = (user?.rol || '').toLowerCase()
  const userInitials = user
    ? `${user.nombre?.charAt(0) || ''}${user.apellido?.charAt(0) || ''}`
        .toUpperCase()
        .substring(0, 2)
    : 'U'
  const primerNombre = user?.nombre ? user.nombre.split(' ')[0] : 'Usuario'

  const getAllContent = async () => {
    const updatedContent = { ...content } // Copia del estado actual
    try {
      const contenido = await getAllContenido()
      contenido.data.forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(updatedContent, item.llave)) {
          updatedContent[item.llave] = item.valor
        }
      })
      setContent(updatedContent)
    } catch (error) {
      console.error('Error al obtener el contenido:', error)
      toast.error('No se pudo cargar el contenido')
    } finally {
      setIsLoading(false)
    }
  }

  const [content, setContent] = useState({
    imgHead: '',
    textHead: '',
    textHead01: '',
    imgServicio01: '',
    textServicio01: '',
    imgServicio02: '',
    textServicio02: '',
    imgServicio03: '',
    textServicio03: '',
    imgServicio04: '',
    textServicio04: '',
    imgHistoria: '',
    textHistoria: '',
  })

  useEffect(() => {
    getAllContent()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex min-h-screen bg-white'>
      {isLoading ? (
        <div className='flex justify-center items-center w-full'>
          <LoadingSpinner />
        </div>
      ) : (
        <div className='flex flex-col w-full'>
          <Navbar />

          {/* Welcome Section para el usuario logueado */}
          {isAuthenticated && rol === 'usuario' && (
            <div className='w-full bg-white pt-20 md:pt-28 pb-4 relative z-10'>
              <div className='container mx-auto px-4 lg:px-8 flex items-center justify-start gap-4'>
                <div className='flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 text-white font-bold text-2xl tracking-wide'>
                  {userInitials || 'U'}
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-2xl md:text-[28px] font-extrabold text-gray-900 leading-tight tracking-tight'>
                    Hola de nuevo, {primerNombre}
                  </h1>
                </div>
              </div>
            </div>
          )}

          <div className={isAuthenticated && rol === 'usuario' ? '-mt-12 md:-mt-16' : ''}>
            <Head content={content} />
          </div>
          <Body content={content} />
          <OurStory content={content} />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Home
