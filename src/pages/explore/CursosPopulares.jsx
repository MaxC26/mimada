import { CourseCard } from '../../components/utils/CourseCard'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/rutas'
import { useEffect, useState } from 'react'
import { getCursosPopulares } from '../../services/cursos'

const CursosPopulares = () => {
  const navigate = useNavigate()
  const [cursos, setCursos] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    getPopulares()
  }, [])

  const getPopulares = async () => {
    try {
      const response = await getCursosPopulares()
      setCursos(response.data)
    } catch (error) {
      console.error('Error al obtener cursos populares:', error)
    }
  }

  const handleVerDetalle = (course) => {
    navigate(routes.explore.detalle.replace(':id', course.id), {
      state: { curso: course },
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {' '}
      <div className='mb-8 flex flex-col md:flex-row md:items-end md:justify-between pt-6'>
        <div>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Cursos Populares</h2>
          <p className='text-gray-500'>Nuestra selección para potenciar tu talento</p>
        </div>
        <button
          onClick={() => navigate(routes.explore.cursos)}
          className='hidden md:flex items-center text-[#c2a381] font-bold hover:underline mt-4 md:mt-0 transition-all text-lg'
        >
          Ver todos <span className='ml-1 text-2xl'>→</span>
        </button>
      </div>
      {/* Grid de Cursos */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16'>
        {cursos.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            onClick={() => handleVerDetalle(course)}
          />
        ))}
      </div>
      {/* Ver todos – móvil */}
      <div className='md:hidden w-full flex justify-center mb-10'>
        <button
          onClick={() => navigate(routes.explore.cursos)}
          className='inline-flex items-center text-[#c2a381] font-bold hover:underline bg-white px-8 py-3.5 rounded-full shadow-sm border border-gray-200 w-full justify-center'
        >
          Ver todos los cursos
        </button>
      </div>
    </div>
  )
}

export default CursosPopulares
