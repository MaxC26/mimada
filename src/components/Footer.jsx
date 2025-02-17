import { IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react'

const Footer = () => {
  return (
    <div className='bg-footer contenedor-footer' data-aos='zoom-in'>
      <div>
        <p className='prata-regular text-[40px] text-white footer-mimada'>MIMADA</p>
      </div>
      <div className='menu-contact'>
        <div className='h-[200px]'>
          <p className='montserrat-semibold text-white text-[20px]'>Menu</p>
          <ul className='montserrat-regular text-[16px] mt-[20px]'>
            <li>
              <a href='#' className='text-white hover:text-gray-400'>
                Inicio
              </a>
            </li>
            <li>
              <a href='#' className='text-white hover:text-gray-400'>
                Servicio
              </a>
            </li>
            <li>
              <a href='#' className='text-white hover:text-gray-400'>
                Nuestra historia
              </a>
            </li>
            <li>
              <a href='#' className='text-white hover:text-gray-400'>
                Hacer cita
              </a>
            </li>
          </ul>
        </div>
        <div className='h-[200px] contact'>
          <p className='montserrat-semibold text-white text-[20px]'>Contact</p>
          <p className='montserrat-regular text-[16px] text-white mt-[20px]'>
            72755606 <br /> Centro comercial novo <br />
            centro, Santa Tecla, El <br /> Salvador
          </p>
        </div>
      </div>
      <div className='content-social'>
        <p className='montserrat-semibold text-white text-[20px] footer-social'>Social</p>
        <div className='icon-social flex gap-[5px]'>
          <a
            href='https://wa.me/+50372755604'
            target='_blank'
            rel='noopener noreferrer'
            className='cursor-pointer'
          >
            <button className='bg-[#ffffff] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer'>
              <IconBrandWhatsapp stroke={2} color='#d1c1b2' className='w-6' />
            </button>
          </a>
          <a
            href='https://www.instagram.com/mimada.pmu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
            target='_blank'
            rel='noopener noreferrer'
            className='cursor-pointer'
          >
            <button className='bg-[#ffffff] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer'>
              <IconBrandInstagram stroke={2} color='#d1c1b2' className='w-6' />
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
