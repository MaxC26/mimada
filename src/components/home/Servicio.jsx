// eslint-disable-next-line react/prop-types
const Servicio = ({ url, text }) => {
  return (
    <div className='flex flex-col items-center'>
      <img className='w-[130px]' src={url} alt='' />
      <p className='text-center mt-[10px]'>{text}</p>
    </div>
  )
}

export default Servicio

