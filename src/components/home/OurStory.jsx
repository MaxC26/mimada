import ourStory from '../../assets/img/ourstory.png'

const OurStory = () => {
  return (
    <div className='flex h-screen]'>
      <div className='w-[55%] mt-[50px] pl-[60px]' data-aos='fade-right'>
        <img src={ourStory} alt='our-story' />
      </div>
      <div
        className='w-[45%] flex flex-col justify-center pl-[20px] mb-[100px]'
        data-aos='fade-left'
      >
        <p className='montserrat-semibold text-[40px] leading-[48.76px] tracking-[0] mt-[20px] text-[#D8B192] mb-[25px]'>
          OUR STORY
        </p>
        <div className='w-[400px]'>
          <p className='text-[16px] leading-[25px] tracking-[0]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna. Enim facilisis gravida neque convallis a
            cras semper.
            <br />
            <br />
            <b>Always Clean</b> <br /> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, seddo.
            <br />
            <br />
            <b>Always Leading And Ethical</b> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OurStory
