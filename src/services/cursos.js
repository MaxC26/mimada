import axios from 'axios'
import { routes } from '../utils/rutas'

// Obtiene la información del contenido por sección
export function getCategorias() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${routes.backend.url}${routes.backend.cursos.getCategorias}`)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
