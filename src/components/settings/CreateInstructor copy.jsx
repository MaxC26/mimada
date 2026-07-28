import { useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { Formik, Form, Field } from 'formik'
import { toast } from 'sonner'
import { apiCrearInstructor, apiActualizarInstructor } from '../../services/usuarios'
import { validarInstructor } from '../../utils/formValidation'

const CreateInstructor = ({
  onSuccess,
  instructorToEdit = null,
  onCancelEdit = null,
}) => {
  const Loading = (text) => toast.loading(text)
  const Success = (text) => toast.success(text)
  const ErrorMessage = (text) => toast.error(text)

  const [showPassword, setShowPassword] = useState(false)
  const isEditing = !!instructorToEdit

  const handleSubmit = async (values, { resetForm }) => {
    const toastId = Loading(
      isEditing ? 'Actualizando instructor...' : 'Creando instructor...'
    )
    const dataToSend = {
      ...values,
      roleid: 2,
      ...(isEditing && {
        userId: instructorToEdit.mmdusuarioid,
      }),
    }

    // Si está editando y el campo contraseña viene vacío, no enviarlo
    if (isEditing && !dataToSend.contrasena) {
      delete dataToSend.contrasena
    }

    try {
      if (isEditing) {
        await apiActualizarInstructor(dataToSend)
        toast.dismiss(toastId)
        Success('Instructor actualizado exitosamente')
      } else {
        await apiCrearInstructor(dataToSend)
        toast.dismiss(toastId)
        Success('Instructor creado exitosamente')
      }
      resetForm()
      if (onCancelEdit) onCancelEdit()
      if (onSuccess) onSuccess()
    } catch (error) {
      toast.dismiss(toastId)
      const msg =
        error?.response?.data?.message ||
        `Error al ${isEditing ? 'actualizar' : 'crear'} el instructor`
      ErrorMessage(msg)
    }
  }

  return (
    <div className='w-full max-w-4xl mx-auto space-y-6'>
      {/* Header */}
      <div>
        <h2 className='text-2xl font-black text-gray-900'>
          {isEditing ? 'Editar Instructor' : 'Crear Instructor'}
        </h2>
        <p className='text-gray-500 text-sm mt-0.5'>
          {isEditing
            ? 'Modifica la información del instructor seleccionado'
            : 'Registra un nuevo instructor en el sistema'}
        </p>
      </div>

      {/* Formulario Formik */}
      <Formik
        enableReinitialize
        initialValues={{
          nombre: instructorToEdit?.nombre || instructorToEdit?.name || '',
          apellido: instructorToEdit?.apellido || '',
          email: instructorToEdit?.email || '',
          contrasena: '',
          telefono: instructorToEdit?.telefono || instructorToEdit?.phone || '',
        }}
        validationSchema={validarInstructor(isEditing)}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, resetForm }) => (
          <Form className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
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
                  Contraseña{' '}
                  {isEditing && (
                    <span className='text-gray-400 text-xs font-normal capitalize'>
                      (Opcional al editar)
                    </span>
                  )}
                </label>
                <div className='relative'>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name='contrasena'
                    disabled={isSubmitting}
                    placeholder={
                      isEditing ? '•••••••• (Dejar en blanco para conservar)' : '••••••••'
                    }
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
                  maxLength={8}
                  minLength={8}
                  placeholder='Ej: 77777777'
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
                {isSubmitting
                  ? isEditing
                    ? 'Guardando...'
                    : 'Creando...'
                  : isEditing
                    ? 'Guardar Cambios'
                    : 'Crear Instructor'}
              </button>
              {isEditing ? (
                <button
                  type='button'
                  onClick={() => {
                    resetForm()
                    if (onCancelEdit) onCancelEdit()
                  }}
                  disabled={isSubmitting}
                  className='px-6 py-2.5 rounded-full border border-gray-200 bg-white text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Cancelar Edición
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => resetForm()}
                  disabled={isSubmitting}
                  className='px-6 py-2.5 rounded-full border border-gray-200 bg-white text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Limpiar
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateInstructor
