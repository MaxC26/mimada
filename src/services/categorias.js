import axios from 'axios'
import { routes } from '../utils/rutas'

export const apiGetCategorias = async () => {
  try {
    const url = `${routes.backend.url}${routes.backend.categorias.getCategorias}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    throw error
  }
}

export const apiCrearCategoria = async (nombre) => {
  try {
    const url = `${routes.backend.url}${routes.backend.categorias.createCategoria}`
    const response = await axios.post(url, { nombre })
    return response.data
  } catch (error) {
    console.error('Error al crear categoría:', error)
    throw error
  }
}

export const apiActualizarCategoria = async (payload) => {
  try {
    const url = `${routes.backend.url}${routes.backend.categorias.updateCategoria}`
    const response = await axios.put(url, payload)
    return response.data
  } catch (error) {
    console.error('Error al actualizar categoría:', error)
    throw error
  }
}

export const apiEliminarCategoria = async (codigo) => {
  try {
    const url = `${routes.backend.url}${routes.backend.categorias.deleteCategoria}`
    const response = await axios.delete(url, { params: { codigo } })
    return response.data
  } catch (error) {
    console.error('Error al eliminar categoría:', error)
    throw error
  }
}