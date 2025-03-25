import Servicio from './Servicio'
import micro from '../../assets/img/body/micro.webp'
import extenciones from '../../assets/img/body/extensiones.webp'
import lifting from '../../assets/img/body/lifting.webp'
import cejas from '../../assets/img/body/cejas.webp'

const Body = () => {
  return (
    <div id='servicios'>
      <div className='servicios]'>
        <p className='montserrat-semibold text-[28px] leading-[48.76px] tracking-[0] text-center mt-[20px] text-[#D8B192]'>
          SERVICIOS
        </p>
      </div>
      <div className='contenedor-servicios'>
        <div className='fila-servicios flex justify-around'>
          <div data-aos='flip-left'>
            <Servicio
              url={micro}
              text={
                <>
                  micro pigmentación de labios <br /> cejas y párpados
                </>
              }
            />
          </div>
          <div data-aos='flip-down'>
            <Servicio url={extenciones} text={'Extensiones de pestañas'} />
          </div>
        </div>
        <div className='fila-servicios flex justify-around'>
          <div data-aos='flip-left'>
            <Servicio url={lifting} text={'Lifting de pestañas'} />
          </div>
          <div data-aos='flip-down'>
            <Servicio
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
    </div>
  )
}

export default Body

