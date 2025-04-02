import extensioncejas from '../../assets/img/extensioncejas.png'
import micropigmentacion from '../../assets/img/micropigmentacion.png'
import lifting from '../../assets/img/lifting.png'
import cejas from '../../assets/img/disenoCejas.png'
import { ItenServicio } from '../utils/ItenServicio'

const Body = () => {
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
          img={micropigmentacion}
          descripcion={'Micro pigmentación de labios cejas y párpados'}
          dataAos={'fade-up'}
        />
        <ItenServicio
          img={extensioncejas}
          descripcion={'Extensiones de pestañas'}
          dataAos={'fade-down'}
        />
        <ItenServicio
          img={lifting}
          descripcion={'Lifting de pestañas'}
          dataAos={'fade-up'}
        />
        <ItenServicio
          img={cejas}
          descripcion={'Diseño y depilación de cejas'}
          dataAos={'fade-down'}
        />
      </div>
    </div>
  )
}

export default Body

