import { IconBrandInstagram, IconBrandWhatsapp, IconMapPinFilled } from '@tabler/icons-react'

const Footer = () => {
  return (
    <footer className='w-full bg-gray-950 text-white border-t border-gray-900 py-12 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12'>
          
          {/* Logo y Descripción */}
          <div className='md:col-span-1 lg:col-span-2'>
            <div className='text-3xl font-bold text-white flex items-center gap-2 mb-2'>
              Mimada
            </div>
            <p className='text-gray-300 text-sm md:text-base leading-relaxed max-w-md mb-2'>
              🇸🇻 ESPECIALISTAS | PESTAÑAS y CEJAS <br/>
              🥇 Acreditaciones: 🇧🇷 🇨🇱 🇪🇨 🇬🇹 🇺🇦 🇪🇸 🇲🇽 <br/>
              🏆 Academia
            </p>
          </div>

          {/* Menú */}
          <div className='md:col-span-1'>
            <h4 className='font-bold text-white text-lg mb-4'>Explorar</h4>
            <ul className='space-y-3'>
              <li>
                <a href='#inicio' className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Inicio
                </a>
              </li>
              <li>
                <a href='#servicios' className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Servicios Populares
                </a>
              </li>
              <li>
                <a href='#nuestra-historia' className='text-gray-400 hover:text-white transition-colors text-sm'>
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a
                  href='https://wa.me/+50372755604'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2'
                >
                  <span className='w-2 h-2 rounded-full bg-[#4ed05b]'></span> Agendar Cita
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className='md:col-span-2 lg:col-span-1'>
            <h4 className='font-bold text-white text-lg mb-4'>Ubicación</h4>
            <p className='text-gray-400 text-sm mb-4 flex items-start gap-2'>
              <IconMapPinFilled size={18} className='text-[#e43c8a] shrink-0 mt-0.5' />
              <span>
                 @lasramblassv <br/>
                 Centro Comercial Las Ramblas,<br />
                 Acceso al sótano, local s104 B
              </span>
            </p>
            
            <div className='flex gap-3'>
              <a
                href='https://wa.me/+50372755604'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-gray-800 hover:bg-[#e43c8a] hover:text-white text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300'
                aria-label="WhatsApp"
              >
                <IconBrandWhatsapp stroke={1.5} className='w-5 h-5' />
              </a>
              <a
                href='https://www.instagram.com/mimada.pmu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                target='_blank'
                rel='noopener noreferrer'
                className='bg-gray-800 hover:bg-[#e43c8a] hover:text-white text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300'
                aria-label="Instagram"
              >
                <IconBrandInstagram stroke={1.5} className='w-5 h-5' />
              </a>
            </div>
          </div>

        </div>
        
        {/* Copyright */}
        <div className='mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-center gap-4'>
           <p className='text-gray-500 text-sm text-center'>
            © {new Date().getFullYear()} Mimadas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

