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

// Obtiene la información del contenido por sección
export function updateSection(data) {
  const formData = new FormData()
  formData.append('file', data.file)
  Object.keys(data).forEach((key) => {
    if (key !== 'file') {
      formData.append(key, data[key])
    }
  })

  return new Promise((resolve, reject) => {
    axios
      .put(`${routes.backend.url}${routes.backend.contenido.updateSection}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
