import { IconHome } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const NotAllowePage = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-12'>
      <div className='text-center max-w-md w-full bg-white rounded-lg shadow-md p-6 md:p-8 border border-stone-100'>
        <div className='mb-8'>
          <h1 className='text-6xl md:text-8xl font-serif text-stone-800 mb-6'>🚫</h1>
          <h2 className='text-2xl md:text-3xl font-serif text-stone-800 mb-4'>
            Acceso denegado
          </h2>
          <p className='text-stone-600 mb-6'>
            Lo sentimos, no tienes permisos para acceder a esta página.
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4 justify-center'>
          <button
            onClick={goHome}
            className='flex items-center justify-center gap-2 px-5 py-3 bg-rose-100 text-stone-700 rounded-full hover:bg-rose-200 transition-colors'
          >
            <IconHome stroke={2} size={18} />
            <span>Ir al inicio</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotAllowePage
