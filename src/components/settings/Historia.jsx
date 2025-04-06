import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import ImageUploader from './ImageUploader'
import { routes } from '../../utils/rutas'
import { updateSection } from '../../services/contenido'

const Historia = ({ contenido, setIsLoading }) => {
  const title = contenido.filter((item) => item.llave === 'textHistoria')[0]
  const imagen = contenido.filter((item) => item.llave === 'imgHistoria')[0]

  let ruta = ''
  let imagenPublica = ''
  if (imagen) {
    ruta = imagen.ruta
    imagenPublica = imagen.valor
  }

  const [nameFile, setNameFile] = useState('')
  const [file, setFile] = useState(null)
  const [textHistoria, setTextHistoria] = useState(title ? title.valor : '')

  // Contadores de caracteres
  const [charCountHistori, setCharCountHistori] = useState(textHistoria.length)

  const handlePreview = () => {
    const content = {
      imgHistoria: file ? file : imagenPublica,
      textHistoria: textHistoria,
    }
    localStorage.setItem('previewData', JSON.stringify(content))
    window.open(routes.previsualizarHistoria, '_blank')
  }

  const onSubmitSection = async (values) => {
    try {
      const response = await updateSection(values)
      if (response.status === 200) {
        setIsLoading(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='w-full max-w-4xl mx-auto px-4'>
      <div role='alert' className='alert alert-warning alert-outline mb-6'>
        <span>
          Ten en cuenta que actualizar esta sección, se eliminará por completo el
          contenido que actualmente se muestra en la web.
        </span>
      </div>
      <Formik
        initialValues={{
          file: null,
          ruta: ruta,
          textHistoria: textHistoria,
        }}
        onSubmit={onSubmitSection}
      >
        {({ setFieldValue }) => (
          <Form className='space-y-6'>
            {/* Campo para el texto principal - limitado a 500 caracteres */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Texto Principal</span>
                <span
                  className={`label-text-alt ${
                    charCountHistori > 500 ? 'text-error' : 'text-success'
                  }`}
                >
                  {charCountHistori}/500 caracteres
                </span>
              </label>
              <Field
                as='textarea'
                name='textHistoria'
                className={`textarea textarea-bordered w-full h-32 ${
                  charCountHistori > 500 ? 'textarea-error' : ''
                }`}
                placeholder='Ingresa el texto secundario'
                maxLength={500}
                onChange={(e) => {
                  const value = e.target.value
                  setFieldValue('textHistoria', value)
                  setTextHistoria(value)
                  setCharCountHistori(value.length)
                }}
              />
            </div>

            {/* Subida de imagen */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Imagen de Cabecera</span>
              </label>
              <ImageUploader
                setFieldValue={setFieldValue}
                nameFile={nameFile}
                setNameFile={setNameFile}
                setFile={setFile}
                valueName={'file'}
              />
            </div>

            {/* Botones de acción */}
            <div className='flex flex-wrap gap-4 mt-6'>
              {/* Botón para enviar informacion al backend */}
              <button
                type='submit'
                className='btn btn-neutral'
                disabled={charCountHistori > 500}
              >
                Enviar
              </button>

              {/* Botón para previsualizar el contenido cargado */}
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => handlePreview()}
                disabled={charCountHistori > 500}
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

