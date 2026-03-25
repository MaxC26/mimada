import { useLocation, useNavigate } from 'react-router-dom'
import CursoDetalle from '../../components/settings/CursoDetalle'

const CursoDetallePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const curso = location.state?.curso ?? null

  const handleBack = () => {
    navigate(-1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='max-w-6xl mx-auto px-4 lg:px-8'>
      <CursoDetalle curso={curso} onBack={handleBack} />
    </div>
  )
}

export default CursoDetallePage
