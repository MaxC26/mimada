import logoMimada from '../../assets/img/logo/logo-mimada.png'

const LoadingSpinner = ({ className = 'flex justify-center items-center py-20' }) => {
  return (
    <div className={className}>
      <div className='relative w-20 h-20 flex items-center justify-center'>
        <div className='absolute inset-0 rounded-full border-[5px] border-[#fce7f3]'></div>
        <div className='absolute inset-0 rounded-full border-[5px] border-[#e43c8a] border-t-transparent animate-spin'></div>
        <img src={logoMimada} alt='Mimada' className='absolute w-8 h-auto object-contain animate-pulse' />
      </div>
    </div>
  )
}

export default LoadingSpinner
