import Servicio from './Servicio'
import micro from '../../assets/img/body/micro.png'
import extenciones from '../../assets/img/body/extensiones.png'
import lifting from '../../assets/img/body/lifting.png'
import cejas from '../../assets/img/body/cejas.png'

const Body = () => {
  return (
    <div>
      <div className='mt-[50px]'>
        <p className='montserrat-semibold text-[28px] leading-[48.76px] tracking-[0] text-center mt-[20px] text-[#D8B192]'>
          SERVICIOS
        </p>
      </div>
      <div className='flex justify-evenly mt-[50px]'>
        <div data-aos='fade-down'>
          <Servicio
            url={micro}
            text={
              <>
                micro pigmentación de labios <br /> cejas y párpados
              </>
            }
          />
        </div>
        <div data-aos='fade-up'>
          <Servicio url={extenciones} text={'Extensiones de pestañas'} />
        </div>
        <div data-aos='fade-down'>
          <Servicio url={lifting} text={'Lifting de pestañas'} />
        </div>
        <div data-aos='fade-up'>
          <Servicio
            data-aos='fade-up'
            url={cejas}
            text={
              <>
                Diseño y depilación <br /> de cejas
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Body
