import { Field, Form, Formik } from 'formik'
import ImageUploader from './ImageUploader'
import { useState } from 'react'
import { routes } from '../../utils/rutas'
import { updateSectionMultiFile } from '../../services/contenido'

const Servicios = ({ contenido, setIsLoading }) => {
  const texto01 = contenido.filter((item) => item.llave === 'textServicio01')[0]
  const texto02 = contenido.filter((item) => item.llave === 'textServicio02')[0]
  const texto03 = contenido.filter((item) => item.llave === 'textServicio03')[0]
  const texto04 = contenido.filter((item) => item.llave === 'textServicio04')[0]

  const imagen01 = contenido.filter((item) => item.llave === 'imgServicio01')[0]
  const imagen02 = contenido.filter((item) => item.llave === 'imgServicio02')[0]
  const imagen03 = contenido.filter((item) => item.llave === 'imgServicio03')[0]
  const imagen04 = contenido.filter((item) => item.llave === 'imgServicio04')[0]

  let ruta01 = ''
  let ruta02 = ''
  let ruta03 = ''
  let ruta04 = ''

  let imagenPublica01 = ''
  let imagenPublica02 = ''
  let imagenPublica03 = ''
  let imagenPublica04 = ''

  if (imagen01) {
    ruta01 = imagen01.ruta
    imagenPublica01 = imagen01.valor
  }
  if (imagen02) {
    ruta02 = imagen02.ruta
    imagenPublica02 = imagen02.valor
  }
  if (imagen03) {
    ruta03 = imagen03.ruta
    imagenPublica03 = imagen03.valor
  }
  if (imagen04) {
    ruta04 = imagen04.ruta
    imagenPublica04 = imagen04.valor
  }

  const [nameFile01, setNameFile01] = useState('')
  const [nameFile02, setNameFile02] = useState('')
  const [nameFile03, setNameFile03] = useState('')
  const [nameFile04, setNameFile04] = useState('')

  const [file01, setFile01] = useState(null)
  const [file02, setFile02] = useState(null)
  const [file03, setFile03] = useState(null)
  const [file04, setFile04] = useState(null)

  const [text01, setText01] = useState(texto01 ? texto01.valor : '')
  const [text02, setText02] = useState(texto02 ? texto02.valor : '')
  const [text03, setText03] = useState(texto03 ? texto03.valor : '')
  const [text04, setText04] = useState(texto04 ? texto04.valor : '')

  // Contadores de caracteres
  const [charCountTexto01, setCharCountTexto01] = useState(text01.length)
  const [charCountTexto02, setCharCountTexto02] = useState(text02.length)
  const [charCountTexto03, setCharCountTexto03] = useState(text03.length)
  const [charCountTexto04, setCharCountTexto04] = useState(text04.length)

  const handlePreview = () => {
    const content = {
      textServicio01: text01,
      textServicio02: text02,
      textServicio03: text03,
      textServicio04: text04,
      imgServicio01: file01 ? file01 : imagenPublica01,
      imgServicio02: file02 ? file02 : imagenPublica02,
      imgServicio03: file03 ? file03 : imagenPublica03,
      imgServicio04: file04 ? file04 : imagenPublica04,
    }
    localStorage.setItem('previewData', JSON.stringify(content))
    window.open(routes.previsualizarServicio, '_blank')
  }

  const onSubmitSection = async (values) => {
    try {
      const response = await updateSectionMultiFile(values)
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
          file01: null,
          file02: null,
          file03: null,
          file04: null,
          ruta01: ruta01,
          ruta02: ruta02,
          ruta03: ruta03,
          ruta04: ruta04,
          textServicio01: text01,
          textServicio02: text02,
          textServicio03: text03,
          textServicio04: text04,
        }}
        onSubmit={onSubmitSection}
      >
        {({ setFieldValue }) => (
          <Form className='space-y-6'>
            {/* Campo para el título servicio 1 - limitado a 45 caracteres */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Título servicio 1</span>
                <span
                  className={`label-text-alt ${
                    charCountTexto01 > 46 ? 'text-error' : 'text-success'
                  }`}
                >
                  {charCountTexto01}/45 caracteres
                </span>
              </label>
              <Field
                type='text'
                name='textServicio01'
                className={`input input-bordered w-full ${
                  charCountTexto01 > 46 ? 'input-error' : ''
                }`}
                placeholder='Ingresa nombre del servicio'
                maxLength={45}
                onChange={(e) => {
                  const value = e.target.value
                  setFieldValue('textServicio01', value)
                  setText01(value)
                  setCharCountTexto01(value.length)
                }}
              />
            </div>

            {/* Subida de imagen 01 */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Imagen de servicio 1</span>
              </label>
              <ImageUploader
                setFieldValue={setFieldValue}
                nameFile={nameFile01}
                setNameFile={setNameFile01}
                setFile={setFile01}
                valueName={'file01'}
              />
            </div>

            {/* Campo para el título servicio 2 - limitado a 45 caracteres */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Título servicio 2</span>
                <span
                  className={`label-text-alt ${
                    charCountTexto02 > 46 ? 'text-error' : 'text-success'
                  }`}
                >
                  {charCountTexto02}/45 caracteres
                </span>
              </label>
              <Field
                type='text'
                name='textServicio02'
                className={`input input-bordered w-full ${
                  charCountTexto02 > 46 ? 'input-error' : ''
                }`}
                placeholder='Ingresa nombre del servicio'
                maxLength={45}
                onChange={(e) => {
                  const value = e.target.value
                  setFieldValue('textServicio02', value)
                  setText02(value)
                  setCharCountTexto02(value.length)
                }}
              />
            </div>

            {/* Subida de imagen */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Imagen de servicio 2</span>
              </label>
              <ImageUploader
                setFieldValue={setFieldValue}
                nameFile={nameFile02}
                setNameFile={setNameFile02}
                setFile={setFile02}
                valueName={'file02'}
              />
            </div>

            {/* Campo para el título servicio 3 - limitado a 45 caracteres */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Título servicio 3</span>
                <span
                  className={`label-text-alt ${
                    charCountTexto03 > 46 ? 'text-error' : 'text-success'
                  }`}
                >
                  {charCountTexto03}/45 caracteres
                </span>
              </label>
              <Field
                type='text'
                name='textServicio03'
                className={`input input-bordered w-full ${
                  charCountTexto03 > 46 ? 'input-error' : ''
                }`}
                placeholder='Ingresa nombre del servicio'
                maxLength={45}
                onChange={(e) => {
                  const value = e.target.value
                  setFieldValue('textServicio03', value)
                  setText03(value)
                  setCharCountTexto03(value.length)
                }}
              />
            </div>

            {/* Subida de imagen */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Imagen de servicio 3</span>
              </label>
              <ImageUploader
                setFieldValue={setFieldValue}
                nameFile={nameFile03}
                setNameFile={setNameFile03}
                setFile={setFile03}
                valueName={'file03'}
              />
            </div>

            {/* Campo para el título servicio 4 - limitado a 45 caracteres */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Título servicio 4</span>
                <span
                  className={`label-text-alt ${
                    charCountTexto04 > 46 ? 'text-error' : 'text-success'
                  }`}
                >
                  {charCountTexto04}/45 caracteres
                </span>
              </label>
              <Field
                type='text'
                name='textServicio04'
                className={`input input-bordered w-full ${
                  charCountTexto04 > 46 ? 'input-error' : ''
                }`}
                placeholder='Ingresa nombre del servicio'
                maxLength={45}
                onChange={(e) => {
                  const value = e.target.value
                  setFieldValue('textServicio04', value)
                  setText04(value)
                  setCharCountTexto04(value.length)
                }}
              />
            </div>
            {/* Subida de imagen */}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-medium'>Imagen de servicio 4</span>
              </label>
              <ImageUploader
                setFieldValue={setFieldValue}
                nameFile={nameFile04}
                setNameFile={setNameFile04}
                setFile={setFile04}
                valueName={'file04'}
              />
            </div>

            {/* Botones de acción */}
            <div className='flex flex-wrap gap-4 mt-6'>
              {/* Botón para enviar informacion al backend */}
              <button
                type='submit'
                className='btn btn-neutral'
                disabled={
                  charCountTexto01 > 46 ||
                  charCountTexto02 > 46 ||
                  charCountTexto03 > 46 ||
                  charCountTexto04 > 46
                }
              >
                Enviar
              </button>

              {/* Botón para previsualizar el contenido cargado */}
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => handlePreview()}
                disabled={
                  charCountTexto01 > 46 ||
                  charCountTexto02 > 46 ||
                  charCountTexto03 > 46 ||
                  charCountTexto04 > 46
                }
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

export default Servicios

