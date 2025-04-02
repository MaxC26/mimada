import { IconArrowUpRight } from '@tabler/icons-react'
import React from 'react'

export const ItenServicio = ({ img, descripcion, dataAos }) => {
  return (
    <div className='container-items' data-aos={dataAos}>
      <div className='card-wrapper'>
        <div className='card'>
          <div
            className='img-mask'
            style={{
              backgroundImage: `url(${img})`,
            }}
          >
            <p className='text-items z-50'>{descripcion}</p>
            <div className='degradado'></div>
          </div>
          <a
            className='enlace'
            href='https://wa.me/+50372755604'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconArrowUpRight stroke={2} color='#ffffff' size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}

