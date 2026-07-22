import { IconEye, IconEyeOff, IconMail, IconLock } from '@tabler/icons-react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { login, getMe } from '../../services/login'
import { validarLogin } from '../../utils/formValidation'
import { useLocation, useNavigate } from 'react-router-dom'
import logoMimada from '../../assets/img/logo/logo-mimada.png'
import { useAuth } from '../../context/AuthContext'
import SocialLoginButtons from './SocialLoginButtons'

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { loginContext } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [errorLogin, setErrorLogin] = useState(null)

  const onSubmitLogin = async (values) => {
    try {
      const response = await login(values)
      if (response.status === 200) {
        try {
          const meResponse = await getMe()
          if (meResponse?.user) {
            loginContext(meResponse.user)
          }
        } catch (meError) {
          console.error('Error al obtener perfil', meError)
        }

        const redirectTo = location.state?.from || '/'
        navigate(redirectTo, { replace: true })
      }
    } catch (error) {
      console.error(error)
      if (error.response) {
        console.error('Error response:', error.response.data)
        setErrorLogin(error.response.data.mensaje)
      }
    }
  }

  const handleSocialSuccess = () => {
    const redirectTo = location.state?.from || '/'
    navigate(redirectTo, { replace: true })
  }

  const handleSocialError = (message) => {
    setErrorLogin(message)
  }

  return (
    /* ── Wrapper principal ── */
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* ── Columna izquierda: Imagen full-height (solo desktop) ── */}
      <div className='hidden md:block md:w-1/2 relative'>
        <img
          src='https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop'
          alt='Mimada Belleza'
          className='absolute inset-0 w-full h-full object-cover'
        />
        {/* Overlay degradado */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
        {/* Texto sobre imagen */}
        <div className='absolute bottom-10 left-10 right-10 text-white'>
          <h2 className='text-4xl font-black leading-tight mb-3'>
            Eleva tu
            <br />
            <span className='text-[#e3d5c8]'>Belleza Natural</span>
          </h2>
          <p className='text-white/80 leading-relaxed'>
            Únete a nuestra comunidad de expertas y accede a tratamientos exclusivos y
            cursos premium.
          </p>
        </div>
      </div>

      {/* ── Columna derecha: Formulario full-height ── */}
      <div className='flex-1 bg-white flex items-center justify-center p-6 md:p-12'>
        <div className='w-full max-w-md'>
          {/* Logo + título */}
          <div className='mb-8'>
            {/* Imagen hero SOLO móvil (arriba del formulario) */}
            <div className='md:hidden w-full h-44 rounded-2xl overflow-hidden mb-6'>
              <img
                src='https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop'
                alt='Mimada'
                className='w-full h-full object-cover'
              />
            </div>

            <div className='flex items-center gap-3 mb-5'>
              <img
                src={logoMimada}
                alt='Logo Mimada'
                className='h-14 w-auto object-contain'
              />
              <span className='text-3xl font-black text-[#c2a381]'>Mimada</span>
            </div>

            <h1 className='text-3xl font-black text-gray-900 mb-1'>
              ¡Bienvenido de nuevo!
            </h1>
            <p className='text-gray-500 text-sm'>Inicia sesión para continuar</p>
          </div>

          {/* Formulario Formik */}
          <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onSubmitLogin}
            validationSchema={validarLogin}
          >
            {({ handleSubmit, errors, isSubmitting }) => (
              <Form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {/* Email */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                    Correo electrónico
                  </label>
                  <div
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all ${errors.email ? 'border-red-400' : 'border-gray-200 focus-within:border-[#c2a381] focus-within:ring-2 focus-within:ring-[#f3ece5]'}`}
                  >
                    <IconMail size={18} className='text-gray-400 shrink-0' stroke={1.5} />
                    <Field
                      type='email'
                      name='email'
                      placeholder='ejemplo@mimada.com'
                      className='flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400'
                    />
                  </div>
                  {errors.email && (
                    <p className='text-red-500 text-xs mt-1'>* {errors.email}</p>
                  )}
                </div>

                {/* Contraseña */}
                <div>
                  <div className='flex items-center justify-between mb-1.5'>
                    <label className='text-sm font-semibold text-gray-700'>
                      Contraseña
                    </label>
                    {/* <button type='button' className='text-xs font-semibold text-[#c2a381] hover:underline'>
                      ¿Olvidaste tu contraseña?
                    </button> */}
                  </div>
                  <div
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all ${errors.password ? 'border-red-400' : 'border-gray-200 focus-within:border-[#c2a381] focus-within:ring-2 focus-within:ring-[#f3ece5]'}`}
                  >
                    <IconLock size={18} className='text-gray-400 shrink-0' stroke={1.5} />
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      placeholder='Ingresa tu contraseña'
                      className='flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='text-gray-400 hover:text-gray-600 shrink-0'
                      aria-label={
                        showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                      }
                    >
                      {showPassword ? (
                        <IconEyeOff size={18} stroke={1.5} />
                      ) : (
                        <IconEye size={18} stroke={1.5} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='text-red-500 text-xs mt-1'>* {errors.password}</p>
                  )}
                </div>

                {/* Error de login */}
                {errorLogin && (
                  <p className='text-red-500 text-sm text-center bg-red-50 px-4 py-2 rounded-xl'>
                    * Usuario o contraseña incorrectos
                  </p>
                )}

                {/* Botón de submit */}
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full mt-1 bg-[#c2a381] text-white font-bold py-3.5 rounded-full hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-[#c2a381]/30 flex items-center justify-center gap-2'
                >
                  {isSubmitting ? (
                    <span className='inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  ) : (
                    'Iniciar sesión'
                  )}
                </button>
              </Form>
            )}
          </Formik>

          {/* Divisor OR */}
          <div className='flex items-center gap-3 my-5'>
            <div className='flex-1 h-px bg-gray-200' />
            <span className='text-xs font-semibold text-gray-400 uppercase tracking-widest'>
              O continúa con
            </span>
            <div className='flex-1 h-px bg-gray-200' />
          </div>

          {/* Botones sociales */}
          <SocialLoginButtons
            onSuccess={handleSocialSuccess}
            onError={handleSocialError}
          />

          {/* Registro */}
          {/* <p className='text-center text-sm text-gray-500 mt-6'>
            ¿No tienes cuenta?{' '}
            <button className='text-[#c2a381] font-bold hover:underline'>
              Crear cuenta
            </button>
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default Login
