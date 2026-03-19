import { useEffect, useState } from 'react'
import {
  IconPlus,
  IconStar,
  IconUsers,
  IconChevronLeft,
  IconChevronRight,
  IconCurrencyEuro,
  IconEdit,
  IconChartBar,
  IconPhoto,
} from '@tabler/icons-react'
import { getCursos } from '../../services/cursos'
import { toast } from 'sonner'
import { ESTADOS_CURSO } from '../../utils/constantes'
import LoadingSpinner from '../utils/LoadingSpinner'

const STATS = [
  {
    label: 'TOTAL ESTUDIANTES',
    valor: '4,208',
    cambio: '+14% desde el mes pasado',
    icon: IconUsers,
    color: 'text-[#c2a381]',
    bg: 'bg-[#faf7f5]',
  },
  {
    label: 'GANANCIAS TOTALES',
    valor: '€56,770',
    cambio: '+8% desde el mes pasado',
    icon: IconCurrencyEuro,
    color: 'text-[#c2a381]',
    bg: 'bg-[#faf7f5]',
  },
  {
    label: 'CALIFICACIÓN PROMEDIO',
    valor: '4.8 / 5.0',
    cambio: 'Basado en 250 reseñas',
    icon: IconStar,
    color: 'text-[#c2a381]',
    bg: 'bg-[#faf7f5]',
  },
]

const TABS = ['Todos los cursos', 'Publicados', 'Borradores', 'Archivados']

const CourseImage = ({ src, alt, className, iconSize = 24 }) => {
  const [error, setError] = useState(false)
  if (!src || error) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center shrink-0`}
      >
        <IconPhoto className='text-gray-400' size={iconSize} />
      </div>
    )
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />
}

const EstadoBadge = ({ estado }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
      estado === 'publicado'
        ? 'bg-green-100 text-green-700'
        : estado === 'borrador'
          ? 'bg-gray-100 text-gray-600'
          : 'bg-amber-100 text-amber-700'
    }`}
  >
    {estado}
  </span>
)

const Cursos = ({ onEditCurso, onNuevoCurso }) => {
  const ErrorMessage = (text) => toast.error(text)

  const [tabActivo, setTabActivo] = useState('Todos los cursos')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [cursos, setCursos] = useState([])
  const [noCursos, setNoCursos] = useState(false)

  const cursosFiltrados = cursos.filter((c) => {
    if (tabActivo === 'Publicados')
      return c.estado.toLowerCase() === ESTADOS_CURSO.PUBLICADO
    if (tabActivo === 'Borradores')
      return c.estado.toLowerCase() === ESTADOS_CURSO.BORRADOR
    if (tabActivo === 'Archivados')
      return c.estado.toLowerCase() === ESTADOS_CURSO.ARCHIVADO
    return true
  })

  const conteo = {
    'Todos los cursos': cursos.length,
    Publicados: cursos.filter((c) => c.estado.toLowerCase() === ESTADOS_CURSO.PUBLICADO)
      .length,
    Borradores: cursos.filter((c) => c.estado.toLowerCase() === ESTADOS_CURSO.BORRADOR)
      .length,
    Archivados: cursos.filter((c) => c.estado.toLowerCase() === ESTADOS_CURSO.ARCHIVADO)
      .length,
  }

  /* ── Carga de datos ── */
  useEffect(() => {
    fetchData()

    // eslint-disable-next-line
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    setNoCursos(false)
    try {
      const [cursosResult] = await Promise.allSettled([getCursos()])

      if (cursosResult.status === 'fulfilled') {
        setCursos(cursosResult.value.data)
      } else {
        const status = cursosResult.reason?.response?.status
        if (status === 404) {
          setNoCursos(true)
          setCursos([])
        } else {
          console.error('Error cargando cursos:', cursosResult.reason)
          ErrorMessage('Error al cargar los cursos')
        }
      }
    } catch (err) {
      console.error('Error inesperado:', err)
      ErrorMessage('Error inesperado al cargar los cursos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full space-y-6'>
      {isLoading ? (
        <div className='flex justify-center items-center min-h-[50vh]'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* ── Header ── */}
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
            <div>
              {/* Solo móvil: saludo */}
              <p className='text-xs font-black text-[#c2a381] uppercase tracking-widest mb-1 md:hidden'>
                Panel de Instructor
              </p>
              <h2 className='text-2xl md:text-3xl font-black text-gray-900'>
                Mis Cursos
              </h2>
              <p className='text-gray-500 text-sm mt-0.5 hidden md:block'>
                Gestiona y analiza el rendimiento de tus formaciones.
              </p>
              <p className='text-gray-500 text-sm mt-0.5 md:hidden'>
                Gestiona tus contenidos y alumnos.
              </p>
            </div>
            <button
              onClick={onNuevoCurso}
              className='flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 rounded-full bg-[#c2a381] text-white font-bold text-sm shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:-translate-y-0.5 transition-all duration-300 self-start sm:self-auto w-full sm:w-auto'
            >
              <IconPlus size={16} />
              Nuevo Curso
            </button>
          </div>

          {/* ── Filtros ── */}
          {/* Desktop: tabs con borde inferior */}
          <div className='hidden md:flex border-b border-gray-100'>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setTabActivo(tab)}
                className={`px-5 py-2.5 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${tabActivo === tab ? 'border-[#c2a381] text-[#c2a381]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
                {conteo[tab] > 0 ? ` (${conteo[tab]})` : ''}
              </button>
            ))}
          </div>

          {/* Móvil: pills */}
          <div className='flex gap-2 overflow-x-auto pb-1 md:hidden'>
            {TABS.filter((t) => t !== 'Archivados').map((tab) => (
              <button
                key={tab}
                onClick={() => setTabActivo(tab)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${tabActivo === tab ? 'bg-[#c2a381] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
              >
                {tab === 'Todos los cursos'
                  ? `Todos (${conteo['Todos los cursos']})`
                  : `${tab} (${conteo[tab]})`}
              </button>
            ))}
          </div>

          {/* ── Tabla Desktop ── */}
          <div className='hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <div className='min-w-[1000px]'>
                {/* Cabecera */}
                {cursos.length > 0 && (
                  <div className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] px-6 py-3 border-b border-gray-100'>
                    {[
                      'Detalles del Curso',
                      'Estado',
                      'Precio',
                      'Estudiantes',
                      'Ganancias',
                      'Acciones',
                    ].map((h) => (
                      <span
                        key={h}
                        className='text-xs font-black text-gray-400 uppercase tracking-widest'
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Filas */}
                <div className='divide-y divide-gray-50'>
                  {noCursos || cursosFiltrados.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-16 gap-3 text-center'>
                      <div className='w-14 h-14 rounded-2xl bg-[#faf7f5] flex items-center justify-center'>
                        <IconChartBar size={28} className='text-[#c2a381]' stroke={1.5} />
                      </div>
                      <p className='font-bold text-gray-700 text-sm'>
                        {noCursos
                          ? 'No tienes cursos disponibles aún'
                          : 'No hay cursos en esta categoría'}
                      </p>
                      <p className='text-xs text-gray-400 max-w-xs'>
                        {noCursos
                          ? 'Crea tu primer curso haciendo clic en "Nuevo Curso".'
                          : 'Prueba seleccionando otra pestaña o crea un nuevo curso.'}
                      </p>
                    </div>
                  ) : (
                    cursosFiltrados.map((curso) => (
                      <div
                        key={curso.cursoId}
                        className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] px-6 py-4 items-center hover:bg-gray-50/50 transition-colors'
                      >
                        {/* Detalles */}
                        <div className='flex items-center gap-3 min-w-0 pr-4'>
                          <CourseImage
                            src={curso.imagenPortada}
                            alt={curso.imagenPortada}
                            className='w-14 h-14 rounded-xl object-cover shrink-0'
                            iconSize={24}
                          />
                          <div className='min-w-0'>
                            <p className='font-bold text-gray-900 text-sm truncate'>
                              {curso.titulo}
                            </p>
                            <p className='text-xs text-gray-400 mt-0.5'>
                              Nivel: {curso.nivel} · {curso.lecciones} Lecciones
                            </p>
                          </div>
                        </div>
                        {/* Estado */}
                        <div>
                          <EstadoBadge estado={curso.estado} />
                        </div>
                        {/* Precio */}
                        <div>
                          {curso.precio ? (
                            <>
                              <p className='font-bold text-gray-900 text-sm'>
                                {curso.precio.toLocaleString()}
                              </p>
                              {/* NOTE: Mostrar ganancias */}
                              <p className='text-xs text-green-600 font-semibold'>
                                {curso.precio}
                              </p>
                            </>
                          ) : (
                            <span className='text-gray-300 text-lg'>—</span>
                          )}
                        </div>
                        {/* Estudiantes */}
                        <div>
                          {/* NOTE: Mostrar estudiantes */}
                          {curso.estudiantes ? (
                            <>
                              <p className='font-bold text-gray-900 text-sm'>
                                {curso.estudiantes.toLocaleString()}
                              </p>
                              <p className='text-xs text-green-600 font-semibold'>
                                {curso.estudiantesMes}
                              </p>
                            </>
                          ) : (
                            <span className='text-gray-300 text-lg'>—</span>
                          )}
                        </div>
                        {/* Ganancias */}
                        <div>
                          {/* NOTE: Mostrar ganancias */}
                          {curso.ganancias ? (
                            <p className='font-bold text-gray-900 text-sm'>
                              €{curso.ganancias.toLocaleString()}.00
                            </p>
                          ) : (
                            <span className='text-gray-300 text-lg'>—</span>
                          )}
                        </div>
                        {/* Acciones */}
                        <div>
                          <button
                            onClick={() => onEditCurso(curso)}
                            className='text-sm font-bold text-[#c2a381] hover:underline'
                          >
                            {curso.estado.toLowerCase() === ESTADOS_CURSO.BORRADOR
                              ? 'Continuar'
                              : 'Editar'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Paginación */}
            {cursos.length > 0 && (
              <div className='flex items-center justify-between px-6 py-3 border-t border-gray-100'>
                <p className='text-xs text-gray-400'>
                  Mostrando 1–{cursosFiltrados.length} de {cursos.length} cursos
                </p>
                <div className='flex gap-1'>
                  <button
                    className='w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30'
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <IconChevronLeft size={16} />
                  </button>
                  <button
                    className='w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50'
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <IconChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Lista Móvil ── */}
          <div className='md:hidden space-y-4'>
            <p className='font-black text-gray-900'>Cursos activos</p>
            {noCursos || cursosFiltrados.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-12 gap-3 text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
                <div className='w-12 h-12 rounded-2xl bg-[#faf7f5] flex items-center justify-center'>
                  <IconChartBar size={24} className='text-[#c2a381]' stroke={1.5} />
                </div>
                <p className='font-bold text-gray-700 text-sm'>
                  {noCursos
                    ? 'No tienes cursos disponibles aún'
                    : 'No hay cursos en esta categoría'}
                </p>
                <p className='text-xs text-gray-400'>
                  {noCursos
                    ? 'Crea tu primer curso con el botón "Nuevo Curso".'
                    : 'Prueba seleccionando otra categoría.'}
                </p>
              </div>
            ) : (
              cursosFiltrados.map((curso) => (
                <div
                  key={curso.cursoId}
                  className='bg-white rounded-2xl border border-gray-100 shadow-sm p-4'
                >
                  <div className='flex gap-3 mb-3'>
                    <CourseImage
                      src={curso.thumbnail}
                      alt={curso.titulo}
                      className='w-20 h-20 rounded-xl object-cover shrink-0'
                      iconSize={32}
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='font-bold text-gray-900 text-sm leading-snug'>
                        {curso.titulo}
                      </p>
                      {curso.estudiantes && (
                        <p className='text-xs text-[#c2a381] font-semibold mt-1 flex items-center gap-1'>
                          <IconUsers size={12} /> {curso.estudiantes.toLocaleString()}{' '}
                          estudiantes
                        </p>
                      )}
                      {curso.rating && (
                        <p className='text-xs text-amber-500 font-semibold mt-0.5 flex items-center gap-1'>
                          <IconStar size={12} fill='currentColor' /> {curso.rating}{' '}
                          valoración
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
                      className='flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#c2a381] text-[#c2a381] text-sm font-bold hover:bg-[#faf7f5] transition-colors'
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
              ))
            )}
          </div>

          {/* ── Stats Cards ── */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {STATS.map(({ label, valor, cambio, icon: Icon, color, bg }) => (
              <div
                key={label}
                className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'
              >
                <div className='flex items-center justify-between mb-3'>
                  <p className='text-xs font-black text-gray-500 uppercase tracking-widest'>
                    {label}
                  </p>
                  <div
                    className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center ${color}`}
                  >
                    <Icon size={18} stroke={1.5} />
                  </div>
                </div>
                <p className='text-2xl font-black text-gray-900'>{valor}</p>
                <p className='text-xs text-green-600 font-semibold mt-1'>{cambio}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Cursos
