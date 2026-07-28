import { useState } from 'react'
import { IconUserPlus, IconEye, IconEyeOff } from '@tabler/icons-react'
import { Formik, Form, Field } from 'formik'
import { toast } from 'sonner'
import { apiCrearUsuario } from '../../services/usuarios'
import { validarCrearUsuario } from '../../utils/formValidation'

const CreateUser = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await apiCrearUsuario(values)
      toast.success('Usuario creado exitosamente')
      resetForm()
    } catch (error) {
      const msg = error?.response?.data?.message || 'Error al crear el usuario'
      toast.error(msg)
    }
  }

  return (
    <div className='w-full max-w-2xl mx-auto space-y-6'>
      {/* Header */}
      <div>
        <h2 className='text-2xl font-black text-gray-900'>Crear Usuario</h2>
        <p className='text-gray-500 text-sm mt-0.5'>
          Registra un nuevo usuario en el sistema
        </p>
      </div>

      {/* Formulario Formik */}
      <Formik
        initialValues={{
          nombre: '',
          apellido: '',
          email: '',
          contrasena: '',
          telefono: '',
        }}
        validationSchema={validarCrearUsuario}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, resetForm }) => (
          <Form className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
            {/* Barra decorativa superior */}
            <div className='bg-[#faf7f5] px-6 py-4 border-b border-[#f3ece5] flex items-center gap-2'>
              <div className='w-9 h-9 rounded-full bg-[#c2a381]/10 flex items-center justify-center text-[#c2a381]'>
                <IconUserPlus size={18} stroke={2} />
              </div>
              <div>
                <h3 className='font-bold text-gray-900 text-sm'>
                  Información del Usuario
                </h3>
                <p className='text-xs text-gray-400'>Todos los campos son obligatorios</p>
              </div>
            </div>

            <div className='p-6 space-y-5'>
              {/* Nombre y Apellido en una fila */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                {/* Nombre */}
                <div>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
                    Nombre
                  </label>
                  <Field
                    type='text'
                    name='nombre'
                    disabled={isSubmitting}
                    placeholder='Ej: Maria'
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all disabled:opacity-60 disabled:bg-gray-50 ${
                      touched.nombre && errors.nombre
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
                    }`}
                  />
                  {touched.nombre && errors.nombre && (
                    <p className='text-red-500 text-xs mt-1'>* {errors.nombre}</p>
                  )}
                </div>

                {/* Apellido */}
                <div>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
                    Apellido
                  </label>
                  <Field
                    type='text'
                    name='apellido'
                    disabled={isSubmitting}
                    placeholder='Ej: López'
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all disabled:opacity-60 disabled:bg-gray-50 ${
                      touched.apellido && errors.apellido
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
                    }`}
                  />
                  {touched.apellido && errors.apellido && (
                    <p className='text-red-500 text-xs mt-1'>* {errors.apellido}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
                  Correo Electrónico
                </label>
                <Field
                  type='email'
                  name='email'
                  disabled={isSubmitting}
                  placeholder='Ej: maria@correo.com'
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all disabled:opacity-60 disabled:bg-gray-50 ${
                    touched.email && errors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
                  }`}
                />
                {touched.email && errors.email && (
                  <p className='text-red-500 text-xs mt-1'>* {errors.email}</p>
                )}
              </div>

              {/* Contraseña */}
              <div>
                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
                  Contraseña
                </label>
                <div className='relative'>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name='contrasena'
                    disabled={isSubmitting}
                    placeholder='••••••••'
                    className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all disabled:opacity-60 disabled:bg-gray-50 ${
                      touched.contrasena && errors.contrasena
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((v) => !v)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c2a381] transition-colors'
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <IconEyeOff size={18} stroke={1.5} />
                    ) : (
                      <IconEye size={18} stroke={1.5} />
                    )}
                  </button>
                </div>
                {touched.contrasena && errors.contrasena && (
                  <p className='text-red-500 text-xs mt-1'>* {errors.contrasena}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
                  Teléfono
                </label>
                <Field
                  type='tel'
                  name='telefono'
                  disabled={isSubmitting}
                  placeholder='Ej: +52 55 1234 5678'
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all disabled:opacity-60 disabled:bg-gray-50 ${
                    touched.telefono && errors.telefono
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
                  }`}
                />
                {touched.telefono && errors.telefono && (
                  <p className='text-red-500 text-xs mt-1'>* {errors.telefono}</p>
                )}
              </div>
            </div>

            {/* Footer con botones */}
            <div className='px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#c2a381] text-white font-bold text-sm shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0'
              >
                {isSubmitting ? 'Creando...' : 'Crear Usuario'}
              </button>
              <button
                type='button'
                onClick={() => resetForm()}
                disabled={isSubmitting}
                className='px-6 py-2.5 rounded-full border border-gray-200 bg-white text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Limpiar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateUser
