import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from '@tabler/icons-react'

const Footer = () => {
  return (
    <div className='w-full h-[355px] bg-footer flex justify-evenly items-center'>
      <div data-aos='fade-down'>
        <p className='prata-regular text-[40px] text-white pb-[120px]'>MIMADA</p>
      </div>
      <div className='h-[200px]' data-aos='fade-up'>
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
      <div className='h-[200px]' data-aos='fade-down'>
        <p className='montserrat-semibold text-white text-[20px]'>Contact</p>
        <p className='montserrat-regular text-[16px] text-white mt-[20px]'>
          72755606 <br /> Centro comercial novo <br />
          centro, Santa Tecla, El <br /> Salvador
        </p>
      </div>
      <div className='h-[200px]' data-aos='fade-up'>
        <p className='montserrat-semibold text-white text-[20px]'>Social</p>
        <div className='mt-[20px] flex gap-[8px]'>
          <button className='bg-[#ffffff] w-[40px] h-[40px] rounded-full flex items-center justify-center'>
            <IconBrandFacebookFilled stroke={2} color='#d1c1b2' className='w-6' />
          </button>
          <a
            href='https://wa.me/+50376394323'
            target='_blank'
            rel='noopener noreferrer'
            className='cursor-pointer'
          >
            <button className='bg-[#ffffff] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer'>
              <IconBrandWhatsapp stroke={2} color='#d1c1b2' className='w-6' />
            </button>
          </a>
          <button className='bg-[#ffffff] w-[40px] h-[40px] rounded-full flex items-center justify-center'>
            <IconBrandInstagram stroke={2} color='#d1c1b2' className='w-6' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer
