import axios from 'axios'
import { routes } from '../utils/rutas'

export const apiCrearUsuario = async (data) => {
  try {
    const url = `${routes.backend.url}${routes.backend.user.register}`
    const response = await axios.post(url, data)
    return response.data
  } catch (error) {
    console.error('Error al crear usuario:', error)
    throw error
  }
}

export function getUsuarios() {
  const url = `${routes.backend.url}${routes.backend.user.getUsuarios}`
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export const apiActualizarUsuario = async (data) => {
  try {
    const url = `${routes.backend.url}${routes.backend.user.updateUser}`
    const response = await axios.put(url, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    throw error
  }
}

export const apiEliminarUsuario = async (id) => {
  try {
    const url = `${routes.backend.url}${routes.backend.user.deleteUser.replace(':id', id)}`
    const response = await axios.delete(url)
    return response.data
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    throw error
  }
}

export function getRoles() {
  const url = `${routes.backend.url}${routes.backend.contenido.getRoles}`
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
