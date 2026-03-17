import Footer from '../components/Footer'
import { Navbar } from '../components/nabvar/Navbar'
import { CourseCard } from '../components/utils/CourseCard'
import CursoDetalle from '../components/settings/CursoDetalle'
import { useEffect, useState } from 'react'
import { IconSearch, IconClockHour4, IconCertificate, IconUsersGroup } from '@tabler/icons-react'
import LoadingSpinner from '../components/utils/LoadingSpinner'

const Explore = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cursoPag, setCursoPag] = useState('lista')
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null)

  const handleVerDetalle = (course) => {
    setCursoSeleccionado(course)
    setCursoPag('detalle')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleVolver = () => {
    setCursoPag('lista')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const categories = ['Todos', 'Maquillaje', 'Skincare', 'Uñas', 'Cabello', 'Tratamientos Faciales']
  
  const mockCourses = [
    {
      id: 1,
      title: 'Maquillaje Editorial Avanzado',
      author: 'Elena Martinez • Expert Artist',
      rating: '4.9',
      reviews: '1.2k',
      hours: '12',
      price: '49.99',
      image: 'https://images.unsplash.com/photo-1512496015851-a1fa8bcd4d89?q=80&w=2070&auto=format&fit=crop',
      category: 'MAQUILLAJE'
    },
    {
      id: 2,
      title: 'Rutinas de Skincare Coreano',
      author: 'Dra. Sofía Rico • Dermatóloga',
      rating: '4.8',
      reviews: '850',
      hours: '8',
      price: '35.00',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1974&auto=format&fit=crop',
      category: 'SKINCARE'
    },
    {
      id: 3,
      title: 'Masterclass en Uñas Polygel',
      author: 'Valeria Uñas • Tech Master',
      rating: '4.7',
      reviews: '2.1k',
      hours: '15',
      price: '55.00',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2095&auto=format&fit=crop',
      category: 'UÑAS'
    },
    {
      id: 4,
      title: 'Peinados para Novias',
      author: 'Lucía Trend • Hair Stylist',
      rating: '5.0',
      reviews: '420',
      hours: '10',
      price: '42.00',
      image: 'https://images.unsplash.com/photo-1560015534-cee980ba7e13?q=80&w=1974&auto=format&fit=crop',
      category: 'CABELLO'
    }
  ]

  return (
    <div className='flex min-h-screen bg-gray-50 flex-col font-sans'>
      {/* Indicamos al Navbar que está en modo Explorar */}
      <Navbar isExplore={true} />
      
      {/* Contenido principal */}
      <main className='flex-grow w-full pt-20 md:pt-28 pb-16'>

        {/* ── Vista Detalle de Curso ── */}
        {cursoPag === 'detalle' && (
          <div className='max-w-6xl mx-auto px-4 lg:px-8'>
            <CursoDetalle curso={cursoSeleccionado} onBack={handleVolver} />
          </div>
        )}

        {/* ── Vista Lista / Explorar ── */}
        {cursoPag === 'lista' && (
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
          
          {/* Spinner o Contenido Principal */}
          {isLoading ? (
            <div className='flex justify-center items-center min-h-[50vh]'>
              <LoadingSpinner />
            </div>
          ) : (
            <div>
              {/* Hero Banner Cursos */}
              <div className='w-full bg-[#faf7f5] rounded-[2rem] p-8 md:p-12 mb-10 md:mb-14 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden'>
                <div className='w-full md:w-1/2 z-10'>
                  <h1 className='text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-4 tracking-tight'>
                    Domina el arte de <br className='hidden md:block'/>la <span className='text-[#c2a381]'>belleza</span>
                  </h1>
                  <p className='text-gray-600 text-lg md:text-xl mb-8 max-w-md'>
                    Aprende con las mejores expertas de la industria desde la comodidad de tu casa.
                  </p>
                  <button className='bg-[#c2a381] text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full md:w-auto shadow-md'>
                    Empieza Ahora
                  </button>
                </div>
                {/* Imagen Decorativa Hero */}
                <div className='w-full md:w-5/12 mt-10 md:mt-0 relative z-10'>
                   <div className='relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-[2rem] shadow-2xl origin-bottom-right md:rotate-3 hover:rotate-0 transition-transform duration-500'>
                     <img src='https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop' alt='Makeup Courses' className='w-full h-full object-cover'/>
                   </div>
                </div>
              </div>

              {/* Categorías (Pills) */}
              <div className='flex overflow-x-auto pb-4 mb-4 gap-3 hide-scrollbar'>
                {categories.map((cat, index) => (
                  <button 
                    key={index} 
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-base font-semibold transition-colors border shadow-sm ${index === 0 ? 'bg-[#c2a381] text-white border-[#c2a381]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#c2a381] hover:text-[#c2a381]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Section Tittle */}
              <div className='mb-8 flex flex-col md:flex-row md:items-end md:justify-between pt-6'>
                <div>
                  <h2 className='text-3xl font-bold text-gray-900 mb-2'>Cursos Populares</h2>
                  <p className='text-gray-500'>Nuestra selección para potenciar tu talento</p>
                </div>
                <a href="#" className='hidden md:flex items-center text-[#c2a381] font-bold hover:underline mt-4 md:mt-0 transition-all text-lg'>
                  Ver todos <span className='ml-1 text-2xl'>→</span>
                </a>
              </div>

              {/* Grid de Cursos */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16'>
                {mockCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    {...course}
                    onClick={() => handleVerDetalle(course)}
                  />
                ))}
              </div>
              
              <div className='md:hidden w-full flex justify-center mb-10'>
                <a href="#" className='inline-flex items-center text-[#c2a381] font-bold hover:underline bg-white px-8 py-3.5 rounded-full shadow-sm border border-gray-200 w-full justify-center'>
                  Ver todos los cursos
                </a>
              </div>

              {/* Sección Beneficios Cursos */}
              <div className='mt-12 mb-8 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
                  <div className='flex flex-col items-center'>
                    <div className='w-16 h-16 rounded-full bg-[#faf7f5] flex items-center justify-center mb-4 text-[#c2a381] shadow-inner'>
                      <IconClockHour4 size={32} stroke={1.5} />
                    </div>
                    <h3 className='font-bold text-gray-900 text-lg mb-2'>Aprende a tu ritmo</h3>
                    <p className='text-gray-500 text-sm max-w-xs'>Acceso de por vida a tu contenido, sin presiones ni horarios fijos. ¡Tú decides!</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='w-16 h-16 rounded-full bg-[#faf7f5] flex items-center justify-center mb-4 text-[#c2a381] shadow-inner'>
                      <IconCertificate size={32} stroke={1.5} />
                    </div>
                    <h3 className='font-bold text-gray-900 text-lg mb-2'>Certificación Oficial</h3>
                    <p className='text-gray-500 text-sm max-w-xs'>Mejora tu currículum obteniendo certificados avalados al terminar cada módulo.</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='w-16 h-16 rounded-full bg-[#faf7f5] flex items-center justify-center mb-4 text-[#c2a381] shadow-inner'>
                      <IconUsersGroup size={32} stroke={1.5} />
                    </div>
                    <h3 className='font-bold text-gray-900 text-lg mb-2'>Comunidad VIP</h3>
                    <p className='text-gray-500 text-sm max-w-xs'>Conecta con maestras y alumnas, comparte tu progreso y recibe feedback exclusivo.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
          </>
        )}

      </main>

      <Footer />
    </div>
  )
}

export default Explore
