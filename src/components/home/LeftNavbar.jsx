import Lips from '../../assets/img/lips.webp'

const LeftNavbar = () => {
  return (
    <div className='contenedor-left'>
      <div className='contenedor-navbar'>
        <div className='contenedor-mimada-img'>
          <div className='txt-mm-ryb'>
            <p className='prata-regular txt-mimada' data-aos='zoom-in'>
              MIMADA
            </p>
            <p className='cormorant-garamond-semibold txt-reveal' data-aos='zoom-in'>
              REVELA TU <br />
              BELLEZA
            </p>
          </div>
          <img src={Lips} alt='Lips' className='img-lips' data-aos='flip-left' />
        </div>
        <div className='contenedor-our-left' data-aos='zoom-in'>
          <p className='content-our'>
            <span className='corinthia-bold txt-our'>Nuestra</span>
            <span className='cormorant-garamond-bold txt-philosophy'>Filosofía</span>
          </p>
          <p className='inter-regular txt-description'>
            La belleza es autenticidad y confianza. <br />
            Cuando te cuidas y te sientes bien, brillas con luz <br /> propia.{' '}
            <b>
              Realza tu esencia, abraza tu belleza y <br /> refleja tu mejor versión.
            </b>{' '}
            ✨
          </p>

          <p className='inter-regular txt-description-mobil'>
            La belleza es autenticidad y confianza. Cuando te cuidas y te sientes bien,
            brillas con luz propia.{' '}
            <b>Realza tu esencia, abraza tu belleza y refleja tu mejor versión.</b> ✨
          </p>
        </div>
      </div>
    </div>
  )
}

export default LeftNavbar
