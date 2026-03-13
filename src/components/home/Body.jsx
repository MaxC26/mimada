import { ItenServicio } from '../utils/ItenServicio'

const Body = ({ content }) => {
  const {
    imgServicio01,
    textServicio01,
    imgServicio02,
    textServicio02,
    imgServicio03,
    textServicio03,
    imgServicio04,
    textServicio04,
  } = content

  return (
    <div className='w-full py-16 md:py-24 bg-white relative' id='servicios'>
      {/* Elemento de fondo difuso para darle riqueza al fondo blanco puro */}
      <div className='absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gray-50/50 to-white -z-10'></div>
      <div className='max-w-7xl mx-auto px-4 lg:px-8'>


        {/* Title Section */}
        <div className='mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between border-b border-gray-200 pb-6'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>Servicios Populares</h2>
            <p className='text-gray-500 text-lg'>Nuestra selección para potenciar tu belleza</p>
          </div>
        </div>

        {/* Services Grid - Responsive Grid Layout */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          <ItenServicio
            img={imgServicio01}
            descripcion={textServicio01}
            delay={'100'}
          />
          <ItenServicio
            img={imgServicio02}
            descripcion={textServicio02}
            delay={'200'}
          />
          <ItenServicio
            img={imgServicio03}
            descripcion={textServicio03}
            delay={'300'}
          />
          <ItenServicio
            img={imgServicio04}
            descripcion={textServicio04}
            delay={'400'}
          />
        </div>



      </div>
    </div>
  )
}

export default Body
