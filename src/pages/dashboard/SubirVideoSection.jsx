import { useLocation, useNavigate } from 'react-router-dom'
import SubirVideo from '../../components/settings/SubirVideo'
import { routes } from '../../utils/rutas'

/**
 * Handles both "Subir Nuevo Curso" (/cursos/subir) and
 * "Editar Curso" (/cursos/editar/:id).
 *
 * When editing, the course object is expected in location.state.curso
 * (passed by CursosSection via navigate state).
 */
const SubirVideoSection = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const curso = state?.curso || null

  return <SubirVideo curso={curso} onBack={() => navigate(routes.dashboard.cursos)} />
}

export default SubirVideoSection

