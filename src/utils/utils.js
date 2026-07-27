import { jwtDecode } from 'jwt-decode'
import { routes } from './rutas'

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


/**
 * Determines if a route path is active based on the current pathname.
 * @param {string} pathname - The current location.pathname.
 * @param {string} path - The route path to check against.
 * @param {'exact'|'startsWith'|'home'} mode - Matching strategy:
 *   - 'exact': matches path or path + '/' (default)
 *   - 'startsWith': matches if pathname begins with path
 *   - 'home': matches against the known home route aliases
 */
export const isRouteActive = (pathname, path, mode = 'exact') => {
  if (mode === 'home') {
    const homeRoutes = [routes.inicio, routes.home, routes.home + '/']
    return homeRoutes.includes(pathname)
  }
  if (mode === 'startsWith') return pathname.startsWith(path)
  return pathname === path || pathname === path + '/'
}
