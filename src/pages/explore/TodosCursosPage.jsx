import { CourseCard } from '../../components/utils/CourseCard'
import { useEffect, useState } from 'react'
import {
  IconSearch,
  IconArrowLeft,
  IconAdjustmentsHorizontal,
  IconSortDescending,
} from '@tabler/icons-react'
import LoadingSpinner from '../../components/utils/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/rutas'
import { getCategoriasCurso, getCursos } from '../../services/cursos'

const TodosCursosPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cursos, setCursos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [activeCategory, setActiveCategory] = useState(0)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [categoriasResult, cursosResult] = await Promise.allSettled([
        getCategoriasCurso(),
        getCursos(),
      ])

      if (cursosResult.status === 'fulfilled') {
        setCursos(cursosResult.value.data ?? [])
      } else {
        console.error('Error cargando cursos:', cursosResult.reason)
      }

      if (categoriasResult.status === 'fulfilled') {
        setCategorias(categoriasResult.value.data ?? [])
      } else {
        console.error('Error cargando categorías:', categoriasResult.reason)
      }
    } catch (err) {
      console.error('Error inesperado:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const filtered = cursos.filter((c) => {
    const matchCat = activeCategory === 0 || c.categoriaId === activeCategory
    const matchSearch = !search || c.titulo.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleVerDetalle = (course) => {
    navigate(routes.explore.detalle.replace(':id', course.cursoId), {
      state: { curso: course },
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='max-w-7xl mx-auto px-4 lg:px-8'>
      {/* Header */}
      <div className='mb-8'>
        <button
          onClick={() => navigate(routes.explore.inicio)}
          className='flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#c2a381] transition-colors mb-5 group'
        >
          <IconArrowLeft
            size={16}
            className='group-hover:-translate-x-0.5 transition-transform'
          />
          Volver al inicio
        </button>

        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
          <div>
            <h1 className='text-3xl md:text-4xl font-black text-gray-900 leading-tight'>
              Todos los <span className='text-[#c2a381]'>Cursos</span>
            </h1>
            <p className='text-gray-500 mt-1'>
              {cursos.length} cursos disponibles para ti
            </p>
          </div>

          {/* Barra de búsqueda escritorio */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
              <IconSearch size={16} className='text-gray-400' />
            </div>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Buscar cursos…'
              className='pl-9 pr-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm outline-none focus:border-[#c2a381] transition-all w-64 shadow-sm'
            />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className='flex items-center gap-3 mb-6 flex-wrap'>
        <div className='flex overflow-x-auto pb-4 mb-4 gap-3 hide-scrollbar flex-1'>
          {[{ categoriaId: 0, nombre: 'Todos' }, ...(categorias || [])].map((cat) => (
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
        </div>
        <button className='flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-600 font-semibold hover:border-[#c2a381] hover:text-[#c2a381] transition-colors shadow-sm shrink-0'>
          <IconAdjustmentsHorizontal size={15} />
          Filtros
        </button>
        <button className='flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-600 font-semibold hover:border-[#c2a381] hover:text-[#c2a381] transition-colors shadow-sm shrink-0'>
          <IconSortDescending size={15} />
          Ordenar
        </button>
      </div>

      {/* Contenido */}
      {isLoading ? (
        <div className='flex justify-center items-center min-h-[40vh]'>
          <LoadingSpinner />
        </div>
      ) : filtered.length === 0 ? (
        <div className='flex flex-col items-center justify-center min-h-[30vh] text-gray-400 gap-3'>
          <IconSearch size={48} stroke={1} />
          <p className='text-lg font-semibold'>No se encontraron cursos</p>
          <p className='text-sm'>Intenta con otra categoría o término de búsqueda.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16'>
          {filtered.map((course) => (
            <CourseCard
              key={course.cursoId}
              {...course}
              onClick={() => handleVerDetalle(course)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TodosCursosPage

