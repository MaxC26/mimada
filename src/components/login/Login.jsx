import { IconEye, IconEyeOff, IconLockPassword, IconMail } from '@tabler/icons-react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { login } from '../../services/login'
import { validarLogin } from '../../utils/formValidation'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [errorLogin, setErrorLogin] = useState(null)

  const onSubmitLogin = async (values) => {
    try {
      // const hashedPass = await bcrypt.hash(values.password, 10)

      const response = await login(values)
      if (response.status === 200) {
        const { data } = response
        localStorage.setItem('jwt', data.token)
        // Redirige a la ruta guardada (o a la página principal por defecto)
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
    <div>
      <div className='flex min-h-screen items-center justify-center bg-base-200 p-4'>
        <div className='card w-full max-w-md bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title text-2xl font-bold text-center'>Login</h2>
            <p className='text-center text-base-content/70 mb-5'>
              Bienvenido! Por favor ingresa tus credenciales.
            </p>

            <Formik
              initialValues={{
                email: '',
                password: '',
                rememberMe: false,
              }}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onSubmitLogin}
              validationSchema={validarLogin}
            >
              {({ handleSubmit, errors, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <label className={`input w-full ${errors.email && 'input-error'}`}>
                      <IconMail stroke={1} className='opacity-50' />
                      <Field
                        className={`w-full `}
                        type='text'
                        name='email'
                        placeholder='mail@site.com'
                      />
                    </label>
                    {errors.email && (
                      <div className='text-red-400 mt-1'>{'*' + errors.email}</div>
                    )}
                  </div>

                  <div className='mb-4'>
                    <label className={`input w-full ${errors.password && 'input-error'}`}>
                      <IconLockPassword stroke={1} className='opacity-50' />
                      <Field
                        className={errors.password && 'input-error'}
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='*********'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <IconEyeOff stroke={1} className='opacity-50' />
                        ) : (
                          <IconEye stroke={1} className='opacity-50' />
                        )}
                      </button>
                    </label>
                    {errors.password && (
                      <div className='text-red-400 mt-1'>{'*' + errors.password}</div>
                    )}
                  </div>

                  {errorLogin && (
                    <div className='text-red-400 mt-1 mb-3'>
                      *Usuario o contraseña incorrectos
                    </div>
                  )}

                  <button
                    type='submit'
                    className='btn btn-primary w-full'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className='loading loading-spinner loading-sm'></span>
                    ) : (
                      'Iniciar sesión'
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            {/* <div className='divider my-6'>OR</div>

            <button className='btn btn-outline w-full mb-4'>Continue with Google</button> */}

            {/* <p className='text-center mt-4'>
              Dont have an account?{' '}
              <Link href='#' className='text-primary hover:underline'>
                Sign up
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
