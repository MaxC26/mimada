import { Formik, Form, Field } from 'formik'
import { validarInstructor } from '../../utils/formValidation'
import { toast } from 'sonner'
import { apiActualizarInstructor, apiCrearInstructor } from '../../services/instructor'

const CreateInstructor = ({
  onSuccess,
  instructorToEdit = null,
  onCancelEdit = null,
}) => {
  const Loading = (text) => toast.loading(text)
  const Success = (text) => toast.success(text)
  const ErrorMessage = (text) => toast.error(text)

  const isEditing = !!instructorToEdit

  const handleSubmit = async (values, { resetForm }) => {
    const toastId = Loading(
      isEditing ? 'Actualizando instructor...' : 'Creando instructor...'
    )
    const dataToSend = {
      ...values,
      ...(isEditing && {
        instructorId: instructorToEdit.instructorId,
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
          titulo: instructorToEdit?.titulo || '',
          experiencia: instructorToEdit?.experiencia || '',
          nacionalidad: instructorToEdit?.nacionalidad || '',
          descripcion: instructorToEdit?.descripcion || '',
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

              {/* Título y Nacionalidad en una fila */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                {/* Título */}
                <div>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
                    Título
                  </label>
                  <Field
                    type='text'
                    name='titulo'
                    disabled={isSubmitting}
                    placeholder='Ej: Especialista en Estética'
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all disabled:opacity-60 disabled:bg-gray-50 ${
                      touched.titulo && errors.titulo
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
                    }`}
                  />
                  {touched.titulo && errors.titulo && (
                    <p className='text-red-500 text-xs mt-1'>* {errors.titulo}</p>
                  )}
                </div>

                {/* Nacionalidad */}
                <div>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
                    Nacionalidad
                  </label>
                  <Field
                    type='text'
                    name='nacionalidad'
                    disabled={isSubmitting}
                    placeholder='Ej: Salvadoreña'
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all disabled:opacity-60 disabled:bg-gray-50 ${
                      touched.nacionalidad && errors.nacionalidad
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
                    }`}
                  />
                  {touched.nacionalidad && errors.nacionalidad && (
                    <p className='text-red-500 text-xs mt-1'>* {errors.nacionalidad}</p>
                  )}
                </div>
              </div>

              {/* Experiencia */}
              <div>
                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
                  Años de Experiencia
                </label>
                <Field
                  type='number'
                  name='experiencia'
                  disabled={isSubmitting}
                  min={0}
                  placeholder='Ej: 8'
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all disabled:opacity-60 disabled:bg-gray-50 ${
                    touched.experiencia && errors.experiencia
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
                  }`}
                />
                {touched.experiencia && errors.experiencia && (
                  <p className='text-red-500 text-xs mt-1'>* {errors.experiencia}</p>
                )}
              </div>

              {/* Descripción */}
              <div>
                <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
                  Descripción
                </label>
                <Field
                  as='textarea'
                  name='descripcion'
                  disabled={isSubmitting}
                  rows={4}
                  placeholder='Ej: Breve reseña profesional del instructor...'
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all resize-none disabled:opacity-60 disabled:bg-gray-50 ${
                    touched.descripcion && errors.descripcion
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
                  }`}
                />
                {touched.descripcion && errors.descripcion && (
                  <p className='text-red-500 text-xs mt-1'>* {errors.descripcion}</p>
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
