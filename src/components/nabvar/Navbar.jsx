import { IconBrandWhatsapp, IconSearch, IconShoppingCart } from '@tabler/icons-react'

import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../utils/rutas'
import logoMimada from '../../assets/img/logo/logo-mimada.png'
import { ROLES } from '../../utils/constantes'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { logout } from '../../services/login'
import { signOutFromGoogle } from '../../services/google'
import { useState } from 'react'
import UserAvatar from '../utils/UserAvatar'
import { isRouteActive } from '../../utils/utils'

export const Navbar = ({ isExplore = false }) => {
  const { user, isAuthenticated } = useAuth()
  const { itemCount, openCart } = useCart()
  const login = isAuthenticated
  const rol = (user?.rol || '').toLowerCase()

  console.log(
    'Navbar Debug -> isAuth:',
    isAuthenticated,
    ' | rol evaluado:',
    rol,
    ' | data original:',
    user
  )
  const [showDropdown, setShowDropdown] = useState(false)
  const { pathname } = useLocation()

  const handleLogout = async () => {
    await signOutFromGoogle()
    await logout()
  }

  const UserDropdown = () => (
    <div className='relative'>
      <UserAvatar
        user={user}
        size='md'
        className='border-2 border-white cursor-pointer shadow-sm hover:ring-2 hover:ring-[#c2a381] transition-all'
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
        <div
          className='absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl py-2 border border-gray-100'
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className='px-4 py-4 border-b border-gray-100 flex items-center gap-3'>
            <UserAvatar user={user} size='lg' />
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-bold text-gray-900 truncate'>
                {user?.nombre} {user?.apellido}
              </p>
              <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
            </div>
          </div>
          <div className='py-2'>
            <Link
              to={routes.explore.misCursos}
              className='block px-5 py-2 text-sm text-gray-700 hover:text-[#c2a381] font-semibold hover:bg-gray-50 transition-colors'
              onClick={() => setShowDropdown(false)}
            >
              Mi aprendizaje
            </Link>
          </div>
          <div className='border-t border-gray-100'></div>
          <div className='py-2'>
            <button
              onClick={handleLogout}
              className='w-full text-left px-5 py-2 text-sm text-gray-700 font-semibold hover:text-red-600 hover:bg-gray-50 transition-colors'
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )

  // ── Reusable NavLink (text-only, no pill) ──
  const NavLink = ({ to, label, active, size = 'base', inactiveColor = 'text-gray-800' }) => (
    <li>
      <Link
        to={to}
        className={`${size === 'sm' ? 'text-sm lg:text-base' : 'text-base'} font-medium transition-colors ${
          active ? 'text-[#c2a381] font-semibold' : `${inactiveColor} hover:text-[#c2a381]`
        }`}
      >
        {label}
      </Link>
    </li>
  )

  // ── Navigation items per mode ──
  const homeNavItems = [
    { label: 'Inicio', to: routes.inicio, active: isRouteActive(pathname, routes.inicio, 'home') },
    { label: 'Explorar', to: routes.explore.inicio, active: isRouteActive(pathname, routes.explore.base, 'startsWith') },
  ]

  const exploreNavItems = [
    { label: 'Inicio', to: routes.inicio, active: isRouteActive(pathname, routes.inicio, 'home') },
    { label: 'Explorar', to: routes.explore.inicio, active: isRouteActive(pathname, routes.explore.inicio) },
    ...(login
      ? [{ label: 'Cursos', to: routes.explore.cursos, active: isRouteActive(pathname, routes.explore.cursos, 'startsWith') }]
      : []),
  ]

  return (
    <div
      className='w-full h-16 md:h-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-[100] transition-all duration-300'
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className='container mx-auto px-4 lg:px-8 h-full flex items-center justify-between'>
        {/* Logo */}
        <Link to={routes.inicio} className='flex items-center gap-1 md:gap-2'>
          <img
            src={logoMimada}
            alt='Logo Mimada'
            className='h-12 md:h-14 w-auto object-contain scale-125 origin-left ml-2'
          />
          <span className='text-2xl md:text-3xl font-bold text-[#c2a381] ml-1 md:ml-2'>
            Mimada
          </span>
        </Link>

        {/* Barra de Búsqueda Centrada (Solo si es Explore y Desktop) */}
        {isExplore && (
          <div className='hidden md:flex flex-1 max-w-lg mx-6'>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <IconSearch size={18} className='text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Buscar cursos de maquillaje, skincare...'
                className='w-full pl-10 pr-4 py-2.5 bg-gray-100/80 border-transparent focus:bg-white focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] rounded-full text-sm outline-none transition-all'
              />
            </div>
          </div>
        )}

        {/* Menu contenedor - alineado a la derecha */}
        <div className='flex items-center'>
          {/* Desktop Navigation */}
          <nav className='hidden md:block mr-6'>
            {!isExplore ? (
              <ul className='flex space-x-8 items-center justify-end'>
                {homeNavItems.map((item) => (
                  <NavLink key={item.label} {...item} />
                ))}
                {login && rol === ROLES.ADMINISTRADOR && (
                  <li>
                    <Link
                      to={routes.settings}
                      className={`text-base font-medium transition-colors px-4 py-2 rounded-full ${
                        isRouteActive(pathname, routes.settings, 'startsWith')
                          ? 'bg-[#c2a381] text-white font-semibold shadow-sm'
                          : 'text-gray-800 bg-gray-50 hover:text-[#c2a381]'
                      }`}
                    >
                      Configuración
                    </Link>
                  </li>
                )}
              </ul>
            ) : (
              <ul className='flex space-x-6 lg:space-x-8 items-center justify-end'>
                {exploreNavItems.map((item) => (
                  <NavLink key={item.label} {...item} size='sm' inactiveColor='text-gray-600' />
                ))}
              </ul>
            )}
          </nav>

          {/* Action Buttons (Right Side) */}
          <div className='flex items-center gap-4'>
            {/* Si es Explorar, mostramos Carrito y Notificaciones/Avatar */}
            {isExplore ? (
              <div className='flex items-center gap-3'>
                {!login && (
                  <Link
                    to={routes.login}
                    className='hidden md:flex items-center px-5 py-2 rounded-full border-2 border-[#c2a381] text-[#c2a381] text-sm font-bold hover:bg-[#faf7f5] transition-colors'
                  >
                    Iniciar Sesión
                  </Link>
                )}
                <button
                  onClick={openCart}
                  className='relative p-2 text-gray-600 hover:text-[#c2a381] transition-colors'
                >
                  <IconShoppingCart stroke={1.5} size={24} />
                  {itemCount > 0 && (
                    <span className='absolute top-0 right-0 bg-[#c2a381] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white'>
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </button>
                {login ? (
                  <UserDropdown />
                ) : (
                  <Link
                    to={routes.login}
                    className='md:hidden w-9 h-9 rounded-full bg-[#faf7f5] border-2 border-[#f3ece5] flex items-center justify-center text-[#c2a381] text-xs font-black'
                  >
                    ?
                  </Link>
                )}
              </div>
            ) : (
              /* Botones en modo Home */
              <div className='flex items-center gap-3'>
                {!login ? (
                  <Link
                    to={routes.login}
                    className='hidden md:flex items-center px-5 py-2 rounded-full border-2 border-[#c2a381] text-[#c2a381] text-sm font-bold hover:bg-[#faf7f5] transition-colors'
                  >
                    Iniciar Sesión
                  </Link>
                ) : (
                  <UserDropdown />
                )}
                <a
                  href='https://wa.me/+50372755604'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='cursor-pointer inline-block ml-2'
                >
                  <button className='bg-[#c2a381] px-4 sm:px-5 h-[36px] md:h-[40px] rounded-full flex items-center justify-center gap-1.5 shadow-md hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300'>
                    <IconBrandWhatsapp stroke={2} color='#ffffff' size={18} />
                    <p className='text-white text-xs md:text-sm font-bold tracking-wide'>
                      CITA
                    </p>
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
