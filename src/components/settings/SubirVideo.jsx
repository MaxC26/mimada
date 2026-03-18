import { useState, useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  IconPhoto,
  IconPlus,
  IconGripVertical,
  IconX,
  IconVideo,
} from '@tabler/icons-react'
import {
  createCurso,
  updateCurso,
  getCategoriasCurso,
  getEstadosCurso,
} from '../../services/cursos'
import UploadVideoModal from './UploadVideoModal'
import LoadingSpinner from '../utils/LoadingSpinner'

/* ── Esquema de validación ── */
const cursoSchema = Yup.object({
  titulo: Yup.string().trim().required('El título es obligatorio.'),
  descripcion: Yup.string().trim().required('La descripción es obligatoria.'),
  categoria: Yup.string().required('Selecciona una categoría.'),
  precio: Yup.number()
    .typeError('El precio debe ser un número.')
    .min(0, 'El precio no puede ser negativo.')
    .required('El precio es obligatorio.'),
  dificultad: Yup.string().required('Selecciona un nivel de dificultad.'),
  estado: Yup.string().required('Selecciona el estado del curso.'),
  thumbnail: Yup.mixed()
    .required('La miniatura es obligatoria.')
    .test('fileType', 'Solo se aceptan imágenes en formato JPG, PNG o WEBP.', (value) => {
      // URL string from the backend → always valid
      if (typeof value === 'string') return true
      if (!(value instanceof File)) return false
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type)
    })
    .test('fileSize', 'La imagen no debe superar los 5 MB.', (value) => {
      if (typeof value === 'string') return true
      if (!(value instanceof File)) return false
      return value.size <= 5 * 1024 * 1024
    }),
})

/* ── Helpers ── */
const inputClass = (hasError) =>
  `w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all ${
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
  }`

const selectClass = (hasError) =>
  `w-full border rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition-all bg-white ${
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
  }`

const FieldError = ({ msg }) =>
  msg ? <p className='text-xs text-red-500 mt-1'>{msg}</p> : null

/* ─────────────────────────────────────── */

const SubirVideo = ({ curso = null, onBack }) => {
  const esEdicion = !!curso
  const thumbnailRef = useRef(null)

  const [autoSaved, setAutoSaved] = useState('14:24')
  const [categorias, setCategorias] = useState([])
  const [estados, setEstados] = useState([])
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [lecciones, setLecciones] = useState([
    { id: 1, titulo: 'Introducción y Materiales', duracion: '08:24', estado: 'listo' },
    { id: 2, titulo: 'Preparación de la cutícula', duracion: '15:40', estado: 'listo' },
  ])

  // Holds the current video file selected via the modal
  const [videoFile, setVideoFile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  /* ── Carga de datos ── */
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [categoriasResult, estadosResult] = await Promise.allSettled([
        getCategoriasCurso(),
        getEstadosCurso(),
      ])

      if (categoriasResult.status === 'fulfilled') {
        setCategorias(categoriasResult.value.data)
      } else {
        console.error('Error cargando categorías:', categoriasResult.reason)
      }

      if (estadosResult.status === 'fulfilled') {
        setEstados(estadosResult.value.data)
      } else {
        console.error('Error cargando estados:', estadosResult.reason)
      }
    } catch (err) {
      console.error('Error inesperado:', err)
    } finally {
      setIsLoading(false)
    }
  }

  /* ── Formik ── */
  const formik = useFormik({
    initialValues: {
      titulo: curso?.titulo || '',
      descripcion: curso?.descripcion || '',
      categoria: curso?.categoria || '',
      precio: curso?.precio?.toString() || '49.99',
      dificultad: curso?.dificultad || '',
      estado: curso?.estado || '',
      thumbnail: curso?.thumbnail || null, // File object or existing URL string
    },
    validationSchema: cursoSchema,
    onSubmit: async (values, { setStatus }) => {
      setStatus(null)
      try {
        const formData = new FormData()
        formData.append('titulo', values.titulo)
        formData.append('descripcion', values.descripcion)
        formData.append('categoria', values.categoria)
        formData.append('precio', values.precio)
        formData.append('dificultad', values.dificultad)
        formData.append('estado', values.estado)
        if (videoFile) formData.append('video', videoFile)
        // Append thumbnail: if it's a File object send it directly
        if (values.thumbnail instanceof File) {
          formData.append('thumbnail', values.thumbnail, 'thumbnail.jpg')
        } else if (
          typeof values.thumbnail === 'string' &&
          values.thumbnail.startsWith('data:')
        ) {
          // Legacy data URL fallback
          const res = await fetch(values.thumbnail)
          const blob = await res.blob()
          formData.append('thumbnail', blob, 'thumbnail.jpg')
        }

        if (esEdicion) {
          await updateCurso(curso.id, formData)
        } else {
          await createCurso(formData)
        }

        const now = new Date()
        setAutoSaved(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`)
        setStatus({ success: true })
      } catch (err) {
        console.error(err)
        setStatus({
          error:
            err?.response?.data?.message ||
            'Ocurrió un error al guardar. Intenta de nuevo.',
        })
      }
    },
  })

  // const ganancias = parseFloat(form.precio || 0)
  // const tuParte = (ganancias * 0.8).toFixed(2)
  // const plataforma = (ganancias * 0.2).toFixed(2)

  /* ── Handlers ── */
  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    if (!file) return
    formik.setFieldValue('thumbnail', file)
    formik.setFieldTouched('thumbnail', true, false)
  }

  const handleVideoUploaded = (file) => {
    setVideoFile(file)
    setLecciones((prev) => [
      ...prev,
      {
        id: Date.now(),
        titulo: file.name.replace(/\.[^/.]+$/, ''),
        duracion: '--:--',
        estado: 'procesando',
      },
    ])
  }

  const handleDeleteLeccion = (id) => {
    setLecciones((prev) => prev.filter((l) => l.id !== id))
  }

  const handleDescartar = () => {
    formik.resetForm()
    setVideoFile(null)
  }

  /* ── Alias cortos para Formik ── */
  const fErr = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null

  return (
    <>
      {/* ── Upload Video Modal ── */}
      <UploadVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onVideoUploaded={handleVideoUploaded}
      />

      <div className='w-full'>
        {/* ── Skeleton loader ── */}
        {isLoading ? (
          <div className='flex justify-center items-center min-h-[50vh]'>
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} noValidate>
            {/* ── Header de sección ── */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
              <div>
                {onBack && (
                  <button
                    type='button'
                    onClick={onBack}
                    className='flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#c2a381] transition-colors mb-2 group'
                  >
                    <span className='group-hover:-translate-x-0.5 transition-transform'>
                      ←
                    </span>
                    Volver a Mis Cursos
                  </button>
                )}
                <h2 className='text-2xl md:text-3xl font-black text-gray-900'>
                  {esEdicion ? `Editando: ${curso.titulo}` : 'Crear Nuevo Curso'}
                </h2>
                <p className='text-gray-500 mt-1'>
                  {esEdicion
                    ? 'Modifica el contenido y guarda los cambios.'
                    : 'Completa la información y sube las lecciones de tu curso.'}
                </p>
              </div>
              <div className='flex gap-3'>
                {onBack && (
                  <button
                    type='button'
                    onClick={onBack}
                    className='px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors text-sm'
                  >
                    Descartar
                  </button>
                )}
                <button
                  type='submit'
                  disabled={formik.isSubmitting}
                  className='px-5 py-2.5 rounded-full bg-[#c2a381] text-white font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed'
                >
                  {formik.isSubmitting
                    ? 'Guardando...'
                    : esEdicion
                      ? 'Guardar Cambios'
                      : 'Publicar Curso'}
                </button>
              </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-6'>
              {/* ── Columna principal ── */}
              <div className='flex-1 space-y-6'>
                {/* Información General */}
                <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm'>
                  <div className='flex items-center gap-2 mb-5'>
                    <div className='w-1 h-6 bg-[#c2a381] rounded-full' />
                    <h3 className='font-bold text-gray-900 text-lg'>
                      Información General
                    </h3>
                  </div>

                  <div className='space-y-4'>
                    {/* Título */}
                    <div>
                      <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                        Título del Curso
                      </label>
                      <input
                        type='text'
                        name='titulo'
                        value={formik.values.titulo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='Ej: Masterclass de Uñas Acrílicas'
                        className={inputClass(fErr('titulo'))}
                      />
                      <FieldError msg={fErr('titulo')} />
                    </div>

                    {/* Descripción */}
                    <div>
                      <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                        Descripción
                      </label>
                      <textarea
                        name='descripcion'
                        value={formik.values.descripcion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows={4}
                        placeholder='Describe lo que aprenderán tus alumnas...'
                        className={`${inputClass(fErr('descripcion'))} resize-none`}
                      />
                      <FieldError msg={fErr('descripcion')} />
                    </div>

                    {/* Categoría + Precio */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                          Categoría
                        </label>
                        <select
                          name='categoria'
                          value={formik.values.categoria}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={selectClass(fErr('categoria'))}
                        >
                          <option value=''>Selecciona una categoría</option>
                          {categorias?.map((cat) => (
                            <option
                              key={cat.mmdcategoriacursoid}
                              value={cat.mmdcategoriacursoid}
                            >
                              {cat.nombre}
                            </option>
                          ))}
                        </select>
                        <FieldError msg={fErr('categoria')} />
                      </div>
                      <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                          Precio (USD)
                        </label>
                        <div
                          className={`flex items-center border rounded-xl px-4 py-3 transition-all ${
                            fErr('precio')
                              ? 'border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100'
                              : 'border-gray-200 focus-within:border-[#c2a381] focus-within:ring-2 focus-within:ring-[#f3ece5]'
                          }`}
                        >
                          <span className='text-gray-400 text-sm mr-2'>$</span>
                          <input
                            type='number'
                            name='precio'
                            min={0}
                            value={formik.values.precio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='flex-1 text-sm text-gray-800 outline-none bg-transparent'
                          />
                        </div>
                        <FieldError msg={fErr('precio')} />
                      </div>
                    </div>

                    {/* Dificultad + Estado */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                          Dificultad
                        </label>
                        <select
                          name='dificultad'
                          value={formik.values.dificultad}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={selectClass(fErr('dificultad'))}
                        >
                          <option value=''>Selecciona un nivel</option>
                          <option value='basico'>Básico</option>
                          <option value='intermedio'>Intermedio</option>
                          <option value='avanzado'>Avanzado</option>
                        </select>
                        <FieldError msg={fErr('dificultad')} />
                      </div>
                      <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                          Estado
                        </label>
                        <select
                          name='estado'
                          value={formik.values.estado}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={selectClass(fErr('estado'))}
                        >
                          <option value=''>Selecciona un estado</option>
                          {estados?.map((est) => (
                            <option
                              key={est.mmdestadocursoid}
                              value={est.mmdestadocursoid}
                            >
                              {est.nombre}
                            </option>
                          ))}
                        </select>
                        <FieldError msg={fErr('estado')} />
                      </div>
                    </div>

                    {/* Status bar */}
                    <div className='flex items-center gap-1.5 mt-1'>
                      <span
                        className={`w-2 h-2 rounded-full ${formik.status?.error ? 'bg-red-400' : 'bg-green-400'}`}
                      />
                      {formik.status?.error ? (
                        <p className='text-xs text-red-500'>{formik.status.error}</p>
                      ) : formik.status?.success ? (
                        <p className='text-xs text-green-600 font-semibold'>
                          ¡Guardado correctamente!
                        </p>
                      ) : (
                        <p className='text-xs text-gray-400'>
                          Auto-guardado a las {autoSaved}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Lecciones */}
                <div className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm'>
                  <div className='flex items-center justify-between mb-5'>
                    <div className='flex items-center gap-2'>
                      <div className='w-1 h-6 bg-[#c2a381] rounded-full' />
                      <h3 className='font-bold text-gray-900 text-lg'>
                        Lecciones ({lecciones.length})
                      </h3>
                    </div>
                    <button
                      type='button'
                      onClick={() => setIsVideoModalOpen(true)}
                      className='flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#faf7f5] border border-[#e8d9cc] text-[#c2a381] font-bold text-sm hover:bg-[#f3ece5] transition-colors'
                    >
                      <IconPlus size={15} stroke={2.5} />
                      Subir Video
                    </button>
                  </div>

                  <div className='space-y-2'>
                    {lecciones.map((leccion) => (
                      <div
                        key={leccion.id}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${leccion.estado === 'procesando' ? 'border-[#f3ece5] bg-[#faf7f5]' : 'border-gray-100 bg-gray-50 hover:bg-white'}`}
                      >
                        <IconGripVertical
                          size={16}
                          className='text-gray-300 cursor-grab shrink-0'
                        />
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${leccion.estado === 'procesando' ? 'bg-[#c2a381] text-white' : 'bg-gray-200 text-gray-600'}`}
                        >
                          {leccion.estado === 'procesando' ? (
                            '⏳'
                          ) : (
                            <IconVideo size={14} />
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p
                            className={`font-semibold text-sm truncate ${leccion.estado === 'procesando' ? 'text-[#c2a381]' : 'text-gray-800'}`}
                          >
                            {leccion.titulo}
                          </p>
                          <p className='text-xs text-gray-400'>
                            {leccion.estado === 'procesando'
                              ? 'PROCESANDO...'
                              : `Video · ${leccion.duracion}`}
                          </p>
                        </div>
                        {leccion.estado !== 'procesando' && (
                          <button
                            type='button'
                            onClick={() => handleDeleteLeccion(leccion.id)}
                            className='text-gray-300 hover:text-red-400 transition-colors shrink-0'
                          >
                            <IconX size={16} />
                          </button>
                        )}
                      </div>
                    ))}

                    {lecciones.length === 0 && (
                      <div className='text-center py-8 text-gray-400'>
                        <IconVideo
                          size={32}
                          stroke={1}
                          className='mx-auto mb-2 opacity-50'
                        />
                        <p className='text-sm'>
                          Aún no hay lecciones. ¡Sube tu primer video!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Columna lateral ── */}
              <div className='w-full lg:w-72 space-y-5'>
                {/* Miniatura */}
                <div className='bg-white rounded-2xl p-5 border border-gray-100 shadow-sm'>
                  <h4 className='font-bold text-gray-900 mb-4'>Miniatura del Curso</h4>
                  <div
                    className={`w-full aspect-video rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center mb-3 cursor-pointer border-2 border-dashed transition-colors ${
                      fErr('thumbnail')
                        ? 'border-red-400 hover:border-red-400'
                        : 'border-gray-200 hover:border-[#c2a381]/50'
                    }`}
                    onClick={() => thumbnailRef.current?.click()}
                  >
                    {formik.values.thumbnail ? (
                      <img
                        src={
                          formik.values.thumbnail instanceof File
                            ? URL.createObjectURL(formik.values.thumbnail)
                            : formik.values.thumbnail
                        }
                        alt='Miniatura'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='flex flex-col items-center gap-1 text-gray-400'>
                        <IconPhoto size={28} stroke={1} />
                        <p className='text-xs font-medium'>
                          SUBE UNA IMAGEN
                          <br />
                          1280×720
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    type='button'
                    onClick={() => thumbnailRef.current?.click()}
                    className={`w-full text-sm font-bold py-2 rounded-xl transition-colors border ${
                      fErr('thumbnail')
                        ? 'text-red-500 border-red-400 hover:bg-red-50'
                        : 'text-[#c2a381] border-[#c2a381] hover:bg-[#faf7f5]'
                    }`}
                  >
                    {formik.values.thumbnail ? 'Cambiar imagen' : 'Seleccionar imagen'}
                  </button>
                  <FieldError msg={fErr('thumbnail')} />
                  <input
                    ref={thumbnailRef}
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleThumbnail}
                  />
                </div>

                {/* Botón guardar – desktop */}
                <div className='hidden lg:block'>
                  <button
                    type='submit'
                    disabled={formik.isSubmitting}
                    className='w-full py-3.5 rounded-full bg-[#c2a381] text-white font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                  >
                    {formik.isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                  <button
                    type='button'
                    onClick={handleDescartar}
                    disabled={formik.isSubmitting}
                    className='w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50'
                  >
                    Descartar borradores
                  </button>
                </div>

                {/* Botón guardar – mobile */}
                <div className='lg:hidden'>
                  <button
                    type='submit'
                    disabled={formik.isSubmitting}
                    className='w-full py-3.5 rounded-full bg-[#c2a381] text-white font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                  >
                    {formik.isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                  <button
                    type='button'
                    onClick={handleDescartar}
                    disabled={formik.isSubmitting}
                    className='w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50'
                  >
                    Descartar borradores
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

export default SubirVideo

