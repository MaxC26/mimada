import { IconCalendarEvent } from '@tabler/icons-react'
import React from 'react'

export const ItenServicio = ({ img, descripcion, delay = '0' }) => {
  // Categoría ficticia (o basada en el texto) para propósitos estéticos
  const category = 'BELLEZA'

  return (
    <div 
      className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer'
    >
      {/* Imagen superior con etiqueta */}
      <div className='relative h-56 w-full overflow-hidden'>
        <div 
          className='w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105'
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        {/* Etiqueta flotante */}
        <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm text-[10px] font-bold tracking-wider text-[#c2a381] shadow-sm'>
          {category}
        </div>
      </div>

      {/* Contenido inferior */}
      <div className='p-5 flex flex-col flex-grow'>
        <h3 className='font-bold text-gray-900 text-lg leading-snug mb-2 line-clamp-2'>
          {descripcion}
        </h3>
        
        <p className='text-gray-500 text-sm mb-3'>
          Mimada SV • Especialistas
        </p>

        <div className='mt-auto mb-4'></div>

        {/* Footer de la tarjeta con botón rosa */}
        <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
          <div className='flex flex-col'>
            <span className='text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-0.5'>Reserva</span>
            <span className='font-bold text-lg text-gray-900 leading-none'>Agendar</span>
          </div>
          
          <a
            href='https://wa.me/+50372755604'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-[#f3ece5] text-[#c2a381] w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#c2a381] hover:text-white transition-colors duration-300'
          >
             <IconCalendarEvent size={20} stroke={2} />
          </a>
        </div>
      </div>
    </div>
  )
}

