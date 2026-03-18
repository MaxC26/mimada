import * as Yup from 'yup'

export const validarLogin = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
})

export const validarCurso = (esEdicion) =>
  Yup.object({
    titulo: Yup.string().trim().required('El título es obligatorio.'),
    descripcion: Yup.string().trim().required('La descripción es obligatoria.'),
    categoria: Yup.string().required('Selecciona una categoría.'),
    precio: Yup.number()
      .typeError('El precio debe ser un número.')
      .min(0, 'El precio no puede ser negativo.')
      .required('El precio es obligatorio.'),
    dificultad: Yup.string().required('Selecciona un nivel de dificultad.'),
    estado: esEdicion
      ? Yup.string().required('Selecciona el estado del curso.')
      : Yup.string(),
    thumbnail: Yup.mixed()
      .required('La miniatura es obligatoria.')
      .test(
        'fileType',
        'Solo se aceptan imágenes en formato JPG, PNG o WEBP.',
        (value) => {
          // URL string from the backend → always valid
          if (typeof value === 'string') return true
          if (!(value instanceof File)) return false
          return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
            value.type,
          )
        },
      )
      .test('fileSize', 'La imagen no debe superar los 5 MB.', (value) => {
        if (typeof value === 'string') return true
        if (!(value instanceof File)) return false
        return value.size <= 5 * 1024 * 1024
      }),
  })
