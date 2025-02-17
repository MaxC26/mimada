import ourStory from '../../assets/img/ourstory.webp'

const OurStory = () => {
  return (
    <div className='flex mt-[30px] content-ourstory'>
      <div className='img-ourstory' data-aos='flip-left'>
        <img src={ourStory} alt='our-story' />
      </div>
      <div className='flex flex-col justify-center txt-ourstory' data-aos='flip-right'>
        <p className='txt-our-story montserrat-semibold text-[40px] leading-[48.76px] tracking-[0] mt-[20px] text-[#D8B192] mb-[25px]'>
          NUESTRA HISTORIA
        </p>
        <div className='txt-description-ourstory'>
          <p className='text-[16px] leading-[25px] tracking-[0]'>
            Somos un studio especializado en realzar tu belleza con técnicas avanzadas en
            pestañas, cejas, labios y más. Ofrecemos servicios profesionales y
            certificaciones para que también puedas convertir tu pasión en tu profesión.
            <br />
            <br />
            Contamos con más 8 años de experiencia y certificaciones a nivel internacional
            para ofrecerte un servido de la más alta calidad
          </p>
        </div>
      </div>
    </div>
  )
}

export default OurStory
