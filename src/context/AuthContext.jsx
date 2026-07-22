import { createContext, useContext, useState, useEffect } from 'react'
import { socialLogin, getMe } from '../services/login'
import { signInWithGoogle, signInWithFacebook } from '../services/google'

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

  /**
   * Social login genérico (usado internamente por handleGoogleLogin / handleFacebookLogin).
   * Recibe el firebaseUser y callbacks opcionales { onSuccess, onError }.
   */
  const processSocialLogin = async (firebaseUser, { onSuccess } = {}) => {
    const idToken = await firebaseUser.getIdToken()

    const response = await socialLogin({ idToken })

    if (response.status === 200) {
      try {
        const meResponse = await getMe()
        if (meResponse?.user) {
          loginContext(meResponse.user)
        }
      } catch (meError) {
        console.error('Error al obtener perfil', meError)
      }

      onSuccess?.()
    }
  }

  const handleGoogleLogin = async ({ onSuccess, onError } = {}) => {
    try {
      const userGoogle = await signInWithGoogle()
      if (userGoogle) {
        await processSocialLogin(userGoogle, { onSuccess, onError })
      }
    } catch (error) {
      console.error('Error en Google Login', error)
      const message = error.response?.data?.mensaje || 'Error al conectar con Google'
      onError?.(message)
    }
  }

  const handleFacebookLogin = async ({ onSuccess, onError } = {}) => {
    try {
      const userFacebook = await signInWithFacebook()
      if (userFacebook) {
        await processSocialLogin(userFacebook, { onSuccess, onError })
      }
    } catch (error) {
      console.error('Error en Facebook Login', error)
      const message = error.response?.data?.mensaje || 'Error al conectar con Facebook'
      onError?.(message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        loginContext,
        logoutContext,
        handleGoogleLogin,
        handleFacebookLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
