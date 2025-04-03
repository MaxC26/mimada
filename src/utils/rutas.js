const urlBackend = 'http://localhost:3000'
const urlContext = '/mmd/api'
const routesBackend = Object.freeze({
  url: `${urlBackend}${urlContext}`,
  login: '/login',
  contenido: {
    getAllContenido: '/contenido',
    getContenidoBySeccion: '/contenido/contenidoBySeccion?seccion=:seccion',
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
  backend: routesBackend,
  files: routeFiles,
})
