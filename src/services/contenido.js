import axios from 'axios'
import { routes } from '../utils/rutas'

// Obtiene la información del contenido
export function getAllContenido() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${routes.backend.url}${routes.backend.contenido.getAllContenido}`)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

// Obtiene la información del contenido por sección
export function getContenidoBySeccion(seccion) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${routes.backend.url}${routes.backend.contenido.getContenidoBySeccion.replace(
          ':seccion',
          seccion
        )}`
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
