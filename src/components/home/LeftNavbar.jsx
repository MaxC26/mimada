const LeftNavbar = () => {
  return (
    <div
      data-aos='zoom-in'
      className='w-[55%] mt-[0] flex flex-col justify-between'
      style={{
        height: '100vh',
      }}
    >
      <div className='flex flex-col justify-between h-[calc(100%-270px)]'>
        <div>
          <p className='prata-regular text-[60px] ml-[150px] pt-[15px]'>MIMADA</p>
          <p className='cormorant-garamond-semibold text-[76px] leading-[73.8px] tracking-[0] ml-[80px] mt-[20px]'>
            REVEAL YOUR <br />
            BEAUTY
          </p>
        </div>
        <div>
          <p className='text-[30px] leading-[44px] tracking-[0] ml-[80px]'>
            <span className='corinthia-bold text-[#e16363]'>Our</span>
            <span className='cormorant-garamond-bold ml-[10px]'>Philosophy</span>
          </p>
          <p className='inter-regular text-[#1B1B1B] ml-[80px] mt-[10px] text-[20px] leading-[24px] tracking-[0]'>
            It is a long established fact that a reader will be <br /> distracted by the
            readable content of a page <br /> when looking at its layout. The point of
            using
            <br /> Lorem Ipsum is that it has a more-or-less
          </p>
        </div>
      </div>
    </div>
  )
}

export default LeftNavbar
