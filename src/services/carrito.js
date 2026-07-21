import axios from 'axios'
import { routes } from '../utils/rutas'

const BASE = routes.backend.url
const CART = routes.backend.carrito

/**
 * Obtiene el carrito del usuario autenticado desde el servidor.
 * GET /cart
 * @returns {Promise<{ items: Array, total: number }>}
 */
export function getCarrito() {
  return axios.get(`${BASE}${CART.getCarrito}`)
}

/**
 * Agrega un curso al carrito del usuario en el servidor.
 * POST /cart/item  →  body: { cursoId }
 * @param {string|number} cursoId
 * @returns {Promise}
 */
export function addItemCarrito(cursoId) {
  return axios.post(`${BASE}${CART.addItem}`, { cursoId })
}

/**
 * Elimina un curso del carrito del usuario en el servidor.
 * DELETE /cart/item/:id
 * @param {string|number} cursoId
 * @returns {Promise}
 */
export function removeItemCarrito(cursoId) {
  const url = `${BASE}${CART.removeItem}`.replace(':id', cursoId)
  return axios.delete(url)
}

/**
 * Vacía por completo el carrito del usuario en el servidor.
 * DELETE /cart
 * @returns {Promise}
 */
export function clearCarritoRemoto() {
  return axios.delete(`${BASE}${CART.clearCarrito}`)
}

