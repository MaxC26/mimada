import { useEffect, useState } from 'react'
import {
  IconSmartHome,
  IconUsers,
  IconClock2,
  IconVideo,
  IconLogout,
  IconChevronRight,
  IconMenu2,
  IconX,
  IconExternalLink,
  IconLayoutGrid,
} from '@tabler/icons-react'
import { getContenidoBySeccion } from '../services/contenido'
import { Inicio } from '../components/settings/Inicio'
import Historia from '../components/settings/Historia'
import Servicios from '../components/settings/Servicios'
import SubirVideo from '../components/settings/SubirVideo'
import Cursos from '../components/settings/Cursos'
import Categorias from '../components/settings/Categorias'
import LoadingSpinner from '../components/utils/LoadingSpinner'
import { logout } from '../services/login'
import { useNavigate } from 'react-router-dom'
import logoMimada from '../assets/img/logo/logo-mimada.png'
import { routes } from '../utils/rutas'

const navItems = [
  { id: 'Inicio',           label: 'Inicio',           icon: IconSmartHome,   section: 'Head' },
  { id: 'Servicios',        label: 'Servicios',        icon: IconUsers,       section: 'servicio' },
  { id: 'Nuestra Historia', label: 'Nuestra Historia', icon: IconClock2,      section: 'historia' },
  { id: 'Cursos',           label: 'Cursos',           icon: IconVideo,       section: null },
  { id: 'Categorias',       label: 'Categorías',       icon: IconLayoutGrid,  section: null },
]

const DashboardPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState('Inicio')
  const [contenido, setContenido] = useState([])
  // Subvistas de la sección Cursos: 'lista' | 'detalle' | 'subir'
  const [cursoPag, setCursoPag] = useState('lista')
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null)

  useEffect(() => {
    setSidebarOpen(false)
    const item = navItems.find(n => n.id === activePage)
    if (item?.section) {
      getSectionContent(item.section)
    } else {
      // Secciones sin fetch (ej: SubirVideo)
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage])

  const getSectionContent = async (seccion) => {
    setIsLoading(true)
    try {
      const res = await getContenidoBySeccion(seccion)
      setContenido(res.data)
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
  }

  const handleLogout = () => logout(navigate)

  const handleNav = (id) => {
    if (id !== activePage) {
      setActivePage(id)
      // Al cambiar de sección, resetear subvista de cursos
      if (id === 'Cursos') setCursoPag('lista')
    }
    setSidebarOpen(false)
  }

  return (
    <div className='flex min-h-screen bg-gray-50 font-sans'>

      {/* ── Overlay móvil ── */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/40 z-40 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

        {/* Logo */}
        <div className='flex items-center gap-3 px-6 py-5 border-b border-gray-100'>
          <img src={logoMimada} alt='Logo' className='h-10 w-auto object-contain' />
          <div>
            <p className='font-black text-gray-900 text-base leading-tight'>Mimadas</p>
            <span className='text-xs font-semibold text-[#c2a381] bg-[#faf7f5] px-2 py-0.5 rounded-full'>INSTRUCTORA</span>
          </div>
          {/* Botón cerrar sidebar en móvil */}
          <button className='ml-auto md:hidden text-gray-400 hover:text-gray-600' onClick={() => setSidebarOpen(false)}>
            <IconX size={20} />
          </button>
        </div>

        {/* Navegación */}
        <nav className='flex-1 px-3 py-5 space-y-1 overflow-y-auto'>
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = activePage === id
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${active ? 'bg-[#faf7f5] text-[#c2a381]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Icon size={20} stroke={active ? 2.5 : 1.5} />
                <span className='flex-1 text-left'>{label}</span>
                {active && <IconChevronRight size={16} className='text-[#c2a381]' />}
              </button>
            )
          })}
        </nav>

        {/* Usuario & Logout */}
        <div className='p-4 border-t border-gray-100 space-y-2'>
          <div className='flex items-center gap-3 px-2 py-2'>
            <div className='w-9 h-9 rounded-full bg-[#f3ece5] flex items-center justify-center overflow-hidden shrink-0'>
              <img src='https://i.pravatar.cc/150?img=47' alt='Avatar' className='w-full h-full object-cover' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-bold text-gray-900 truncate'>Lucía Méndez</p>
              <p className='text-xs text-gray-400 truncate'>Socia Platinum</p>
            </div>
          </div>
          {/* Ir a la web */}
          <a
            href={routes.inicio}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#c2a381] bg-[#faf7f5] hover:bg-[#f3ece5] transition-colors'
          >
            <IconExternalLink size={18} stroke={1.5} />
            Ver Web
          </a>
          <button
            className='w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors'
            onClick={handleLogout}
          >
            <IconLogout size={18} stroke={1.5} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ── Contenido principal ── */}
      <div className='flex-1 flex flex-col min-w-0'>

        {/* Header top bar */}
        <header className='bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center gap-4 sticky top-0 z-30'>
          {/* Hamburger móvil */}
          <button
            className='md:hidden text-gray-500 hover:text-gray-800 transition-colors'
            onClick={() => setSidebarOpen(true)}
          >
            <IconMenu2 size={24} />
          </button>

          <div>
            <h1 className='text-lg font-black text-gray-900 capitalize'>
              {navItems.find(n => n.id === activePage)?.label || activePage}
            </h1>
            <p className='text-xs text-gray-400 hidden md:block'>
              Gestiona el contenido de tu web desde aquí
            </p>
          </div>
        </header>

        {/* Body */}
        <main className='flex-1 p-4 md:p-8'>
          {isLoading ? (
            <div className='flex justify-center items-center min-h-[50vh]'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {activePage === 'Inicio' && (
                <Inicio contenido={contenido} setIsLoading={setIsLoading} />
              )}
              {activePage === 'Servicios' && (
                <Servicios contenido={contenido} setIsLoading={setIsLoading} />
              )}
              {activePage === 'Nuestra Historia' && (
                <Historia contenido={contenido} setIsLoading={setIsLoading} />
              )}
              {activePage === 'Cursos' && (
                <>
                  {cursoPag === 'lista' && (
                    <Cursos
                      onEditCurso={(curso) => { setCursoSeleccionado(curso); setCursoPag('subir') }}
                      onNuevoCurso={() => { setCursoSeleccionado(null); setCursoPag('subir') }}
                    />
                  )}
                  {cursoPag === 'subir' && (
                    <SubirVideo curso={cursoSeleccionado} onBack={() => setCursoPag('lista')} />
                  )}
                </>
                )}
                {activePage === 'Categorias' && (
                <Categorias contenido={contenido} setIsLoading={setIsLoading} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
