import * as Yup from 'yup'

export const validarLogin = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
})
