import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CursoDetalle from '../../components/settings/CursoDetalle'
import { getCursoById } from '../../services/cursos'
import LoadingSpinner from '../../components/utils/LoadingSpinner'

const CursoDetallePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getCursoById(id)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        setError(err?.response?.data?.message ?? 'No se pudo cargar el curso.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  const handleBack = () => {
    navigate(-1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <LoadingSpinner />
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className='max-w-6xl mx-auto px-4 lg:px-8 py-20 flex flex-col items-center gap-4 text-center'>
  //       <p className='text-gray-500 text-sm'>{error}</p>
  //       <button
  //         onClick={handleBack}
  //         className='text-sm font-bold text-[#c2a381] hover:underline'
  //       >
  //         ← Volver
  //       </button>
  //     </div>
  //   )
  // }

  return (
    <div className='max-w-6xl mx-auto px-4 lg:px-8'>
      <CursoDetalle data={data} onBack={handleBack} />
    </div>
  )
}

export default CursoDetallePage

