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
    <div className='servicios w-full py-8 md:py-16' id='servicios'>
      {/* Title Section */}
      <div className='txt-servicios mb-8 md:mb-12'>
        <div className='bg-servicios bg-[#333] py-4 md:py-6'>
          <div className='body-servicios max-w-6xl mx-auto px-4'>
            <p className='montserrat-semibold text-3xl md:text-[40px] leading-tight md:leading-[48.76px] tracking-[0] text-center text-[#ffffff]'>
              SERVICIOS
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid - Responsive Grid Layout */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto px-4 mt-10 md:mt-20'>
        <ItenServicio
          img={imgServicio01}
          descripcion={textServicio01}
          dataAos={'fade-up'}
        />
        <ItenServicio
          img={imgServicio02}
          descripcion={textServicio02}
          dataAos={'fade-down'}
        />
        <ItenServicio
          img={imgServicio03}
          descripcion={textServicio03}
          dataAos={'fade-up'}
        />
        <ItenServicio
          img={imgServicio04}
          descripcion={textServicio04}
          dataAos={'fade-down'}
        />
      </div>
    </div>
  )
}

export default Body
