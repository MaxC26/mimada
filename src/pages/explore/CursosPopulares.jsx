import { CourseCard } from '../../components/utils/CourseCard'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/rutas'
import { useEffect } from 'react'
import { IconSparkles } from '@tabler/icons-react'

const CursosPopulares = ({ cursos, categorias }) => {
  const navigate = useNavigate()
  // const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleVerDetalle = (course) => {
    navigate(routes.explore.detalle.replace(':id', course.cursoId), {
      state: { curso: course },
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Categorías (Pills) */}
      {/* <div className='flex overflow-x-auto pb-4 mb-4 gap-3 hide-scrollbar'>
        {categorias?.map((cat) => (
          <button
            key={cat.categoriaId}
            onClick={() => setActiveCategory(cat.categoriaId)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-base font-semibold transition-colors border shadow-sm ${
              cat.categoriaId === activeCategory
                ? 'bg-[#c2a381] text-white border-[#c2a381]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#c2a381] hover:text-[#c2a381]'
            }`}
          >
            {cat.nombre}
          </button>
        ))}
      </div> */}

      <div className='mb-8 flex flex-col md:flex-row md:items-end md:justify-between pt-6'>
        <div>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Cursos Populares</h2>
          <p className='text-gray-500'>Nuestra selección para potenciar tu talento</p>
        </div>
        <button
          onClick={() => navigate(routes.explore.cursos)}
          className='hidden md:flex items-center text-[#c2a381] font-bold mt-4 md:mt-0 transition-all text-lg'
        >
          <span className='hover:underline'>Ver todos</span>
          <span className='ml-1 text-2xl no-underline'>→</span>
        </button>
      </div>
      {/* Grid de Cursos */}
      {cursos?.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 mb-10 bg-white rounded-3xl border border-dashed border-[#c2a381]/40 text-center px-6'>
          <div className='w-20 h-20 rounded-full bg-[#faf7f5] flex items-center justify-center mb-5 text-[#c2a381]'>
            <IconSparkles size={36} stroke={1.3} />
          </div>
          <h3 className='text-xl font-bold text-gray-800 mb-2'>
            Aún no hay cursos destacados
          </h3>
          <p className='text-gray-400 text-sm max-w-xs leading-relaxed'>
            Estamos preparando contenido increíble para ti. ¡Vuelve pronto!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16'>
          {cursos?.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onClick={() => handleVerDetalle(course)}
            />
          ))}
        </div>
      )}
      {/* Ver todos – móvil */}
      <div className='md:hidden w-full flex justify-center mb-10'>
        <button
          onClick={() => navigate(routes.explore.cursos)}
          className='inline-flex items-center text-[#c2a381] font-bold hover:underline bg-white px-8 py-3.5 rounded-full shadow-sm border border-gray-200 w-full justify-center'
        >
          Ver todos los cursos
        </button>
      </div>
    </>
  )
}

export default CursosPopulares
