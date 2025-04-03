const OurStory = ({ content }) => {
  const { imgHistoria, textHistoria } = content

  return (
    <section
      id='nuestra-historia'
      className='container mx-auto px-4 py-12 md:py-16 lg:py-24 min-h-[60vh] flex items-center'
    >
      <div className='w-full'>
        {/* Versión móvil: columna */}
        <div className='flex flex-col md:hidden gap-8'>
          <div className='text-center' data-aos='fade-up'>
            <h2 className='font-semibold text-3xl text-[#D8B192] mb-4'>
              NUESTRA HISTORIA
            </h2>
            <p className='text-base leading-relaxed mx-auto max-w-md'>{textHistoria}</p>
          </div>
          <div className='flex justify-center'>
            <div
              className='w-56 h-56 overflow-hidden rounded-lg shadow-md'
              data-aos='flip-left'
            >
              <img
                src={imgHistoria}
                alt='Extensión de pestañas'
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>

        {/* Versión tablet y desktop */}
        <div className='hidden md:grid md:grid-cols-2 gap-8 lg:gap-16 items-center'>
          {/* Contenedor de imagen - a la izquierda */}
          <div className='flex justify-center' data-aos='fade-right'>
            <div className='w-80 h-80 lg:w-96 lg:h-96 xl:w-full xl:h-auto xl:max-h-96 overflow-hidden rounded-lg shadow-md'>
              <img
                src={imgHistoria}
                alt='Extensión de pestañas'
                className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
              />
            </div>
          </div>

          {/* Contenedor de texto - a la derecha */}
          <div data-aos='fade-left'>
            <h2 className='font-semibold text-3xl lg:text-4xl xl:text-5xl text-[#D8B192] mb-6'>
              NUESTRA HISTORIA
            </h2>
            <div>
              <p className='text-base lg:text-lg leading-relaxed max-w-lg'>
                {textHistoria}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStory
