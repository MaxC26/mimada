const routesBackend = Object.freeze({
  baseURL: `http://localhost:3000`,
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
