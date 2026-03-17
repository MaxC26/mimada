// # Para produccion
//const urlBackend = 'https://0so7jd0wwl.execute-api.us-east-1.amazonaws.com'
// const urlContext = '/prd/mmd/api'

// # Para desarrollo
const urlBackend = 'http://localhost:3000'
const urlContext = '/mmd/api'

const routesBackend = Object.freeze({
  url: `${urlBackend}${urlContext}`,
  user: {
    login: '/user/login',
    register: '/user/register',
    logout: '/user/logout',
  },
  contenido: {
    getAllContenido: '/contenido',
    getContenidoBySeccion: '/contenido/contenidoBySeccion?seccion=:seccion',
    updateSection: '/contenido/updateSeccion',
    updateSectionServicios: '/contenido/updateSeccionService',
  },
  cursos: {
    getCursos: '/cursos',
    getCursoById: '/cursos/:id',
    updateCurso: '/cursos/:id',
    deleteCurso: '/cursos/:id',
    createCurso: '/cursos',
    getCategorias: '/cursos/categorias',
  },
})
export const context = '/mimada'

const routeFiles = Object.freeze({
  delivery: context + '/external/desa/data/mimada',
})

export const routes = Object.freeze({
  home: context,
  inicio: '/',
  explorar: context + '/explorar',
  login: context + '/login',
  settings: context + '/settings',
  previsualizarInicio: context + '/previsualizar/inicio',
  previsualizarHistoria: context + '/previsualizar/historia',
  previsualizarServicio: context + '/previsualizar/servicio',
  backend: routesBackend,
  files: routeFiles,
})
