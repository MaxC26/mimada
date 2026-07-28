import axios from 'axios'
import { routes } from '../utils/rutas'

export const apiCrearInstructor = async (data) => {
  try {
    const url = `${routes.backend.url}${routes.backend.instructor.register}`
    const response = await axios.post(url, data)
    return response.data
  } catch (error) {
    console.error('Error al crear instructor:', error)
    throw error
  }
}

export const apiActualizarInstructor = async (data) => {
  try {
    const url = `${routes.backend.url}${routes.backend.instructor.updateInstructor}`
    const response = await axios.put(url, data)
    return response.data
  } catch (error) {
    console.error('Error al actualizar instructor:', error)
    throw error
  }
}

export const apiEliminarInstructor = async (id) => {
  try {
    const url = `${routes.backend.url}${routes.backend.instructor.deleteInstructor.replace(':id', id)}`
    const response = await axios.delete(url)
    return response.data
  } catch (error) {
    console.error('Error al eliminar instructor:', error)
    throw error
  }
}
