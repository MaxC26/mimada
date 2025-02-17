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
            It is a long established fact that a reader will be <br /> distracted by the
            readable content of a page <br /> when looking at its layout. The point of
            using
            <br /> Lorem Ipsum is that it has a more-or-less
          </p>

          <p className='inter-regular txt-description-mobil'>
            It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using Lorem Ipsum
            is that it has a more-or-less
          </p>
        </div>
      </div>
    </div>
  )
}

export default LeftNavbar
