import { useState, useRef, useEffect } from 'react'
import Modal from 'react-modal'
import { Formik, Field, Form } from 'formik'
import { toast } from 'sonner'
import { IconUpload, IconVideo, IconCheck, IconX } from '@tabler/icons-react'
import { validarVideoCurso } from '../../utils/formValidation'
import { createVideoCurso, updateVideoCurso } from '../../services/cursos'

// Bind modal to app element for accessibility
Modal.setAppElement('#root')

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    inset: 'auto',
    border: 'none',
    borderRadius: '1.25rem',
    padding: 0,
    width: '100%',
    maxWidth: '520px',
    background: 'transparent',
    overflow: 'visible',
  },
}

/* ── Helpers de estilo ── */
const inputClass = (hasError) =>
  `w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all ${
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'border-gray-200 focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5]'
  }`

/* ── Helper para obtener duración ── */
const getVideoDuration = (file) => {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src)
      const totalSeconds = Math.round(video.duration)
      resolve(totalSeconds)
    }
    video.src = URL.createObjectURL(file)
  })
}

const UploadVideoModal = ({ isOpen, onClose, onVideoUploaded, cursoId, videoToEdit }) => {
  const Loading = (text) => toast.loading(text)
  const Success = (text) => toast.success(text)
  // const Warning = (text) => toast.warning(text)
  const ErrorMessage = (text) => toast.error(text)

  const isEdit = !!videoToEdit
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setUploadedFile(null)
      setUploadProgress(0)
      setIsUploading(false)
      setIsDragging(false)
    }
  }, [isOpen])

  /* ── Drag & Drop handlers ── */
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('video/')) startFakeUpload(file)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) startFakeUpload(file)
  }

  /* ── Simula subida con progreso ── */
  const startFakeUpload = (file) => {
    setUploadedFile(file)
    setIsUploading(true)
    setUploadProgress(0)
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 3
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setIsUploading(false)
      }
      setUploadProgress(progress)
    }, 300)
  }

  const formatBytes = (bytes) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  /* ── Submit ── */
  const handleSubmit = async (values, { resetForm, setStatus }) => {
    setStatus(null)
    const toastId = Loading(isEdit ? 'Actualizando lección...' : 'Guardando lección...')
    try {
      const formData = new FormData()

      if (isEdit) formData.append('videoId', videoToEdit.videoId)
      formData.append('cursoid', cursoId)
      formData.append('titulo', values.titulo)
      formData.append('descripcion', values.descripcion)

      if (uploadedFile) {
        const duracion = await getVideoDuration(uploadedFile)
        formData.append('duracion', duracion)
        formData.append('video', uploadedFile)
      } else if (isEdit) {
        if (videoToEdit.duracion) formData.append('duracion', videoToEdit.duracion)
        if (videoToEdit.urlVideo) formData.append('video', videoToEdit.urlVideo)
      }

      isEdit ? await updateVideoCurso(formData) : await createVideoCurso(formData)

      toast.dismiss(toastId)
      Success(
        isEdit ? 'Lección actualizada correctamente' : 'Lección añadida exitosamente',
      )
      onVideoUploaded(formData, isEdit)
      resetForm()
      onClose()
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel='Subir Video'
    >
      <div className='bg-white rounded-2xl shadow-2xl w-full overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 bg-[#faf7f5] rounded-xl flex items-center justify-center text-[#c2a381]'>
              <IconVideo size={20} stroke={1.5} />
            </div>
            <div>
              <h3 className='font-bold text-gray-900 text-base'>
                {isEdit ? 'Editar Lección' : 'Subir Video'}
              </h3>
              <p className='text-xs text-gray-400'>MP4, MOV o AVI · Máx. 2 GB</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Formik Form */}
        <Formik
          enableReinitialize
          initialValues={{
            titulo: videoToEdit?.titulo || '',
            descripcion: videoToEdit?.descripcion || '',
          }}
          validationSchema={validarVideoCurso}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form noValidate>
              {/* Body */}
              <div className='p-6 space-y-4'>
                {/* Drop zone */}
                <div
                  className={`w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                    isDragging
                      ? 'border-[#c2a381] bg-[#faf7f5]'
                      : 'border-gray-200 bg-white hover:border-[#c2a381]/50 hover:bg-[#faf7f5]/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className='w-14 h-14 bg-[#faf7f5] rounded-full flex items-center justify-center text-[#c2a381]'>
                    <IconUpload size={26} stroke={1.5} />
                  </div>
                  <div className='text-center'>
                    <p className='font-bold text-gray-800'>
                      {isEdit
                        ? 'Arrastra y suelta para cambiar el video'
                        : 'Arrastra y suelta tu video aquí'}
                    </p>
                    <p className='text-gray-500 text-sm mt-1'>
                      {isEdit
                        ? 'o haz clic para seleccionar otro archivo (opcional)'
                        : 'o haz clic para seleccionar un archivo'}
                    </p>
                  </div>
                  <button
                    type='button'
                    className='mt-1 px-5 py-2 bg-[#c2a381] text-white font-bold rounded-full text-sm hover:bg-[#a58b6c] transition-colors shadow-md'
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                  >
                    Seleccionar Archivo
                  </button>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='video/*'
                    className='hidden'
                    onChange={handleFileSelect}
                  />
                </div>

                {/* Progress bar */}
                {uploadedFile && (
                  <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <IconVideo size={18} className='text-[#c2a381]' stroke={1.5} />
                        <p className='text-sm font-semibold text-gray-800 truncate max-w-[220px]'>
                          {uploadedFile.name}
                        </p>
                      </div>
                      {isUploading ? (
                        <span className='text-xs font-bold text-[#c2a381] bg-[#faf7f5] px-3 py-1 rounded-full'>
                          {uploadProgress}%
                        </span>
                      ) : (
                        <span className='text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1'>
                          <IconCheck size={13} /> Listo
                        </span>
                      )}
                    </div>
                    <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-gradient-to-r from-[#c2a381] to-[#e3d5c8] rounded-full transition-all duration-300'
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className='text-xs text-gray-400 mt-1.5'>
                      {formatBytes(uploadedFile.size)}
                    </p>
                  </div>
                )}
                {/* Mostrar video existente si no hay archivo nuevo */}
                {!uploadedFile && isEdit && videoToEdit?.urlVideo && (
                  <div className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <IconVideo size={18} className='text-[#c2a381]' stroke={1.5} />
                        <p
                          className='text-sm font-semibold text-gray-800 truncate max-w-[260px]'
                          title={videoToEdit.urlVideo}
                        >
                          Video guardado actualmente
                        </p>
                      </div>
                      <span className='text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1'>
                        <IconCheck size={13} /> Actual
                      </span>
                    </div>
                  </div>
                )}

                {/* Título */}
                <div>
                  <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                    Título de la Lección
                  </label>
                  <Field name='titulo'>
                    {({ field, meta }) => (
                      <>
                        <input
                          type='text'
                          placeholder='Ej: Introducción y Materiales'
                          className={inputClass(meta.touched && meta.error)}
                          autoComplete='off'
                          {...field}
                        />
                        {meta.touched && meta.error && (
                          <p className='text-xs text-red-500 mt-1'>{meta.error}</p>
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
                          rows={3}
                          placeholder='Describe brevemente el contenido de esta lección...'
                          className={`${inputClass(meta.touched && meta.error)} resize-none`}
                          {...field}
                        />
                        {meta.touched && meta.error && (
                          <p className='text-xs text-red-500 mt-1'>{meta.error}</p>
                        )}
                      </>
                    )}
                  </Field>
                </div>
              </div>

              {/* Footer */}
              <div className='flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl'>
                <button
                  type='button'
                  onClick={onClose}
                  className='px-5 py-2 rounded-full border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-100 transition-colors'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  disabled={
                    (isEdit ? false : !uploadedFile) || isUploading || isSubmitting
                  }
                  className='px-5 py-2 rounded-full bg-[#c2a381] text-white font-bold text-sm shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0'
                >
                  {isUploading
                    ? 'Procesando...'
                    : isEdit
                      ? 'Guardar Cambios'
                      : 'Agregar Lección'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

export default UploadVideoModal

