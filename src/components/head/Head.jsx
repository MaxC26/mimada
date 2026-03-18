import points from '../../assets/img/points.png'
import { IconArrowRight } from '@tabler/icons-react'

export const Head = ({ content }) => {
  const { imgHead, textHead, textHead01 } = content

  return (
    <div
      className='w-full min-h-[90vh] md:min-h-[85vh] pt-20 pb-12 overflow-hidden flex items-center bg-white relative'
      id='inicio'
    >
      {/* Fondo sutil */}
      <div className='absolute inset-0 bg-gradient-to-b from-[#faf7f5]/50 to-white -z-10'></div>
      
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-10'>
          
          {/* Columna de texto */}
          <div className='w-full lg:w-1/2 text-center lg:text-left z-10'>
            
            <h1 className='text-5xl md:text-6xl lg:text-[72px] font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6'>
              Realza tu <br/>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#c2a381] to-[#e3d5c8]'>
                Belleza Natural
              </span>
            </h1>
            
            <p className='text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10'>
              {textHead01 || 'La belleza es autenticidad y confianza. Cuando te cuidas y te sientes bien, brillas con luz propia. Realza tu esencia y refleja tu mejor versión.'}
            </p>

            <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'>
              <a
                href='#servicios'
                className='w-full sm:w-auto inline-flex items-center justify-center bg-[#c2a381] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-[#c2a381]/30 hover:bg-[#a58b6c] transform hover:-translate-y-0.5 transition-all duration-300'
              >
                Explorar Servicios
                <IconArrowRight className='ml-2' stroke={2} size={20} />
              </a>
              <a
                href='#nuestra-historia'
                className='w-full sm:w-auto inline-flex items-center justify-center bg-white text-gray-800 border border-gray-200 font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-300'
              >
                Conócenos
              </a>
            </div>
            
            {/* Stats simples */}
            <div className='mt-12 pt-8 border-t border-gray-100 flex items-center justify-center lg:justify-start gap-8 opacity-80'>
              <div>
                <p className='text-2xl font-black text-gray-900'>10k+</p>
                <p className='text-sm text-gray-500 font-medium'>Seguidores</p>
              </div>
              <div className='w-px h-10 bg-gray-200'></div>
              <div>
                <p className='text-2xl font-black text-gray-900'>8+</p>
                <p className='text-sm text-gray-500 font-medium'>Países Acred.</p>
              </div>
            </div>
          </div>

          {/* Imagen (estilo limpio) */}
          <div className='w-full lg:w-1/2 relative flex justify-center lg:justify-end'>
            {/* Elementos decorativos */}
            <div className='absolute -top-10 -right-10 w-40 h-40 bg-[#f3ece5] rounded-full blur-3xl opacity-60 -z-10'></div>
            <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-[#c2a381] rounded-full blur-3xl opacity-20 -z-10'></div>
            
            <div className='relative w-full max-w-[500px] lg:max-w-none aspect-[4/5] lg:aspect-auto lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5'>
              <div
                className='w-full h-full bg-no-repeat bg-cover bg-center transition-transform duration-1000 hover:scale-105'
                style={{
                  backgroundImage: `url(${imgHead})`,
                }}
              ></div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent'></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
