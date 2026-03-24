import { Field, Form, Formik } from 'formik'
import ImageUploader from './ImageUploader'
import { useState } from 'react'
import { routes } from '../../utils/rutas'
import { updateSectionMultiFile } from '../../services/contenido'
import { toast } from 'sonner'

/* ── Bloque de un servicio ── */
const ServicioBlock = ({
  index,
  name,
  imageName,
  charCount,
  maxChars,
  setFieldValue,
  nameFile,
  setNameFile,
  setFile,
  onChange,
}) => (
  <div className='bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4'>
    <p className='text-xs font-black text-gray-500 uppercase tracking-widest'>
      Servicio {index}
    </p>

    {/* Título */}
    <div>
      <div className='flex items-center justify-between mb-1.5'>
        <label className='text-xs font-bold text-gray-500 uppercase tracking-widest'>
          Nombre del Servicio
        </label>
        <span
          className={`text-xs font-semibold ${charCount > maxChars ? 'text-red-500' : 'text-gray-400'}`}
        >
          {charCount}/{maxChars}
        </span>
      </div>
      <Field
        type='text'
        name={name}
        placeholder={`Ej: Pestañas Volumen ${index}`}
        autoComplete='off'
        maxLength={maxChars}
        onChange={onChange}
        className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] ${charCount > maxChars ? 'border-red-400' : 'border-gray-200'}`}
      />
    </div>

    {/* Imagen */}
    <div>
      <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2'>
        Imagen
      </label>
      <ImageUploader
        setFieldValue={setFieldValue}
        nameFile={nameFile}
        setNameFile={setNameFile}
        setFile={setFile}
        valueName={imageName}
      />
    </div>
  </div>
)

const Servicios = ({ contenido }) => {
  const texto01 = contenido.find((i) => i.llave === 'textServicio01')
  const texto02 = contenido.find((i) => i.llave === 'textServicio02')
  const texto03 = contenido.find((i) => i.llave === 'textServicio03')
  const texto04 = contenido.find((i) => i.llave === 'textServicio04')

  const imagen01 = contenido.find((i) => i.llave === 'imgServicio01')
  const imagen02 = contenido.find((i) => i.llave === 'imgServicio02')
  const imagen03 = contenido.find((i) => i.llave === 'imgServicio03')
  const imagen04 = contenido.find((i) => i.llave === 'imgServicio04')

  const ruta01 = imagen01?.ruta ?? ''
  const ruta02 = imagen02?.ruta ?? ''
  const ruta03 = imagen03?.ruta ?? ''
  const ruta04 = imagen04?.ruta ?? ''
  const imgP01 = imagen01?.valor ?? ''
  const imgP02 = imagen02?.valor ?? ''
  const imgP03 = imagen03?.valor ?? ''
  const imgP04 = imagen04?.valor ?? ''

  const [nf01, setNf01] = useState('')
  const [nf02, setNf02] = useState('')
  const [nf03, setNf03] = useState('')
  const [nf04, setNf04] = useState('')
  const [f01, setF01] = useState(null)
  const [f02, setF02] = useState(null)
  const [f03, setF03] = useState(null)
  const [f04, setF04] = useState(null)

  const [t01, setT01] = useState(texto01?.valor ?? '')
  const [t02, setT02] = useState(texto02?.valor ?? '')
  const [t03, setT03] = useState(texto03?.valor ?? '')
  const [t04, setT04] = useState(texto04?.valor ?? '')

  const [c01, setC01] = useState(t01.length)
  const [c02, setC02] = useState(t02.length)
  const [c03, setC03] = useState(t03.length)
  const [c04, setC04] = useState(t04.length)

  const MAX = 45

  const handlePreview = () => {
    const content = {
      textServicio01: t01,
      textServicio02: t02,
      textServicio03: t03,
      textServicio04: t04,
      imgServicio01: f01 ?? imgP01,
      imgServicio02: f02 ?? imgP02,
      imgServicio03: f03 ?? imgP03,
      imgServicio04: f04 ?? imgP04,
    }
    localStorage.setItem('previewData', JSON.stringify(content))
    window.open(routes.previsualizarServicio, '_blank')
  }

  const onSubmitSection = async (values) => {
    const toastId = toast.loading('Guardando cambios...')
    try {
      const response = await updateSectionMultiFile(values)
      toast.dismiss(toastId)
      if (response.status === 200) {
        toast.success('Sección actualizada correctamente')
      }
    } catch {
      toast.dismiss(toastId)
      toast.error('Error al actualizar la sección. Intenta de nuevo.')
    }
  }

  const hasError = c01 > MAX || c02 > MAX || c03 > MAX || c04 > MAX

  const mkChange = (setter, countSetter, fieldSetter, fieldName) => (e) => {
    setter(e.target.value)
    countSetter(e.target.value.length)
    fieldSetter(fieldName, e.target.value)
  }

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
        initialValues={{
          file01: null,
          file02: null,
          file03: null,
          file04: null,
          ruta01,
          ruta02,
          ruta03,
          ruta04,
          textServicio01: t01,
          textServicio02: t02,
          textServicio03: t03,
          textServicio04: t04,
        }}
        onSubmit={onSubmitSection}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className='space-y-5'>
            {/* Card servicios */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm'>
              <div className='flex items-center gap-2 mb-6'>
                <div className='w-1 h-6 bg-[#c2a381] rounded-full' />
                <h3 className='font-bold text-gray-900 text-lg'>Servicios (4)</h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <ServicioBlock
                  index={1}
                  name='textServicio01'
                  imageName='file01'
                  charCount={c01}
                  maxChars={MAX}
                  setFieldValue={setFieldValue}
                  nameFile={nf01}
                  setNameFile={setNf01}
                  setFile={setF01}
                  onChange={mkChange(setT01, setC01, setFieldValue, 'textServicio01')}
                />
                <ServicioBlock
                  index={2}
                  name='textServicio02'
                  imageName='file02'
                  charCount={c02}
                  maxChars={MAX}
                  setFieldValue={setFieldValue}
                  nameFile={nf02}
                  setNameFile={setNf02}
                  setFile={setF02}
                  onChange={mkChange(setT02, setC02, setFieldValue, 'textServicio02')}
                />
                <ServicioBlock
                  index={3}
                  name='textServicio03'
                  imageName='file03'
                  charCount={c03}
                  maxChars={MAX}
                  setFieldValue={setFieldValue}
                  nameFile={nf03}
                  setNameFile={setNf03}
                  setFile={setF03}
                  onChange={mkChange(setT03, setC03, setFieldValue, 'textServicio03')}
                />
                <ServicioBlock
                  index={4}
                  name='textServicio04'
                  imageName='file04'
                  charCount={c04}
                  maxChars={MAX}
                  setFieldValue={setFieldValue}
                  nameFile={nf04}
                  setNameFile={setNf04}
                  setFile={setF04}
                  onChange={mkChange(setT04, setC04, setFieldValue, 'textServicio04')}
                />
              </div>
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

export default Servicios
