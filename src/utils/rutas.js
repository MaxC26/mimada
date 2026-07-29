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
    register: '/user',
    updateUser: '/user/update-user',
    deleteUser: '/user/delete-user?userId=:id',
    logout: '/user/logout',
    me: '/user/me',
    socialLogin: '/user/social-login',
    getUsuarios: '/user/info-users',
  },
  instructor: {
    register: '/instructor',
    updateInstructor: '/instructor/update-instructor',
    deleteInstructor: '/instructor/delete-instructor?instructorId=:id',
    getInstructores: '/instructor/info-instructores',
  },
  contenido: {
    getAllContenido: '/contenido',
    getContenidoBySeccion: '/contenido/contenidoBySeccion?seccion=:seccion',
    updateSection: '/contenido/updateSeccion',
    updateSectionServicios: '/contenido/updateSeccionService',
    getRoles: '/contenido/roles',
  },
  cursos: {
    getCursos: '/cursos',
    getCursosByEstado: '/cursos/cursosByEstado?estado=:estado',
    getCursoById: '/cursos/detalle?cursoId=:id',
    getCursosPopulares: '/cursos/top',
    getMisCursos: '/cursos/mis-cursos',
    getEstadisticas: '/cursos/estadisticas',
    getCaracteristicas: '/cursos/caracteristicas-curso',
    createCurso: '/cursos',
    updateCurso: '/cursos',
    deleteCurso: '/cursos?cursoId=:id',
    getEstados: '/cursos/estados',
    getVideosCurso: '/cursos/videos?cursoId=:id',
    createVideo: '/cursos/videos',
    updateVideo: '/cursos/update-video',
    deleteVideo: '/cursos/videos?videoId=:id',
  },
  categorias: {
    getCategorias: '/categorias',
    createCategoria: '/categorias',
    updateCategoria: '/categorias',
    deleteCategoria: '/categorias',
  },
  carrito: {
    getCarrito: '/cart', // GET  → obtiene el carrito del usuario autenticado
    addItem: '/cart/item', // POST → agrega un curso al carrito { cursoId }
    removeItem: '/cart/item/:id', // DELETE → elimina un curso del carrito
    clearCarrito: '/cart', // DELETE → vacía todo el carrito
  },
  pagos: {
    createOrder: '/pagos/create-order',
    captureOrder: '/pagos/capture-order',
  },
})

export const context = '/mimada'

const routeFiles = Object.freeze({
  delivery: context + '/external/desa/data/mimada',
})

export const routes = Object.freeze({
  home: context,
  inicio: '/',
  explore: {
    base: context + '/explorar',
    inicio: context + '/explorar',
    cursos: context + '/explorar/cursos',
    detalle: context + '/explorar/cursos/:id',
    misCursos: context + '/explorar/mis-cursos',
  },
  login: context + '/login',
  checkout: context + '/checkout',
  settings: context + '/settings',
  dashboard: {
    base: context + '/settings',
    inicio: context + '/settings/inicio',
    servicios: context + '/settings/servicios',
    historia: context + '/settings/historia',
    cursos: context + '/settings/cursos',
    nuevoCurso: context + '/settings/cursos/nuevo',
    editarCurso: context + '/settings/cursos/editar/:id',
    categorias: context + '/settings/categorias',
    usuarios: context + '/settings/usuarios',
    instructores: context + '/settings/instructores',
  },
  previsualizarInicio: context + '/previsualizar/inicio',
  previsualizarHistoria: context + '/previsualizar/historia',
  previsualizarServicio: context + '/previsualizar/servicio',
  backend: routesBackend,
  files: routeFiles,
})
