import { IconBrandWhatsapp, IconMenu2 } from '@tabler/icons-react'
import { useState } from 'react'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div
      className='w-full h-[80px] md:h-[100px] bg-[#fcf8ef]  border-b border-white fixed top-0 left-0 z-50'
      data-aos='zoom-in'
    >
      <div className='container mx-auto px-4 h-full flex items-center justify-between'>
        {/* Logo */}
        <div className='text-2xl md:text-3xl font-bold'>MIMADA</div>

        {/* Menu contenedor - alineado a la derecha */}
        <div className='flex items-center'>
          {/* Desktop Navigation */}
          <nav className='hidden md:block mr-6'>
            <ul className='flex space-x-8 justify-end'>
              <li>
                <a
                  href='#inicio'
                  className='text-black text-lg hover:text-gray-500 transition-colors'
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href='#servicios'
                  className='text-black text-lg hover:text-gray-500 transition-colors'
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href='#nuestra-historia'
                  className='text-black text-lg hover:text-gray-500 transition-colors'
                >
                  Nuestra historia
                </a>
              </li>
            </ul>
          </nav>

          {/* WhatsApp Button - Siempre visible */}
          <div>
            <a
              href='https://wa.me/+50372755604'
              target='_blank'
              rel='noopener noreferrer'
              className='cursor-pointer'
            >
              <button className='bg-[#4ed05b] w-[100px] h-[40px] rounded-full flex items-center justify-center gap-2 shadow-sm hover:bg-[#45ba50] transition-colors'>
                <IconBrandWhatsapp stroke={2} color='#ffffff' size={20} />
                <p className='text-white text-sm font-bold'>CITA</p>
              </button>
            </a>
          </div>

          {/* Hamburger Menu Button (Mobile Only) - Después del botón de WhatsApp */}
          <button
            className='md:hidden text-gray-700 focus:outline-none ml-4'
            onClick={toggleMenu}
          >
            <IconMenu2 size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className='md:hidden bg-[#fcf8ef] w-full shadow-md animate-fadeIn'>
          <ul className='flex flex-col py-2'>
            <li className='py-3 px-4 border-b border-gray-100 text-right'>
              <a
                href='#inicio'
                className='text-black text-lg block hover:text-gray-500'
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
            </li>
            <li className='py-3 px-4 border-b border-gray-100 text-right'>
              <a
                href='#servicios'
                className='text-black text-lg block hover:text-gray-500'
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </a>
            </li>
            <li className='py-3 px-4 text-right'>
              <a
                href='#nuestra-historia'
                className='text-black text-lg block hover:text-gray-500'
                onClick={() => setIsMenuOpen(false)}
              >
                Nuestra historia
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

