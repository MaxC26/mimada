import { useState } from 'react'
import {
  IconPlus,
  IconStar,
  IconUsers,
  IconChevronLeft,
  IconChevronRight,
  IconCurrencyEuro,
  IconEdit,
  IconChartBar,
} from '@tabler/icons-react'

/* ── Datos mock ── */
const CURSOS = [
  {
    id: 1,
    titulo: 'Maquillaje Profesional de Novias',
    nivel: 'Intermedio',
    lecciones: 24,
    estado: 'publicado',
    estudiantes: 1248,
    estudiantesMes: '+12 este mes',
    ganancias: 14500,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    titulo: 'Cuidado de la Piel: Rutinas Avanzadas',
    nivel: 'Experto',
    lecciones: 18,
    estado: 'publicado',
    estudiantes: 856,
    estudiantesMes: '+5 este mes',
    ganancias: 9820,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3,
    titulo: 'Nail Art: Diseños de Temporada',
    nivel: 'Principiante',
    lecciones: 12,
    estado: 'borrador',
    estudiantes: null,
    estudiantesMes: null,
    ganancias: null,
    rating: null,
    thumbnail: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 4,
    titulo: 'Colorimetría y Balayage Masterclass',
    nivel: 'Avanzado',
    lecciones: 32,
    estado: 'publicado',
    estudiantes: 2104,
    estudiantesMes: '+42 este mes',
    ganancias: 32450,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1512646605205-78422b7c7896?q=80&w=200&auto=format&fit=crop',
  },
]

const STATS = [
  { label: 'TOTAL ESTUDIANTES', valor: '4,208', cambio: '+14% desde el mes pasado', icon: IconUsers,         color: 'text-[#e43c8a]', bg: 'bg-[#fdf2f8]' },
  { label: 'GANANCIAS TOTALES', valor: '€56,770',cambio: '+8% desde el mes pasado',  icon: IconCurrencyEuro, color: 'text-[#e43c8a]', bg: 'bg-[#fdf2f8]' },
  { label: 'CALIFICACIÓN PROMEDIO', valor: '4.8 / 5.0', cambio: 'Basado en 250 reseñas', icon: IconStar, color: 'text-[#e43c8a]', bg: 'bg-[#fdf2f8]' },
]

const TABS = ['Todos los cursos', 'Publicados', 'Borradores', 'Archivados']

const EstadoBadge = ({ estado }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
    estado === 'publicado' ? 'bg-green-100 text-green-700' :
    estado === 'borrador'  ? 'bg-gray-100 text-gray-600' :
                             'bg-amber-100 text-amber-700'
  }`}>
    {estado === 'publicado' ? 'Publicado' : estado === 'borrador' ? 'Borrador' : 'Archivado'}
  </span>
)

const Cursos = ({ onEditCurso, onNuevoCurso }) => {
  const [tabActivo, setTabActivo] = useState('Todos los cursos')
  const [page, setPage] = useState(1)

  const cursosFiltrados = CURSOS.filter(c => {
    if (tabActivo === 'Publicados') return c.estado === 'publicado'
    if (tabActivo === 'Borradores') return c.estado === 'borrador'
    if (tabActivo === 'Archivados') return c.estado === 'archivado'
    return true
  })

  const conteo = {
    'Todos los cursos': CURSOS.length,
    'Publicados':  CURSOS.filter(c => c.estado === 'publicado').length,
    'Borradores':  CURSOS.filter(c => c.estado === 'borrador').length,
    'Archivados':  CURSOS.filter(c => c.estado === 'archivado').length,
  }

  return (
    <div className='w-full space-y-6'>

      {/* ── Header ── */}
      <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
        <div>
          {/* Solo móvil: saludo */}
          <p className='text-xs font-black text-[#e43c8a] uppercase tracking-widest mb-1 md:hidden'>
            Panel de Instructor
          </p>
          <h2 className='text-2xl md:text-3xl font-black text-gray-900'>Mis Cursos</h2>
          <p className='text-gray-500 text-sm mt-0.5 hidden md:block'>
            Gestiona y analiza el rendimiento de tus formaciones.
          </p>
          <p className='text-gray-500 text-sm mt-0.5 md:hidden'>
            Gestiona tus contenidos y alumnos.
          </p>
        </div>
        <button
          onClick={onNuevoCurso}
          className='flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 rounded-full bg-[#e43c8a] text-white font-bold text-sm shadow-md shadow-[#e43c8a]/30 hover:bg-[#c9246d] hover:-translate-y-0.5 transition-all duration-300 self-start sm:self-auto w-full sm:w-auto'
        >
          <IconPlus size={16} />
          Nuevo Curso
        </button>
      </div>

      {/* ── Filtros ── */}
      {/* Desktop: tabs con borde inferior */}
      <div className='hidden md:flex border-b border-gray-100'>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setTabActivo(tab)}
            className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${tabActivo === tab ? 'border-[#e43c8a] text-[#e43c8a]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab}{conteo[tab] > 0 ? ` (${conteo[tab]})` : ''}
          </button>
        ))}
      </div>

      {/* Móvil: pills */}
      <div className='flex gap-2 overflow-x-auto pb-1 md:hidden'>
        {TABS.filter(t => t !== 'Archivados').map(tab => (
          <button
            key={tab}
            onClick={() => setTabActivo(tab)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${tabActivo === tab ? 'bg-[#e43c8a] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
          >
            {tab === 'Todos los cursos' ? `Todos (${conteo['Todos los cursos']})` : `${tab} (${conteo[tab]})`}
          </button>
        ))}
      </div>

      {/* ── Tabla Desktop ── */}
      <div className='hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        {/* Cabecera */}
        <div className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-3 border-b border-gray-100'>
          {['Detalles del Curso', 'Estado', 'Estudiantes', 'Ganancias', 'Acciones'].map(h => (
            <span key={h} className='text-xs font-black text-gray-400 uppercase tracking-widest'>{h}</span>
          ))}
        </div>

        {/* Filas */}
        <div className='divide-y divide-gray-50'>
          {cursosFiltrados.map(curso => (
            <div key={curso.id} className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-4 items-center hover:bg-gray-50/50 transition-colors'>
              {/* Detalles */}
              <div className='flex items-center gap-3 min-w-0 pr-4'>
                <img src={curso.thumbnail} alt={curso.titulo} className='w-14 h-14 rounded-xl object-cover shrink-0' />
                <div className='min-w-0'>
                  <p className='font-bold text-gray-900 text-sm truncate'>{curso.titulo}</p>
                  <p className='text-xs text-gray-400 mt-0.5'>Nivel: {curso.nivel} · {curso.lecciones} Lecciones</p>
                </div>
              </div>
              {/* Estado */}
              <div><EstadoBadge estado={curso.estado} /></div>
              {/* Estudiantes */}
              <div>
                {curso.estudiantes ? (
                  <>
                    <p className='font-bold text-gray-900 text-sm'>{curso.estudiantes.toLocaleString()}</p>
                    <p className='text-xs text-green-600 font-semibold'>{curso.estudiantesMes}</p>
                  </>
                ) : <span className='text-gray-300 text-lg'>—</span>}
              </div>
              {/* Ganancias */}
              <div>
                {curso.ganancias ? (
                  <p className='font-bold text-gray-900 text-sm'>€{curso.ganancias.toLocaleString()}.00</p>
                ) : <span className='text-gray-300 text-lg'>—</span>}
              </div>
              {/* Acciones */}
              <div>
                <button
                  onClick={() => onEditCurso(curso)}
                  className='text-sm font-bold text-[#e43c8a] hover:underline'
                >
                  {curso.estado === 'borrador' ? 'Continuar' : 'Editar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className='flex items-center justify-between px-6 py-3 border-t border-gray-100'>
          <p className='text-xs text-gray-400'>Mostrando 1–{cursosFiltrados.length} de {CURSOS.length} cursos</p>
          <div className='flex gap-1'>
            <button className='w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30' disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
              <IconChevronLeft size={16} />
            </button>
            <button className='w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50' onClick={() => setPage(p => p + 1)}>
              <IconChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Lista Móvil ── */}
      <div className='md:hidden space-y-4'>
        <p className='font-black text-gray-900'>Cursos activos</p>
        {cursosFiltrados.map(curso => (
          <div key={curso.id} className='bg-white rounded-2xl border border-gray-100 shadow-sm p-4'>
            <div className='flex gap-3 mb-3'>
              <img src={curso.thumbnail} alt={curso.titulo} className='w-20 h-20 rounded-xl object-cover shrink-0' />
              <div className='flex-1 min-w-0'>
                <p className='font-bold text-gray-900 text-sm leading-snug'>{curso.titulo}</p>
                {curso.estudiantes && (
                  <p className='text-xs text-[#e43c8a] font-semibold mt-1 flex items-center gap-1'>
                    <IconUsers size={12} /> {curso.estudiantes.toLocaleString()} estudiantes
                  </p>
                )}
                {curso.rating && (
                  <p className='text-xs text-amber-500 font-semibold mt-0.5 flex items-center gap-1'>
                    <IconStar size={12} fill='currentColor' /> {curso.rating} valoración
                  </p>
                )}
                <div className='mt-1'>
                  <EstadoBadge estado={curso.estado} />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <button
                onClick={() => onEditCurso(curso)}
                className='flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#e43c8a] text-[#e43c8a] text-sm font-bold hover:bg-[#fdf2f8] transition-colors'
              >
                <IconEdit size={14} />
                {curso.estado === 'borrador' ? 'Continuar' : 'Editar'}
              </button>
              <button className='flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors'>
                <IconChartBar size={14} />
                Métricas
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Stats Cards ── */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {STATS.map(({ label, valor, cambio, icon: Icon, color, bg }) => (
          <div key={label} className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
            <div className='flex items-center justify-between mb-3'>
              <p className='text-xs font-black text-gray-500 uppercase tracking-widest'>{label}</p>
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center ${color}`}>
                <Icon size={18} stroke={1.5} />
              </div>
            </div>
            <p className='text-2xl font-black text-gray-900'>{valor}</p>
            <p className='text-xs text-green-600 font-semibold mt-1'>{cambio}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Cursos
