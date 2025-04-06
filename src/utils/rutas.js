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
})
export const context = '/mimada'

const routeFiles = Object.freeze({
  delivery: context + '/external/desa/data/mimada',
})

export const routes = Object.freeze({
  home: context,
  login: context + '/login',
  settings: context + '/settings',
  previsualizarInicio: context + '/previsualizar/inicio',
  previsualizarHistoria: context + '/previsualizar/historia',
  previsualizarServicio: context + '/previsualizar/servicio',
  backend: routesBackend,
  files: routeFiles,
})

