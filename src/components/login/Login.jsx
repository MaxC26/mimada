import { IconEye, IconEyeOff, IconMail, IconLock } from '@tabler/icons-react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { login } from '../../services/login'
import { validarLogin } from '../../utils/formValidation'
import { useLocation, useNavigate } from 'react-router-dom'
import logoMimada from '../../assets/img/logo/logo-mimada.png'

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [errorLogin, setErrorLogin] = useState(null)

  const onSubmitLogin = async (values) => {
    try {
      const response = await login(values)
      if (response.status === 200) {
        const { data } = response
        localStorage.setItem('jwt', data.token)
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
            Eleva tu<br />
            <span className='text-[#e3d5c8]'>Belleza Natural</span>
          </h2>
          <p className='text-white/80 leading-relaxed'>
            Únete a nuestra comunidad de expertas y accede a tratamientos exclusivos y cursos premium.
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
              <img src={logoMimada} alt='Logo Mimada' className='h-14 w-auto object-contain' />
              <span className='text-3xl font-black text-[#c2a381]'>Mimada</span>
            </div>

            <h1 className='text-3xl font-black text-gray-900 mb-1'>¡Bienvenido de nuevo!</h1>
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
                  <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all ${errors.email ? 'border-red-400' : 'border-gray-200 focus-within:border-[#c2a381] focus-within:ring-2 focus-within:ring-[#f3ece5]'}`}>
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
                    <label className='text-sm font-semibold text-gray-700'>Contraseña</label>
                    <button type='button' className='text-xs font-semibold text-[#c2a381] hover:underline'>
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all ${errors.password ? 'border-red-400' : 'border-gray-200 focus-within:border-[#c2a381] focus-within:ring-2 focus-within:ring-[#f3ece5]'}`}>
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
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword
                        ? <IconEyeOff size={18} stroke={1.5} />
                        : <IconEye size={18} stroke={1.5} />
                      }
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
            <span className='text-xs font-semibold text-gray-400 uppercase tracking-widest'>O continúa con</span>
            <div className='flex-1 h-px bg-gray-200' />
          </div>

          {/* Botones sociales */}
          <div className='grid grid-cols-2 gap-3'>
            <button className='flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors'>
              {/* Google SVG Icon */}
              <svg width='18' height='18' viewBox='0 0 18 18'>
                <path fill='#EA4335' d='M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.616z'/>
                <path fill='#4285F4' d='M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z'/>
                <path fill='#FBBC05' d='M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z'/>
                <path fill='#34A853' d='M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z'/>
              </svg>
              Google
            </button>
            <button className='flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors'>
              {/* Facebook SVG Icon */}
              <svg width='18' height='18' viewBox='0 0 24 24' fill='#1877F2'>
                <path d='M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z'/>
              </svg>
              Facebook
            </button>
          </div>

          {/* Registro */}
          <p className='text-center text-sm text-gray-500 mt-6'>
            ¿No tienes cuenta?{' '}
            <button className='text-[#c2a381] font-bold hover:underline'>
              Crear cuenta
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
