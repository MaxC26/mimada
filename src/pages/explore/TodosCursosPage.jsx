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
    category: 'MAQUILLAJE',
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
    category: 'SKINCARE',
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
    category: 'UÑAS',
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
    category: 'CABELLO',
  },
  {
    id: 5,
    title: 'Tratamiento Facial con Vitamina C',
    author: 'Dra. Camila Vega • Esteticista',
    rating: '4.6',
    reviews: '310',
    hours: '6',
    price: '28.00',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop',
    category: 'TRATAMIENTOS FACIALES',
  },
  {
    id: 6,
    title: 'Colorimetría y Tintes Profesionales',
    author: 'Gabriela Colores • Colorista',
    rating: '4.8',
    reviews: '760',
    hours: '14',
    price: '60.00',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop',
    category: 'CABELLO',
  },
  {
    id: 7,
    title: 'Microblading Profesional',
    author: 'Andrea Brows • PMU Artist',
    rating: '4.9',
    reviews: '980',
    hours: '18',
    price: '75.00',
    image: 'https://images.unsplash.com/photo-1614786269829-d24616faf56d?q=80&w=2070&auto=format&fit=crop',
    category: 'MAQUILLAJE',
  },
  {
    id: 8,
    title: 'Nail Art Diseños Avanzados',
    author: 'Fernanda Nail • Nail Artist',
    rating: '4.7',
    reviews: '1.5k',
    hours: '12',
    price: '45.00',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop',
    category: 'UÑAS',
  },
]

const TodosCursosPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(0)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  const filtered = mockCourses.filter((c) => {
    const matchCat =
      activeCategory === 0 ||
      c.category.toLowerCase() === categories[activeCategory].toUpperCase().toLowerCase()
    const matchSearch =
      !search || c.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleVerDetalle = (course) => {
    navigate(routes.explore.detalle.replace(':id', course.id), { state: { curso: course } })
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
          <IconArrowLeft size={16} className='group-hover:-translate-x-0.5 transition-transform' />
          Volver al inicio
        </button>

        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
          <div>
            <h1 className='text-3xl md:text-4xl font-black text-gray-900 leading-tight'>
              Todos los <span className='text-[#c2a381]'>Cursos</span>
            </h1>
            <p className='text-gray-500 mt-1'>{mockCourses.length} cursos disponibles para ti</p>
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
        <div className='flex overflow-x-auto pb-1 gap-2 hide-scrollbar flex-1'>
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors border shadow-sm ${
                index === activeCategory
                  ? 'bg-[#c2a381] text-white border-[#c2a381]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#c2a381] hover:text-[#c2a381]'
              }`}
            >
              {cat}
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
              key={course.id}
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
