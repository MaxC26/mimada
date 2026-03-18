import { useLocation, useNavigate } from 'react-router-dom'
import CrearCurso from '../../components/settings/CrearCurso'
import { routes } from '../../utils/rutas'

/**
 * Handles both "Subir Nuevo Curso" (/cursos/subir) and
 * "Editar Curso" (/cursos/editar/:id).
 *
 * When editing, the course object is expected in location.state.curso
 * (passed by CursosSection via navigate state).
 */
const CrearCursoSection = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const curso = state?.curso || null

  return <CrearCurso curso={curso} onBack={() => navigate(routes.dashboard.cursos)} />
}

export default CrearCursoSection

