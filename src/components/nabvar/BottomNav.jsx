import { IconHome, IconCompass, IconBook2, IconHeart, IconUser } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../utils/rutas'
import { isRouteActive } from '../../utils/utils'

export const BottomNav = () => {
  const { pathname } = useLocation()

  const navItems = [
    { label: 'Inicio', icon: IconHome, path: routes.inicio, mode: 'home' },
    { label: 'Explorar', icon: IconCompass, path: routes.explore.inicio, mode: 'startsWith' },
    { label: 'Mis Cursos', icon: IconBook2, path: routes.explore.misCursos, mode: 'exact' },
    { label: 'Deseos', icon: IconHeart, path: '#', mode: 'exact' },
    { label: 'Perfil', icon: IconUser, path: '#', mode: 'exact' },
  ]

  return (
    <div className='md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-2 py-2 flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-4px_20px_-15px_rgba(0,0,0,0.1)]'>
      {navItems.map((item, index) => {
        const active = isRouteActive(pathname, item.path, item.mode)
        const Icon = item.icon
        return (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full py-1 ${active ? 'text-[#c2a381]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Icon size={24} stroke={active ? 2.5 : 2} className='mb-1' />
            <span className={`text-[10px] font-medium leading-none ${active ? 'text-[#c2a381]' : 'text-gray-500'}`}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
