import { useEffect, useState } from 'react'
import {
  IconSearch,
  IconClockHour4,
  IconCertificate,
  IconUsersGroup,
} from '@tabler/icons-react'
import LoadingSpinner from '../../components/utils/LoadingSpinner'
import Banner from './Banner'
import CursosPopulares from './CursosPopulares'
import { getCursosPopulares } from '../../services/cursos'

const ExploreListPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cursosPopulares, setCursosPopulares] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [cursosResult] = await Promise.allSettled([getCursosPopulares()])
      console.log('🚀 ~ fetchData ~ cursosResult:', cursosResult)

      if (cursosResult.status === 'fulfilled') {
        setCursosPopulares(cursosResult.value.data ?? [])
      } else {
        const status = cursosResult.reason?.response?.status
        if (status === 404) {
          setCursosPopulares([])
        } else {
          console.error('Error cargando cursos populares:', cursosResult.reason)
          setCursosPopulares([])
        }
      }
    } catch (err) {
      console.error('Error inesperado:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Barra de Búsqueda Móvil */}
      <div className='md:hidden w-full px-4 mb-6 relative'>
        <div className='absolute inset-y-0 left-4 pl-3 flex items-center pointer-events-none'>
          <IconSearch size={18} className='text-gray-400' />
        </div>
        <input
          type='text'
          placeholder='¿Qué quieres aprender hoy?'
          className='w-full pl-10 pr-4 py-3 border border-gray-100 shadow-sm bg-white rounded-xl text-sm outline-none focus:border-[#c2a381] transition-all'
        />
      </div>

      <div className='max-w-7xl mx-auto px-4 lg:px-8'>
        {isLoading ? (
          <div className='flex justify-center items-center min-h-[50vh]'>
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            {/* Hero Banner */}
            <Banner />

            {/* Section Title */}
            <CursosPopulares cursos={cursosPopulares} />

            {/* Sección Beneficios */}
            <div className='mt-12 mb-8 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
                <div className='flex flex-col items-center'>
                  <div className='w-16 h-16 rounded-full bg-[#faf7f5] flex items-center justify-center mb-4 text-[#c2a381] shadow-inner'>
                    <IconClockHour4 size={32} stroke={1.5} />
                  </div>
                  <h3 className='font-bold text-gray-900 text-lg mb-2'>
                    Aprende a tu ritmo
                  </h3>
                  <p className='text-gray-500 text-sm max-w-xs'>
                    Acceso de por vida a tu contenido, sin presiones ni horarios fijos.
                    ¡Tú decides!
                  </p>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='w-16 h-16 rounded-full bg-[#faf7f5] flex items-center justify-center mb-4 text-[#c2a381] shadow-inner'>
                    <IconCertificate size={32} stroke={1.5} />
                  </div>
                  <h3 className='font-bold text-gray-900 text-lg mb-2'>
                    Certificación Oficial
                  </h3>
                  <p className='text-gray-500 text-sm max-w-xs'>
                    Mejora tu currículum obteniendo certificados avalados al terminar cada
                    módulo.
                  </p>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='w-16 h-16 rounded-full bg-[#faf7f5] flex items-center justify-center mb-4 text-[#c2a381] shadow-inner'>
                    <IconUsersGroup size={32} stroke={1.5} />
                  </div>
                  <h3 className='font-bold text-gray-900 text-lg mb-2'>Comunidad VIP</h3>
                  <p className='text-gray-500 text-sm max-w-xs'>
                    Conecta con maestras y alumnas, comparte tu progreso y recibe feedback
                    exclusivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ExploreListPage

