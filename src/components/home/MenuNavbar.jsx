import { IconBrandWhatsapp } from '@tabler/icons-react'

const MenuNavbar = () => {
  return (
    <div className='flex item-center gap-16'>
      <nav
        className='bg-[#ffffff25] p-2 ml-[65px] w-[280px] font-bold text-[13px] mt-[40px]'
        data-aos='fade-up'
      >
        <ul className='flex justify-around'>
          <li>
            <a href='#' className='text-white hover:text-gray-400'>
              Inicio
            </a>
          </li>
          <li>
            <a href='#' className='text-white hover:text-gray-400'>
              Servicios
            </a>
          </li>
          <li>
            <a href='#' className='text-white hover:text-gray-400'>
              Nuestra historia
            </a>
          </li>
        </ul>
      </nav>
      <div className='flex items-end' data-aos='fade-down'>
        <a
          href='https://wa.me/+50376394323'
          target='_blank'
          rel='noopener noreferrer'
          className='cursor-pointer'
        >
          <button className='bg-[#ffffff25] w-[100px] h-[40px] py-1 px-3 rounded-[50px] flex items-center justify-center gap-2 border-1 border-white cursor-pointer'>
            <IconBrandWhatsapp stroke={1} color='#ffffff' className='w-5' />
            <p className='text-white text-[11px] font-medium'>CITA</p>
          </button>
        </a>
      </div>
    </div>
  )
}

export default MenuNavbar
