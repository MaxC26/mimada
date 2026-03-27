const Banner = () => {
  return (
    <div className='w-full bg-[#faf7f5] rounded-[2rem] p-8 md:p-12 mb-10 md:mb-14 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden'>
      <div className='w-full md:w-1/2 z-10'>
        <h1 className='text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-4 tracking-tight'>
          Domina el arte de <br className='hidden md:block' />
          la <span className='text-[#c2a381]'>belleza</span>
        </h1>
        <p className='text-gray-600 text-lg md:text-xl mb-8 max-w-md'>
          Aprende con las mejores expertas de la industria desde la comodidad de tu casa.
        </p>
        <button className='bg-[#c2a381] text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full md:w-auto shadow-md'>
          Empieza Ahora
        </button>
      </div>
      <div className='w-full md:w-5/12 mt-10 md:mt-0 relative z-10'>
        <div className='relative aspect-square w-full max-w-[400px] mx-auto overflow-hidden rounded-[2rem] shadow-2xl origin-bottom-right md:rotate-3'>
          <img
            src='https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop'
            alt='Makeup Courses'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default Banner
