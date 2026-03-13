import { IconBook2, IconCertificate, IconUsersGroup } from '@tabler/icons-react'

const OurStory = ({ content }) => {
  const { imgHistoria, textHistoria } = content

  return (
    <section
      id='nuestra-historia'
      className='w-full bg-white py-16 md:py-24'
    >
      <div className='max-w-7xl mx-auto px-4 lg:px-8'>
        <div className='flex flex-col md:flex-row gap-12 lg:gap-20 items-center mb-16'>
          
          {/* Contenedor de imagen - a la izquierda */}
          <div className='w-full md:w-1/2 flex justify-center md:justify-start'>
            <div className='relative w-full max-w-[500px] aspect-square lg:aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-xl'>
              <img
                src={imgHistoria}
                alt='Nuestra Historia Mimada'
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
              />
              <div className='absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-black/10'></div>
            </div>
          </div>

          {/* Contenedor de texto - a la derecha */}
          <div className='w-full md:w-1/2 text-center md:text-left'>
            <h2 className='font-bold text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-6 tracking-tight'>
              Nuestra <span className='text-[#e43c8a] block mt-2'>Historia</span>
            </h2>
            <div className='text-gray-600 text-lg leading-relaxed mx-auto md:mx-0 max-w-2xl'>
              <p>
                {textHistoria}
              </p>
            </div>
            <div className='mt-8 flex justify-center md:justify-start'>
               <a
                  href='https://wa.me/+50372755604'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center text-[#e43c8a] font-semibold hover:underline bg-[#fdf2f8] px-6 py-3 rounded-full hover:bg-[#fce7f3] transition-colors'
                >
                  Contáctanos <span className='ml-2 text-xl'>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tira inferior de beneficios imitando la propuesta nueva */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 border-t border-gray-100 pt-16'>
          {/* Beneficio 1 */}
          <div className='flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors'>
            <div className='bg-[#fdf2f8] text-[#e43c8a] p-3 rounded-2xl shrink-0 border border-[#fce7f3] shadow-sm'>
              <IconBook2 size={28} stroke={1.5} />
            </div>
            <div>
              <h4 className='font-bold text-gray-900 text-lg mb-1'>Atención Personalizada</h4>
              <p className='text-gray-500 text-sm leading-relaxed'>Nuestro equipo está aquí para escuchar tus necesidades y realzar tu belleza única.</p>
            </div>
          </div>
          
          {/* Beneficio 2 */}
          <div className='flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors'>
            <div className='bg-[#fdf2f8] text-[#e43c8a] p-3 rounded-2xl shrink-0 border border-[#fce7f3] shadow-sm'>
              <IconCertificate size={28} stroke={1.5} />
            </div>
            <div>
              <h4 className='font-bold text-gray-900 text-lg mb-1'>Calidad Premium</h4>
              <p className='text-gray-500 text-sm leading-relaxed'>Utilizamos los mejores productos del mercado para garantizarte resultados duraderos y seguros.</p>
            </div>
          </div>

          {/* Beneficio 3 */}
          <div className='flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors'>
            <div className='bg-[#fdf2f8] text-[#e43c8a] p-3 rounded-2xl shrink-0 border border-[#fce7f3] shadow-sm'>
              <IconUsersGroup size={28} stroke={1.5} />
            </div>
            <div>
              <h4 className='font-bold text-gray-900 text-lg mb-1'>Ambiente Exclusivo</h4>
              <p className='text-gray-500 text-sm leading-relaxed'>Únete a nuestras clientas satisfechas en un espacio diseñado para tu completa relajación.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default OurStory
