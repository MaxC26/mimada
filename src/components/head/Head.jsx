import points from '../../assets/img/points.png'

export const Head = ({ content }) => {
  const { imgHead, textHead, textHead01 } = content

  return (
    <div
      className='bg-[#fcf8ef] w-full py-8 md:py-12 lg:py-16 overflow-hidden'
      id='inicio'
    >
      {/* Versión Móvil (imagen arriba, texto abajo) */}
      <div className='md:hidden px-5 mt-20'>
        {/* Imagen para móvil - cuadrada */}
        <div className='relative mb-10 mx-auto'>
          <div
            className='absolute z-0 w-full h-full bg-no-repeat bg-cover transform -translate-y-1/4 -translate-x-1/4'
            style={{ backgroundImage: `url(${points})` }}
          ></div>
          <div
            className='relative z-10 w-72 h-72 mx-auto rounded-full overflow-hidden bg-no-repeat bg-cover border-4 border-[#f9f3e3] shadow-lg'
            style={{ backgroundImage: `url(${imgHead})` }}
            data-aos='fade-in'
          ></div>
        </div>

        {/* Texto para móvil */}
        <div className='text-center mt-6' data-aos='fade-up'>
          <p className='font-serif text-4xl font-bold mb-2'>MIMADA</p>
          <p className='font-serif text-5xl font-semibold leading-tight mb-8'>
            {textHead}
          </p>

          <div className='mt-8'>
            <p className='mb-2'>
              <span className='font-cursive text-3xl text-[#e08f8f]'>Nuestra</span>
              <span className='font-serif text-2xl font-bold ml-2'>Filosofía</span>
            </p>
            <p className='text-base text-[#1b1b1b] px-4 mt-3'>{textHead01}</p>
          </div>
        </div>
      </div>

      {/* Versión Tablet/Desktop (lado a lado) */}
      <div className='hidden md:flex md:flex-row md:items-center md:justify-between md:px-[5%] lg:px-[10%] mt-10'>
        {/* Columna de texto */}
        <div className='md:w-1/2 lg:w-5/12' data-aos='fade-right'>
          <p
            className='prata-regular text-4xl md:text-5xl lg:text-6xl mt-10'
            data-aos='zoom-in'
          >
            MIMADA
          </p>
          <p
            className='cormorant-garamond-semibold text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mt-4'
            data-aos='zoom-in'
          >
            {textHead}
          </p>

          <div data-aos='zoom-in' className='mt-12 lg:mt-16'>
            <p className='flex items-baseline'>
              <span className='corinthia-bold text-3xl md:text-4xl text-[#e08f8f]'>
                Nuestra
              </span>
              <span className='cormorant-garamond-bold text-2xl md:text-3xl font-bold ml-2'>
                Filosofía
              </span>
            </p>
            <p className='inter-regular text-base md:text-lg lg:text-xl mt-4 pr-4 md:pr-8 lg:pr-24'>
              {textHead01}
            </p>
          </div>
        </div>

        {/* Imagen para desktop/tablet */}
        <div
          className='md:w-1/2 lg:w-7/12 relative mt-10'
          style={{ position: 'relative' }}
        >
          <div
            className='absolute bg-no-repeat bg-cover'
            style={{
              backgroundImage: `url(${points})`,
              width: '600px',
              height: '600px',
              marginTop: '-200px',
              marginLeft: '-150px',
              left: 0,
              top: 0,
            }}
          ></div>
          <div
            className='bg-no-repeat bg-cover rounded-tl-[265px] ml-auto'
            style={{
              backgroundImage: `url(${imgHead})`,
              minWidth: '380px',
              width: '100%',
              height: '90vh',
              maxHeight: '700px',
            }}
            data-aos='fade-left'
          ></div>
        </div>
      </div>
    </div>
  )
}
