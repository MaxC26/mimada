import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import ImageUploader from './ImageUploader'
import { routes } from '../../utils/rutas'

export const Inicio = () => {
  const [nameFile, setNameFile] = useState('')
  const [file, setFile] = useState(null)
  const [textHead, setTextHead] = useState('REVELA TU BELLEZA')
  const [textHead01, setTextHead01] = useState(
    'La belleza es autenticidad y confianza. Cuando te cuidas y te sientes bien, brillas con luz propia. Realza tu esencia, abraza tu belleza y refleja tu mejor versión.'
  )

  // Contadores de caracteres
  const [charCountHead, setCharCountHead] = useState(textHead.length)
  const [charCountHead01, setCharCountHead01] = useState(textHead01.length)

  const handlePreview = () => {
    const content = {
      imgHead: file,
      textHead: textHead,
      textHead01: textHead01,
    }
    console.log('Previewing content:', content)
    localStorage.setItem('previewData', JSON.stringify(content))
    window.open(routes.previsualizarInicio, '_blank')
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
          archivo: null,
          textHead: textHead,
          textHead01: textHead01,
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className='space-y-6'>
            {/* Campo para el título principal - limitado a 30 caracteres */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Título Principal</span>
                <span
                  className={`label-text-alt ${
                    charCountHead > 30 ? 'text-error' : 'text-success'
                  }`}
                >
                  {charCountHead}/30 caracteres
                </span>
              </label>
              <Field
                type='text'
                name='textHead'
                className={`input input-bordered w-full ${
                  charCountHead > 30 ? 'input-error' : ''
                }`}
                placeholder='Ingresa el título principal'
                maxLength={30}
                onChange={(e) => {
                  const value = e.target.value
                  setFieldValue('textHead', value)
                  setTextHead(value)
                  setCharCountHead(value.length)
                }}
              />
            </div>

            {/* Campo para el subtítulo o texto secundario - limitado a 300 caracteres */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Texto Secundario</span>
                <span
                  className={`label-text-alt ${
                    charCountHead01 > 300 ? 'text-error' : 'text-success'
                  }`}
                >
                  {charCountHead01}/300 caracteres
                </span>
              </label>
              <Field
                as='textarea'
                name='textHead01'
                className={`textarea textarea-bordered w-full h-32 ${
                  charCountHead01 > 300 ? 'textarea-error' : ''
                }`}
                placeholder='Ingresa el texto secundario'
                maxLength={300}
                onChange={(e) => {
                  const value = e.target.value
                  setFieldValue('textHead01', value)
                  setTextHead01(value)
                  setCharCountHead01(value.length)
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
              />
            </div>

            {/* Botones de acción */}
            <div className='flex flex-wrap gap-4 mt-6'>
              {/* Botón para enviar informacion al backend */}
              <button
                type='submit'
                className='btn btn-neutral'
                disabled={charCountHead > 30 || charCountHead01 > 300}
              >
                Enviar
              </button>

              {/* Botón para previsualizar el contenido cargado */}
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => handlePreview()}
                disabled={charCountHead > 30 || charCountHead01 > 300}
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

