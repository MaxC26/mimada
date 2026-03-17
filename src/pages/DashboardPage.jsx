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
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../services/login'
import logoMimada from '../assets/img/logo/logo-mimada.png'
import { routes } from '../utils/rutas'
import { decodeToken } from '../utils/utils'
import { SECCIONES_DASHBOARD } from '../utils/constantes'

const navItems = [
  {
    id: SECCIONES_DASHBOARD.INICIO,
    label: 'Inicio',
    icon: IconSmartHome,
    path: routes.dashboard.inicio,
  },
  {
    id: SECCIONES_DASHBOARD.SERVICIOS,
    label: 'Servicios',
    icon: IconUsers,
    path: routes.dashboard.servicios,
  },
  {
    id: SECCIONES_DASHBOARD.HISTORIA,
    label: 'Nuestra Historia',
    icon: IconClock2,
    path: routes.dashboard.historia,
  },
  {
    id: SECCIONES_DASHBOARD.CURSOS,
    label: 'Cursos',
    icon: IconVideo,
    path: routes.dashboard.cursos,
  },
  {
    id: SECCIONES_DASHBOARD.CATEGORIAS,
    label: 'Categorías',
    icon: IconLayoutGrid,
    path: routes.dashboard.categorias,
  },
]

const DashboardPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const rol = (decodeToken(localStorage.getItem('jwt'))?.rol || '').toUpperCase()

  const handleLogout = () => logout(navigate)

  const handleNav = (path) => {
    navigate(path)
    setSidebarOpen(false)
  }

  // Determina el item activo comparando la ruta actual
  const activeItem =
    navItems
      .slice()
      .reverse()
      .find((item) => location.pathname.startsWith(item.path)) || navItems[0]

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
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Logo */}
        <div className='flex items-center gap-3 px-6 py-5 border-b border-gray-100'>
          <img src={logoMimada} alt='Logo' className='h-10 w-auto object-contain' />
          <div>
            <p className='font-black text-gray-900 text-base leading-tight'>Mimadas</p>
            <span className='text-xs font-semibold text-[#c2a381] bg-[#faf7f5] px-2 py-0.5 rounded-full'>
              {rol}
            </span>
          </div>
          {/* Botón cerrar sidebar en móvil */}
          <button
            className='ml-auto md:hidden text-gray-400 hover:text-gray-600'
            onClick={() => setSidebarOpen(false)}
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Navegación */}
        <nav className='flex-1 px-3 py-5 space-y-1 overflow-y-auto'>
          {navItems.map(({ id, label, icon: Icon, path }) => {
            const active = activeItem.id === id
            return (
              <button
                key={id}
                onClick={() => handleNav(path)}
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
              <img
                src='https://i.pravatar.cc/150?img=47'
                alt='Avatar'
                className='w-full h-full object-cover'
              />
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
              {activeItem.label}
            </h1>
            <p className='text-xs text-gray-400 hidden md:block'>
              Gestiona el contenido de tu web desde aquí
            </p>
          </div>
        </header>

        {/* Contenido de la sección activa */}
        <main className='flex-1 p-4 md:p-8'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardPage

