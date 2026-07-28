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
            value.type
          )
        }
      )
      .test('fileSize', 'La imagen no debe superar los 5 MB.', (value) => {
        if (typeof value === 'string') return true
        if (!(value instanceof File)) return false
        return value.size <= 5 * 1024 * 1024
      }),
    descuento: esEdicion
      ? Yup.number()
          .typeError('El descuento debe ser un número.')
          .min(0, 'El descuento no puede ser negativo.')
          .when('precio', ([precio], schema) =>
            schema.max(Number(precio) || 0, 'El descuento no puede ser mayor al precio.')
          )
      : Yup.number(),
    caracteristicas: esEdicion
      ? Yup.array().min(1, 'Selecciona al menos una característica del curso.')
      : Yup.array(),
  })

export const validarVideoCurso = Yup.object({
  titulo: Yup.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .required('El título es obligatorio'),
  descripcion: Yup.string()
    .min(5, 'La descripción debe tener al menos 5 caracteres')
    .required('La descripción es obligatoria'),
})

export const validarUsuario = (isEditing = false) =>
  Yup.object().shape({
    nombre: Yup.string().trim().required('El nombre es obligatorio'),
    apellido: Yup.string().trim().required('El apellido es obligatorio'),
    email: Yup.string()
      .email('Ingresa un correo electrónico válido')
      .required('El correo electrónico es obligatorio'),
    contrasena: isEditing
      ? Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
      : Yup.string()
          .min(6, 'La contraseña debe tener al menos 6 caracteres')
          .required('La contraseña es obligatoria'),
    telefono: Yup.string().trim().required('El teléfono es obligatorio'),
  })

export const validarInstructor = () =>
  Yup.object().shape({
    nombre: Yup.string().trim().required('El nombre es obligatorio'),
    apellido: Yup.string().trim().required('El apellido es obligatorio'),
    titulo: Yup.string().trim().required('El título es obligatorio'),
    experiencia: Yup.number()
      .typeError('La experiencia debe ser un número')
      .min(0, 'La experiencia no puede ser negativa')
      .required('Los años de experiencia son obligatorios'),
    nacionalidad: Yup.string().trim().required('La nacionalidad es obligatoria'),
    descripcion: Yup.string().trim().required('La descripción es obligatoria'),
  })
