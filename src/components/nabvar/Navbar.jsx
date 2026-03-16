import { IconBrandWhatsapp, IconSearch, IconShoppingCart } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../utils/rutas'
import { jwtDecode } from 'jwt-decode'
import logoMimada from '../../assets/img/logo/logo-mimada.png'

export const Navbar = ({ isExplore = false }) => {
  const [login, setLogin] = useState(false)
  const location = useLocation()

  const homeRoutes = [routes.inicio, routes.home, routes.home + '/']
  const isHomeActive = homeRoutes.includes(location.pathname)

  const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    if (jwt) {
      const decoded = jwtDecode(jwt)
      const isExpired = decoded.exp < Date.now() / 1000
      if (isExpired) {
        setLogin(false)
      } else {
        setLogin(true)
      }
    }
  }, [jwt])

  return (
    <div
      className='w-full h-16 md:h-20 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-[100] transition-all duration-300'
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className='container mx-auto px-4 lg:px-8 h-full flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-1 md:gap-2'>
          <img src={logoMimada} alt='Logo Mimada' className='h-12 md:h-14 w-auto object-contain scale-125 origin-left ml-2' />
          <span className='text-2xl md:text-3xl font-bold text-[#e43c8a] ml-1 md:ml-2'>Mimada</span>
        </div>

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
                className='w-full pl-10 pr-4 py-2.5 bg-gray-100/80 border-transparent focus:bg-white focus:border-[#e43c8a] focus:ring-2 focus:ring-[#fce7f3] rounded-full text-sm outline-none transition-all'
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
                  <Link to={routes.inicio} className={`text-base font-medium transition-colors ${isHomeActive ? 'text-[#e43c8a] font-semibold' : 'text-gray-800 hover:text-[#e43c8a]'}`}>Inicio</Link>
                </li>
                <li>
                  <Link to={routes.explorar} className='text-gray-800 text-base font-medium hover:text-[#e43c8a] transition-colors'>Explorar</Link>
                </li>
                {login && (
                  <li>
                    <Link to={routes.settings} className='text-gray-800 text-base font-medium hover:text-[#e43c8a] transition-colors bg-gray-50 px-4 py-2 rounded-full'>
                      Configuración
                    </Link>
                  </li>
                )}
              </ul>
            ) : (
              <ul className='flex space-x-6 lg:space-x-8 items-center justify-end'>
                <li>
                  <Link to={routes.inicio} className='text-gray-600 text-sm lg:text-base font-medium hover:text-[#e43c8a] transition-colors'>Inicio</Link>
                </li>
                <li>
                  <Link to={routes.explorar} className='text-[#e43c8a] text-sm lg:text-base font-medium transition-colors'>Explorar</Link>
                </li>
                <li>
                  <a href='#' className='text-gray-600 text-sm lg:text-base font-medium hover:text-[#e43c8a] transition-colors'>Mis Cursos</a>
                </li>
                <li>
                  <a href='#' className='text-gray-600 text-sm lg:text-base font-medium hover:text-[#e43c8a] transition-colors'>Perfil</a>
                </li>
              </ul>
            )}
          </nav>

          {/* Action Buttons (Right Side) */}
          <div className='flex items-center gap-4'>
            
            {/* Si es Explorar, mostramos Carrito y Notificaciones/Avatar */}
            {isExplore ? (
              <div className='flex items-center gap-4'>
                <button className='relative p-2 text-gray-600 hover:text-[#e43c8a] transition-colors'>
                  <IconShoppingCart stroke={1.5} size={24} />
                  <span className='absolute top-0 right-0 bg-[#e43c8a] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white'>
                    2
                  </span>
                </button>
                <div className='hidden md:block w-9 h-9 rounded-full bg-gray-200 overflow-hidden border-2 border-[#fce7f3] cursor-pointer'>
                   {/* Avatar Placeholder */}
                   <img src="https://i.pravatar.cc/150?img=47" alt="User Profile" className='w-full h-full object-cover'/>
                </div>
              </div>
            ) : (
              /* WhatsApp Button - Solo en Home */
               <a href='https://wa.me/+50372755604' target='_blank' rel='noopener noreferrer' className='cursor-pointer inline-block'>
                <button className='bg-[#e43c8a] px-4 sm:px-5 h-[36px] md:h-[40px] rounded-full flex items-center justify-center gap-1.5 shadow-md hover:bg-[#c9246d] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300'>
                  <IconBrandWhatsapp stroke={2} color='#ffffff' size={18} />
                  <p className='text-white text-xs md:text-sm font-bold tracking-wide'>CITA</p>
                </button>
              </a>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

