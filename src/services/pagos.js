import axios from 'axios'
import { routes } from '../utils/rutas'

export function createPayPalOrder(cursos) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${routes.backend.url}${routes.backend.pagos.createOrder}`, cursos)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export function capturePayPalOrder(orderId) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${routes.backend.url}${routes.backend.pagos.captureOrder}`, {
        paypalOrderId: orderId,
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
