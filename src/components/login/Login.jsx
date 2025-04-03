import { IconKey, IconMail, IconPassword } from '@tabler/icons-react'
import { useState } from 'react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt with:', formData)
    // Add your authentication logic here
  }

  return (
    <div>
      <div className='flex min-h-screen items-center justify-center bg-base-200 p-4'>
        <div className='card w-full max-w-md bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title text-2xl font-bold text-center'>Login</h2>
            <p className='text-center text-base-content/70 mb-6'>
              Welcome back! Please enter your details
            </p>

            <form onSubmit={handleSubmit}>
              <div className='form-control w-full mb-4'>
                <label className='input validator w-full'>
                  <IconMail stroke={1} className='opacity-50' />
                  <input
                    className='w-full'
                    type='email'
                    placeholder='mail@site.com'
                    required
                  />
                </label>
                <div className='validator-hint hidden'>Enter valid email address</div>
              </div>

              <div className='form-control w-full mb-2'>
                <label className='input validator w-full'>
                  <IconPassword stroke={1} className='opacity-50' />

                  <input
                    type='password'
                    required
                    placeholder='Password'
                    minLength='8'
                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    title='Must be more than 8 characters, including number, lowercase letter, uppercase letter'
                  />
                  <button>
                    <IconKey
                      stroke={1}
                      // className='absolute right-2 top-1/2 transform -translate-y-1/2'
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </button>
                </label>
              </div>

              <div className='flex items-center justify-between mb-6'>
                <div className='form-control'>
                  <label className='label cursor-pointer gap-2'>
                    <input
                      type='checkbox'
                      name='rememberMe'
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className='checkbox checkbox-sm'
                    />
                    <span className='label-text'>Remember me</span>
                  </label>
                </div>
                <a href='#' className='text-sm text-primary hover:underline'>
                  Forgot password?
                </a>
              </div>

              <button type='submit' className='btn btn-primary w-full'>
                Sign in
              </button>
            </form>

            <div className='divider my-6'>OR</div>

            <button className='btn btn-outline w-full mb-4'>Continue with Google</button>

            <p className='text-center mt-4'>
              Dont have an account?{' '}
              <a href='#' className='text-primary hover:underline'>
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
