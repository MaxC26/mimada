import axios from 'axios'
import { routes } from '../utils/rutas'

// Obtiene la información del contenido
export function login(data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${routes.backend.url}${routes.backend.user.login}`, data)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
