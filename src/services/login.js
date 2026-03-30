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

// Obtiene el perfil del usuario activo (basado en la cookie)
export async function getMe() {
  const response = await axios.get(`${routes.backend.url}${routes.backend.user.me}`)
  return response.data
}

export async function logout() {
  try {
    // El frontend ya no usa localStorage.
    await axios.post(`${routes.backend.url}${routes.backend.user.logout}`)
  } catch (error) {
    console.error('Error durante el logout', error)
  } finally {
    // Usamos window.location.href en lugar de navigate de React Router 
    // y NO limpiamos el context manualmente aquí para evitar que el <ProtectedRoute> 
    // te mande al /login por un milisegundo antes de que la página recargue.
    window.location.href = routes.inicio
  }
}
