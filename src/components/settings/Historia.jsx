import { Field, Form, Formik } from 'formik'
import ImageUploader from './ImageUploader'
import { useState } from 'react'
import { routes } from '../../utils/rutas'
import { updateSection } from '../../services/contenido'
import { toast } from 'sonner'

const Historia = ({ contenido }) => {
  const title = contenido.find((item) => item.llave === 'textHistoria')
  const imagen = contenido.find((item) => item.llave === 'imgHistoria')

  let ruta = ''
  let imagenPublica = ''
  if (imagen) {
    ruta = imagen.ruta
    imagenPublica = imagen.valor
  }

  const [nameFile, setNameFile] = useState('')
  const [file, setFile] = useState(null)
  const [textHistoria, setTextHistoria] = useState(title ? title.valor : '')
  const [charCount, setCharCount] = useState(textHistoria.length)

  const MAX = 500

  const handlePreview = () => {
    const content = { imgHistoria: file ?? imagenPublica, textHistoria }
    localStorage.setItem('previewData', JSON.stringify(content))
    window.open(routes.previsualizarHistoria, '_blank')
  }

  const onSubmitSection = async (values) => {
    const toastId = toast.loading('Guardando cambios...')
    try {
      const response = await updateSection(values)
      toast.dismiss(toastId)
      if (response.status === 200) {
        toast.success('Sección actualizada correctamente')
      }
    } catch {
      toast.dismiss(toastId)
      toast.error('Error al actualizar la sección')
    }
  }

  const hasError = charCount > MAX

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
        initialValues={{ file: null, ruta, textHistoria }}
        onSubmit={onSubmitSection}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className='space-y-5'>
            {/* Card contenido */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm'>
              <div className='flex items-center gap-2 mb-5'>
                <div className='w-1 h-6 bg-[#c2a381] rounded-full' />
                <h3 className='font-bold text-gray-900 text-lg'>Texto de la Historia</h3>
              </div>

              <div>
                <div className='flex items-center justify-between mb-1.5'>
                  <label className='text-xs font-bold text-gray-500 uppercase tracking-widest'>
                    Texto Principal
                  </label>
                  <span
                    className={`text-xs font-semibold ${hasError ? 'text-red-500' : 'text-gray-400'}`}
                  >
                    {charCount}/{MAX}
                  </span>
                </div>
                <Field
                  as='textarea'
                  name='textHistoria'
                  placeholder='Escribe la historia de Mimada...'
                  maxLength={MAX}
                  onChange={(e) => {
                    setFieldValue('textHistoria', e.target.value)
                    setTextHistoria(e.target.value)
                    setCharCount(e.target.value.length)
                  }}
                  className={`w-full h-48 border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all resize-none focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] ${hasError ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
            </div>

            {/* Card imagen */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm'>
              <div className='flex items-center gap-2 mb-5'>
                <div className='w-1 h-6 bg-[#c2a381] rounded-full' />
                <h3 className='font-bold text-gray-900 text-lg'>Imagen de la Sección</h3>
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

export default Historia
