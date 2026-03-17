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
