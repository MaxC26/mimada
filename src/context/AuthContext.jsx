import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../services/login'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = async () => {
    try {
      console.log('AuthContext: Verificando sesión con /me...')
      const data = await getMe()
      console.log('AuthContext: Respuesta de /me ->', data)
      if (data && data.user) {
        console.log('AuthContext: Usuario válido, logueando en frontend...')
        setUser(data.user)
        setIsAuthenticated(true)
      } else {
        console.warn('AuthContext: La respuesta no contenía data.user')
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('AuthContext: Error al verificar login:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const loginContext = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logoutContext = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
