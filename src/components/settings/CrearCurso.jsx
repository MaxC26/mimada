import { useState, useRef, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import CustomModal from '../utils/CustomModal'
import { toast } from 'sonner'
import {
  IconPhoto,
  IconPlus,
  IconGripVertical,
  IconX,
  IconVideo,
  IconPencil,
  IconTrash,
  IconCheck,
  IconLoader2,
} from '@tabler/icons-react'
import {
  createCurso,
  updateCurso,
  deleteCurso,
  getCategoriasCurso,
  getEstadosCurso,
  getVideosCurso,
  deleteVideoCurso,
} from '../../services/cursos'
import UploadVideoModal from './UploadVideoModal'
import LoadingSpinner from '../utils/LoadingSpinner'
import { validarCurso } from '../../utils/formValidation'

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

/* ─────────────────────────────────────── */

const CrearCurso = ({ curso = null, onBack }) => {
  const Loading = (text) => toast.loading(text)
  const Success = (text) => toast.success(text)
  // const Warning = (text) => toast.warning(text)
  const ErrorMessage = (text) => toast.error(text)

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

  // Acciones de video
  const [videoToEdit, setVideoToEdit] = useState(null)
  const [confirmEliminarVideoId, setConfirmEliminarVideoId] = useState(null)
  const [isProcessingVideo, setIsProcessingVideo] = useState(false)

  // Acciones de estado
  const [isConfirmadorEliminadoOpen, setIsConfirmadorEliminadoOpen] = useState(false)

  /* ── Carga de datos ── */
  useEffect(() => {
    fetchData()

    // eslint-disable-next-line
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [categoriasResult, videosResult, estadosResult] = await Promise.allSettled([
        getCategoriasCurso(),
        esEdicion && getVideosCurso(curso.cursoId),
        esEdicion && getEstadosCurso(),
      ])

      if (categoriasResult.status === 'fulfilled') {
        setCategorias(categoriasResult.value.data)
      } else {
        console.error('Error al cargar las categorías:', categoriasResult.reason)
        ErrorMessage('Error al cargar las categorías')
      }

      if (estadosResult.status === 'fulfilled') {
        setEstados(estadosResult.value.data)
      } else {
        console.error('Error al cargar los estados:', estadosResult.reason)
        ErrorMessage('Error al cargar los estados')
      }

      if (videosResult.status === 'fulfilled') {
        setLecciones(videosResult.value.data)
      } else {
        if (videosResult.reason.response.status === 404) {
          setLecciones([])
        } else {
          console.error('Error al cargar los videos:', videosResult.reason)
          ErrorMessage('Error al cargar los videos')
        }
      }
    } catch (err) {
      console.error('Error inesperado:', err)
      ErrorMessage('Error inesperado al cargar los datos')
    } finally {
      setIsLoading(false)
    }
  }

  /* ── Handlers externos al form ── */
  const handleVideoUploaded = (videoData, isEdit) => {
    videoData = Object.fromEntries(videoData)
    if (isEdit) {
      setLecciones((prev) =>
        prev.map((leccion) =>
          leccion.videoId === Number(videoData.videoId)
            ? { ...leccion, ...videoData }
            : leccion,
        ),
      )
    } else {
      setLecciones((prev) => [
        ...prev,
        {
          id: videoData?.videoId || Date.now(),
          videoId: videoData?.videoId || Date.now(),
          titulo: videoData?.titulo || 'Nueva lección',
          descripcion: videoData?.descripcion || '',
          duracion: videoData?.duracion || '',
        },
      ])
    }
  }

  const iniciarEdicionVideo = (leccion) => {
    setVideoToEdit(leccion)
    setIsVideoModalOpen(true)
  }

  const handleDeleteVideoConfirm = async (leccion) => {
    setIsProcessingVideo(true)
    try {
      const res = await deleteVideoCurso(leccion.videoId)
      if (res) {
        setLecciones((prev) => prev.filter((l) => l.videoId !== leccion.videoId))
        Success('Lección eliminada exitosamente')
        setConfirmEliminarVideoId(null)
      }
    } catch (error) {
      console.error(error)
      ErrorMessage('Error al eliminar la lección')
    }
    setIsProcessingVideo(false)
  }

  const handleDeleteCursoConfirm = async (cursoId) => {
    setIsConfirmadorEliminadoOpen(false)
    const toastId = Loading('Eliminando curso...')
    try {
      await deleteCurso(cursoId)
      toast.dismiss(toastId)
      Success('Curso eliminado exitosamente')
      if (onBack) onBack()
    } catch (error) {
      toast.dismiss(toastId)
      console.error(error)
      ErrorMessage('Error al eliminar el curso')
    }
  }

  /* ── Submit ── */
  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null)
    const toastId = Loading('Guardando cambios...')
    try {
      const formData = new FormData()
      formData.append('categoriaid', values.categoria)
      formData.append('titulo', values.titulo)
      formData.append('descripcion', values.descripcion)
      formData.append('duracion_total', values.duracion || 25)
      formData.append('precio', values.precio)
      formData.append('nivel', values.dificultad)

      if (videoFile) formData.append('video', videoFile)

      if (values.thumbnail instanceof File) {
        formData.append('imagen_portada', values.thumbnail, 'thumbnail.jpg')
      } else if (
        typeof values.thumbnail === 'string' &&
        values.thumbnail.startsWith('data:')
      ) {
        // Legacy data URL fallback
        const res = await fetch(values.thumbnail)
        const blob = await res.blob()
        formData.append('imagen_portada', blob, 'thumbnail.jpg')
      }

      if (esEdicion) {
        formData.append('estado', values.estado)
        formData.append('cursoId', values.cursoid)
        await updateCurso(formData)
      } else {
        await createCurso(formData)
      }
      toast.dismiss(toastId)

      const now = new Date()
      setAutoSaved(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`)
      setStatus({ success: true })

      Success(esEdicion ? 'Curso actualizado exitosamente' : 'Curso creado exitosamente')
      onBack()
    } catch (err) {
      toast.dismiss(toastId)
      console.error(err)
      const errorMsg =
        err?.response?.data?.message || 'Ocurrió un error al guardar. Intenta de nuevo.'
      setStatus({ error: errorMsg })
      ErrorMessage(errorMsg)
    }
  }

  return (
    <>
      <UploadVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false)
          setVideoToEdit(null)
        }}
        onVideoUploaded={handleVideoUploaded}
        cursoId={curso?.cursoId}
        videoToEdit={videoToEdit}
      />

      <div className='w-full'>
        {isLoading ? (
          <div className='flex justify-center items-center min-h-[50vh]'>
            <LoadingSpinner />
          </div>
        ) : (
          <Formik
            initialValues={{
              cursoid: curso?.cursoId || '',
              titulo: curso?.titulo || '',
              descripcion: curso?.descripcion || '',
              categoria: curso?.categoriaId || '',
              precio: curso?.precio?.toString() || '',
              dificultad: curso?.nivel || '',
              estado: curso?.estadoId || '',
              duracion: curso?.duracion || '',
              thumbnail: curso?.imagenPortada || null,
            }}
            validationSchema={validarCurso(esEdicion)}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              resetForm,
              status,
            }) => {
              const onThumbnailChange = (e) => {
                const file = e.target.files[0]
                if (!file) return
                setFieldValue('thumbnail', file)
                setFieldTouched('thumbnail', true, false)
              }

              const onDescartar = () => {
                resetForm()
                setVideoFile(null)
              }

              const isEliminado = estados?.find(
                (est) => String(est.estadoCursoId) === String(values.estado)
              )?.estado.toLowerCase() === 'eliminado'

              return (
                <Form noValidate>
                  <CustomModal
                    isOpen={isConfirmadorEliminadoOpen}
                    onClose={() => setIsConfirmadorEliminadoOpen(false)}
                    contentLabel='Confirmar Eliminado'
                    maxWidth='400px'
                  >
                    <div className='p-6'>
                      <div className='flex items-center gap-3 mb-2'>
                        <div className='w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500'>
                          <IconTrash size={20} />
                        </div>
                        <h3 className='font-bold text-gray-900 text-lg'>
                          ¿Eliminar Curso?
                        </h3>
                      </div>
                      <p className='text-sm text-gray-500 mb-6 pl-13'>
                        Estás a punto de cambiar el estado de este curso a{' '}
                        <strong>Eliminado</strong>. Esta acción no se puede deshacer.
                      </p>
                      <div className='flex justify-end gap-3'>
                        <button
                          type='button'
                          onClick={() => setIsConfirmadorEliminadoOpen(false)}
                          className='px-5 py-2 rounded-full border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-100 transition-colors'
                        >
                          Cancelar
                        </button>
                        <button
                          type='button'
                          onClick={() => handleDeleteCursoConfirm(values.cursoid)}
                          className='px-5 py-2 rounded-full bg-red-500 text-white font-bold text-sm shadow-md shadow-red-500/30 hover:bg-red-600 transition-all'
                        >
                          Sí, eliminar
                        </button>
                      </div>
                    </div>
                  </CustomModal>

                  {/* ── Header ── */}
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
                      {/* <button
                        type='button'
                        onClick={() => {}}
                        disabled={isSubmitting || !esEdicion}
                        className='px-5 py-2.5 rounded-full bg-[#c2a381] text-white font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed'
                      >
                        {'Publicar Curso'}
                      </button> */}
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
                            <Field name='titulo'>
                              {({ field, meta }) => (
                                <>
                                  <input
                                    type='text'
                                    placeholder='Ej: Masterclass de Uñas Acrílicas'
                                    className={inputClass(meta.touched && meta.error)}
                                    autoComplete='off'
                                    {...field}
                                  />
                                  {meta.touched && meta.error && (
                                    <p className='text-xs text-red-500 mt-1'>
                                      {meta.error}
                                    </p>
                                  )}
                                </>
                              )}
                            </Field>
                          </div>

                          {/* Descripción */}
                          <div>
                            <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                              Descripción
                            </label>
                            <Field name='descripcion'>
                              {({ field, meta }) => (
                                <>
                                  <textarea
                                    rows={4}
                                    placeholder='Describe lo que aprenderán tus alumnas...'
                                    className={`${inputClass(meta.touched && meta.error)} resize-none`}
                                    {...field}
                                  />
                                  {meta.touched && meta.error && (
                                    <p className='text-xs text-red-500 mt-1'>
                                      {meta.error}
                                    </p>
                                  )}
                                </>
                              )}
                            </Field>
                          </div>

                          {/* Categoría + Precio */}
                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                              <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                                Categoría
                              </label>
                              <Field name='categoria'>
                                {({ field, meta }) => (
                                  <>
                                    <select
                                      className={selectClass(meta.touched && meta.error)}
                                      {...field}
                                    >
                                      <option value=''>Selecciona una categoría</option>
                                      {categorias?.map((cat) => (
                                        <option
                                          key={cat.categoriaId}
                                          value={cat.categoriaId}
                                        >
                                          {cat.nombre}
                                        </option>
                                      ))}
                                    </select>
                                    {meta.touched && meta.error && (
                                      <p className='text-xs text-red-500 mt-1'>
                                        {meta.error}
                                      </p>
                                    )}
                                  </>
                                )}
                              </Field>
                            </div>
                            <div>
                              <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                                Precio (USD)
                              </label>
                              <Field name='precio'>
                                {({ field, meta }) => (
                                  <>
                                    <div
                                      className={`flex items-center border rounded-xl px-4 py-3 transition-all ${
                                        meta.touched && meta.error
                                          ? 'border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100'
                                          : 'border-gray-200 focus-within:border-[#c2a381] focus-within:ring-2 focus-within:ring-[#f3ece5]'
                                      }`}
                                    >
                                      <span className='text-gray-400 text-sm mr-2'>
                                        $
                                      </span>
                                      <input
                                        type='number'
                                        min={0}
                                        className='flex-1 text-sm text-gray-800 outline-none bg-transparent'
                                        {...field}
                                      />
                                    </div>
                                    {meta.touched && meta.error && (
                                      <p className='text-xs text-red-500 mt-1'>
                                        {meta.error}
                                      </p>
                                    )}
                                  </>
                                )}
                              </Field>
                            </div>
                          </div>

                          {/* Dificultad + Estado */}
                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                              <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                                Dificultad
                              </label>
                              <Field name='dificultad'>
                                {({ field, meta }) => (
                                  <>
                                    <select
                                      className={selectClass(meta.touched && meta.error)}
                                      {...field}
                                    >
                                      <option value=''>Selecciona un nivel</option>
                                      <option value='basico'>Básico</option>
                                      <option value='intermedio'>Intermedio</option>
                                      <option value='avanzado'>Avanzado</option>
                                    </select>
                                    {meta.touched && meta.error && (
                                      <p className='text-xs text-red-500 mt-1'>
                                        {meta.error}
                                      </p>
                                    )}
                                  </>
                                )}
                              </Field>
                            </div>
                            {esEdicion && (
                              <div>
                                <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                                  Estado
                                </label>
                                <Field name='estado'>
                                  {({ field, meta }) => {
                                    return (
                                      <>
                                        <select
                                          className={selectClass(
                                            meta.touched && meta.error,
                                          )}
                                          name={field.name}
                                          value={field.value}
                                          onBlur={field.onBlur}
                                          onChange={field.onChange}
                                        >
                                          <option value=''>Selecciona un estado</option>
                                          {estados?.map((est) => (
                                            <option
                                              key={est.estadoCursoId}
                                              value={est.estadoCursoId}
                                            >
                                              {est.estado}
                                            </option>
                                          ))}
                                        </select>
                                        {meta.touched && meta.error && (
                                          <p className='text-xs text-red-500 mt-1'>
                                            {meta.error}
                                          </p>
                                        )}
                                      </>
                                    )
                                  }}
                                </Field>
                              </div>
                            )}
                          </div>

                          {/* Status bar */}
                          <div className='flex items-center gap-1.5 mt-1'>
                            <span
                              className={`w-2 h-2 rounded-full ${status?.error ? 'bg-red-400' : 'bg-green-400'}`}
                            />
                            {status?.error ? (
                              <p className='text-xs text-red-500'>{status.error}</p>
                            ) : status?.success ? (
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
                      {esEdicion && (
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
                                key={leccion.videoId}
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
                                  <div className='flex items-center justify-center gap-1 w-24 shrink-0'>
                                    {confirmEliminarVideoId === leccion.videoId ? (
                                      <>
                                        <button
                                          type='button'
                                          onClick={() =>
                                            handleDeleteVideoConfirm(leccion)
                                          }
                                          disabled={isProcessingVideo}
                                          title='Confirmar eliminación'
                                          className='px-2 py-1 h-8 rounded-lg bg-red-50 text-red-500 font-bold text-xs hover:bg-red-100 flex items-center justify-center gap-1 transition-colors disabled:opacity-50'
                                        >
                                          {isProcessingVideo ? (
                                            <IconLoader2
                                              size={13}
                                              className='animate-spin'
                                            />
                                          ) : (
                                            <IconCheck size={13} stroke={2.5} />
                                          )}
                                          <span>Sí</span>
                                        </button>
                                        <button
                                          type='button'
                                          onClick={() => setConfirmEliminarVideoId(null)}
                                          disabled={isProcessingVideo}
                                          className='w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-50'
                                        >
                                          <IconX size={15} stroke={2} />
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type='button'
                                          onClick={() => iniciarEdicionVideo(leccion)}
                                          disabled={
                                            isProcessingVideo || confirmEliminarVideoId
                                          }
                                          className='w-8 h-8 rounded-lg text-gray-400 hover:bg-[#faf7f5] hover:text-[#c2a381] flex items-center justify-center transition-colors disabled:opacity-50'
                                          title='Editar lección'
                                        >
                                          <IconPencil size={15} />
                                        </button>
                                        <button
                                          type='button'
                                          onClick={() =>
                                            setConfirmEliminarVideoId(leccion.videoId)
                                          }
                                          disabled={
                                            isProcessingVideo || confirmEliminarVideoId
                                          }
                                          className='w-8 h-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors disabled:opacity-50'
                                          title='Eliminar lección'
                                        >
                                          <IconTrash size={15} />
                                        </button>
                                      </>
                                    )}
                                  </div>
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
                      )}
                    </div>

                    {/* ── Columna lateral ── */}
                    <div className='w-full lg:w-72 space-y-5'>
                      {/* Miniatura */}
                      <div className='bg-white rounded-2xl p-5 border border-gray-100 shadow-sm'>
                        <h4 className='font-bold text-gray-900 mb-4'>
                          Miniatura del Curso
                        </h4>
                        <div
                          className={`w-full aspect-video rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center mb-3 cursor-pointer border-2 border-dashed transition-colors ${
                            touched.thumbnail && errors.thumbnail
                              ? 'border-red-400 hover:border-red-400'
                              : 'border-gray-200 hover:border-[#c2a381]/50'
                          }`}
                          onClick={() => thumbnailRef.current?.click()}
                        >
                          {values.thumbnail ? (
                            <img
                              src={
                                values.thumbnail instanceof File
                                  ? URL.createObjectURL(values.thumbnail)
                                  : values.thumbnail
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
                            touched.thumbnail && errors.thumbnail
                              ? 'text-red-500 border-red-400 hover:bg-red-50'
                              : 'text-[#c2a381] border-[#c2a381] hover:bg-[#faf7f5]'
                          }`}
                        >
                          {values.thumbnail ? 'Cambiar imagen' : 'Seleccionar imagen'}
                        </button>
                        {touched.thumbnail && errors.thumbnail && (
                          <p className='text-xs text-red-500 mt-1'>{errors.thumbnail}</p>
                        )}
                        <input
                          ref={thumbnailRef}
                          type='file'
                          accept='image/*'
                          className='hidden'
                          onChange={onThumbnailChange}
                        />
                      </div>

                      {/* Botón guardar – desktop */}
                      <div className='hidden lg:block'>
                        {isEliminado ? (
                          <button
                            type='button'
                            onClick={() => setIsConfirmadorEliminadoOpen(true)}
                            disabled={isSubmitting}
                            className='w-full py-3.5 rounded-full bg-red-500 text-white font-bold shadow-md shadow-red-500/30 hover:bg-red-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                          >
                            Eliminar
                          </button>
                        ) : (
                          <button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full py-3.5 rounded-full bg-[#c2a381] text-white font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                          >
                            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                          </button>
                        )}
                        <button
                          type='button'
                          onClick={onDescartar}
                          disabled={isSubmitting}
                          className='w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50'
                        >
                          Descartar cambios
                        </button>
                      </div>

                      {/* Botón guardar – mobile */}
                      <div className='lg:hidden'>
                        {isEliminado ? (
                          <button
                            type='button'
                            onClick={() => setIsConfirmadorEliminadoOpen(true)}
                            disabled={isSubmitting}
                            className='w-full py-3.5 rounded-full bg-red-500 text-white font-bold shadow-md shadow-red-500/30 hover:bg-red-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                          >
                            Eliminar
                          </button>
                        ) : (
                          <button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full py-3.5 rounded-full bg-[#c2a381] text-white font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                          >
                            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                          </button>
                        )}
                        <button
                          type='button'
                          onClick={onDescartar}
                          disabled={isSubmitting}
                          className='w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50'
                        >
                          Descartar borradores
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )
            }}
          </Formik>
        )}
      </div>
    </>
  )
}

export default CrearCurso

