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
  const location = useLocation()

  const handleLogout = async () => {
    await signOutFromGoogle()
    await logout()
  }

  const userInitials = user
    ? `${user.nombre?.charAt(0) || ''}${user.apellido?.charAt(0) || ''}`
        .toUpperCase()
        .substring(0, 2)
    : 'U'

  const UserDropdown = () => (
    <div className='relative'>
      <div
        className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border-2 border-white text-white font-bold cursor-pointer text-sm shadow-sm hover:ring-2 hover:ring-[#c2a381] transition-all'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {userInitials || 'MC'}
      </div>
      {showDropdown && (
        <div
          className='absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl py-2 border border-gray-100'
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className='px-4 py-4 border-b border-gray-100 flex items-center gap-3'>
            <div className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white font-bold text-lg shrink-0'>
              {userInitials || 'MC'}
            </div>
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

  const homeRoutes = [routes.inicio, routes.home, routes.home + '/']
  const isHomeActive = homeRoutes.includes(location.pathname)

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
                <li>
                  <Link
                    to={routes.inicio}
                    className={`text-base font-medium transition-colors ${isHomeActive ? 'text-[#c2a381] font-semibold' : 'text-gray-800 hover:text-[#c2a381]'}`}
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.explore.inicio}
                    className='text-gray-800 text-base font-medium hover:text-[#c2a381] transition-colors'
                  >
                    Explorar
                  </Link>
                </li>
                {login && rol === ROLES.ADMINISTRADOR && (
                  <li>
                    <Link
                      to={routes.settings}
                      className='text-gray-800 text-base font-medium hover:text-[#c2a381] transition-colors bg-gray-50 px-4 py-2 rounded-full'
                    >
                      Configuración
                    </Link>
                  </li>
                )}
              </ul>
            ) : (
              <ul className='flex space-x-6 lg:space-x-8 items-center justify-end'>
                <li>
                  <Link
                    to={routes.inicio}
                    className='text-gray-600 text-sm lg:text-base font-medium hover:text-[#c2a381] transition-colors'
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.explore.inicio}
                    className='text-[#c2a381] text-sm lg:text-base font-medium transition-colors'
                  >
                    Explorar
                  </Link>
                </li>
                {login && (
                  <>
                    <li>
                      <Link
                        to={routes.explore.cursos}
                        className='text-gray-600 text-sm lg:text-base font-medium hover:text-[#c2a381] transition-colors'
                      >
                        Cursos
                      </Link>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='text-gray-600 text-sm lg:text-base font-medium hover:text-[#c2a381] transition-colors'
                      >
                        Perfil
                      </a>
                    </li>
                  </>
                )}
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
