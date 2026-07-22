import { jwtDecode } from 'jwt-decode'

export const decodeToken = (jwt) => {
  if (!jwt) return null
  let decodedToken = jwtDecode(jwt)
  return decodedToken
}

export const isTokenExpired = (token) => {
  const decoded = jwtDecode(token)
  return decoded.exp < Date.now() / 1000
}

/**
 * Returns the discount as a whole-number percentage of the price.
 * Returns '' if either value is missing or price is zero.
 */
export const calcPorcentajeDescuento = (descuento, precio) => {
  const d = Number(descuento)
  const p = Number(precio)
  if (!d || !p) return ''
  return ((d / p) * 100).toFixed(0)
}
