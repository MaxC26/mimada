import { useState } from 'react'
import { toast } from 'sonner'
import { Formik, Form, Field } from 'formik'
import ImageUploader from './ImageUploader'
import { routes } from '../../utils/rutas'
import { updateSection } from '../../services/contenido'

/* ── Componente de campo reutilizable ── */
const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  maxLength,
  charCount,
  maxChars,
  onChange,
  as,
}) => (
  <div>
    <div className='flex items-center justify-between mb-1.5'>
      <label className='text-xs font-bold text-gray-500 uppercase tracking-widest'>
        {label}
      </label>
      {maxChars && (
        <span
          className={`text-xs font-semibold ${charCount > maxChars ? 'text-red-500' : 'text-gray-400'}`}
        >
          {charCount}/{maxChars}
        </span>
      )}
    </div>
    <Field
      as={as}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete='off'
      maxLength={maxLength}
      onChange={onChange}
      className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all resize-none focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] ${charCount > maxChars ? 'border-red-400' : 'border-gray-200'} ${as === 'textarea' ? 'h-32' : ''}`}
    />
  </div>
)

export const Inicio = ({ contenido }) => {
  const title = contenido.find((item) => item.llave === 'textHead')
  const subTitle = contenido.find((item) => item.llave === 'textHead01')
  const imagen = contenido.find((item) => item.llave === 'imgHead')

  let ruta = ''
  let imagenPublica = ''
  if (imagen) {
    ruta = imagen.ruta
    imagenPublica = imagen.valor
  }

  const [nameFile, setNameFile] = useState('')
  const [file, setFile] = useState(null)
  const [textHead, setTextHead] = useState(title ? title.valor : '')
  const [textHead01, setTextHead01] = useState(subTitle ? subTitle.valor : '')

  const [charCountHead, setCharCountHead] = useState(textHead.length)
  const [charCountHead01, setCharCountHead01] = useState(textHead01.length)

  const handlePreview = () => {
    const content = { imgHead: file ?? imagenPublica, textHead, textHead01 }
    localStorage.setItem('previewData', JSON.stringify(content))
    window.open(routes.previsualizarInicio, '_blank')
  }

  const onSubmitSection = async (values) => {
    const toastId = toast.loading('Guardando cambios...')
    try {
      const response = await updateSection(values)
      toast.dismiss(toastId)
      if (response.status === 200) {
        toast.success('Sección actualizada correctamente')
      }
    } catch (error) {
      console.error(error)
      toast.dismiss(toastId)
      toast.error('Error al actualizar la sección')
    }
  }

  const hasError = charCountHead > 30 || charCountHead01 > 300

  return (
    <div className='w-full max-w-4xl mx-auto space-y-6'>
      {/* Aviso */}
      <div className='flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-sm text-amber-800'>
        <span className='text-xl leading-none'>⚠️</span>
        <p>
          Al guardar esta sección se reemplazará por completo el contenido actual que se
          muestra en la web.
        </p>
      </div>

      <Formik
        initialValues={{ file: null, ruta, textHead, textHead01 }}
        onSubmit={onSubmitSection}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className='space-y-5'>
            {/* Card principal */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm'>
              <div className='flex items-center gap-2 mb-5'>
                <div className='w-1 h-6 bg-[#c2a381] rounded-full' />
                <h3 className='font-bold text-gray-900 text-lg'>
                  Contenido de la Sección
                </h3>
              </div>
              <div className='space-y-5'>
                <FormField
                  label='Título Principal'
                  name='textHead'
                  placeholder='Ingresa el título principal'
                  maxLength={30}
                  charCount={charCountHead}
                  maxChars={30}
                  onChange={(e) => {
                    setFieldValue('textHead', e.target.value)
                    setTextHead(e.target.value)
                    setCharCountHead(e.target.value.length)
                  }}
                />
                <FormField
                  label='Texto Secundario'
                  name='textHead01'
                  as='textarea'
                  placeholder='Ingresa el texto secundario'
                  maxLength={300}
                  charCount={charCountHead01}
                  maxChars={300}
                  onChange={(e) => {
                    setFieldValue('textHead01', e.target.value)
                    setTextHead01(e.target.value)
                    setCharCountHead01(e.target.value.length)
                  }}
                />
              </div>
            </div>

            {/* Card imagen */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm'>
              <div className='flex items-center gap-2 mb-5'>
                <div className='w-1 h-6 bg-[#c2a381] rounded-full' />
                <h3 className='font-bold text-gray-900 text-lg'>Imagen de Cabecera</h3>
              </div>
              <ImageUploader
                setFieldValue={setFieldValue}
                nameFile={nameFile}
                setNameFile={setNameFile}
                setFile={setFile}
                valueName='file'
              />
            </div>

            {/* Botones */}
            <div className='flex flex-wrap gap-3'>
              <button
                type='submit'
                disabled={hasError || isSubmitting}
                className='px-8 py-2.5 rounded-full bg-[#c2a381] text-white font-bold text-sm shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2'
              >
                {isSubmitting && (
                  <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                )}
                Guardar Cambios
              </button>
              <button
                type='button'
                disabled={hasError || isSubmitting}
                onClick={handlePreview}
                className='px-8 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:pointer-events-none'
              >
                Previsualizar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
