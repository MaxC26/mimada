import axios from 'axios'
import { routes } from '../utils/rutas'

// Obtiene la información del contenido
export function getAllContenido() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${routes.backend.baseURL}/mmd/api/contenido`)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
