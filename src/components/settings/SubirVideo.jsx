import { useState, useRef, useEffect } from 'react'
import {
  IconPhoto,
  IconPlus,
  IconGripVertical,
  IconX,
  IconVideo,
} from '@tabler/icons-react'
import {
  getCategorias,
  getEstados,
  createCurso,
  updateCurso,
} from '../../services/cursos'
import UploadVideoModal from './UploadVideoModal'

const SubirVideo = ({ curso = null, onBack }) => {
  const esEdicion = !!curso
  const thumbnailRef = useRef(null)
  const [thumbnail, setThumbnail] = useState(curso?.thumbnail || null)
  const [autoSaved, setAutoSaved] = useState('14:24')
  const [categorias, setCategorias] = useState([])
  const [estados, setEstados] = useState([])
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [lecciones, setLecciones] = useState([
    { id: 1, titulo: 'Introducción y Materiales', duracion: '08:24', estado: 'listo' },
    { id: 2, titulo: 'Preparación de la cutícula', duracion: '15:40', estado: 'listo' },
  ])

  const [form, setForm] = useState({
    titulo: curso?.titulo || '',
    descripcion: '',
    categoria: curso?.categoria || '',
    precio: curso?.precio?.toString() || '49.99',
    dificultad: curso?.dificultad || '',
    estado: curso?.estado || '',
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Holds the actual video file selected via the modal
  const [videoFile, setVideoFile] = useState(null)

  useEffect(() => {
    getCategorias()
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error(err))
    getEstados()
      .then((res) => setEstados(res.data))
      .catch((err) => console.error(err))
  }, [])

  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setThumbnail(ev.target.result)
    reader.readAsDataURL(file)
  }

  /* ── Called when the modal confirms a video upload ── */
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

  const ganancias = parseFloat(form.precio || 0)
  const tuParte = (ganancias * 0.8).toFixed(2)
  const plataforma = (ganancias * 0.2).toFixed(2)

  /* ── Guardar / Publicar ── */
  const handleGuardar = async () => {
    setSaveError(null)
    setSaveSuccess(false)
    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append('titulo', form.titulo)
      formData.append('descripcion', form.descripcion)
      formData.append('categoria', form.categoria)
      formData.append('precio', form.precio)
      formData.append('dificultad', form.dificultad)
      formData.append('estado', form.estado)
      if (videoFile) formData.append('video', videoFile)
      if (thumbnail && thumbnail.startsWith('data:')) {
        const res = await fetch(thumbnail)
        const blob = await res.blob()
        formData.append('thumbnail', blob, 'thumbnail.jpg')
      }

      if (esEdicion) {
        await updateCurso(curso.id, formData)
      } else {
        await createCurso(formData)
      }

      setSaveSuccess(true)
      const now = new Date()
      setAutoSaved(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`)
    } catch (err) {
      console.error(err)
      setSaveError(
        err?.response?.data?.message || 'Ocurrió un error al guardar. Intenta de nuevo.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleDescartar = () => {
    setForm({
      titulo: curso?.titulo || '',
      descripcion: '',
      categoria: curso?.categoria || '',
      precio: curso?.precio?.toString() || '49.99',
      dificultad: curso?.dificultad || '',
      estado: curso?.estado || '',
    })
    setThumbnail(curso?.thumbnail || null)
    setVideoFile(null)
    setSaveError(null)
    setSaveSuccess(false)
  }

  return (
    <>
      {/* ── Upload Video Modal ── */}
      <UploadVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onVideoUploaded={handleVideoUploaded}
      />

      <div className='w-full'>
        {/* ── Header de sección ── */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
          <div>
            {onBack && (
              <button
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
                onClick={onBack}
                className='px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors text-sm'
              >
                Descartar
              </button>
            )}
            <button
              onClick={handleGuardar}
              disabled={isSaving}
              className='px-5 py-2.5 rounded-full bg-[#c2a381] text-white font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {isSaving
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
                <h3 className='font-bold text-gray-900 text-lg'>Información General</h3>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                    Título del Curso
                  </label>
                  <input
                    type='text'
                    value={form.titulo}
                    onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
                    placeholder='Ej: Masterclass de Uñas Acrílicas'
                    className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] transition-all'
                  />
                </div>

                <div>
                  <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                    Descripción
                  </label>
                  <textarea
                    value={form.descripcion}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, descripcion: e.target.value }))
                    }
                    rows={4}
                    placeholder='Describe lo que aprenderán tus alumnas...'
                    className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] transition-all resize-none'
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                      Categoría
                    </label>
                    <select
                      value={form.categoria}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, categoria: e.target.value }))
                      }
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] transition-all bg-white'
                    >
                      <option value=''>Selecciona una categoría</option>
                      {categorias.map((cat) => (
                        <option
                          key={cat.mmdcategoriacursoid}
                          value={cat.mmdcategoriacursoid}
                        >
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                      Precio (USD)
                    </label>
                    <div className='flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#c2a381] focus-within:ring-2 focus-within:ring-[#f3ece5] transition-all'>
                      <span className='text-gray-400 text-sm mr-2'>$</span>
                      <input
                        type='number'
                        min={0}
                        value={form.precio}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, precio: e.target.value }))
                        }
                        className='flex-1 text-sm text-gray-800 outline-none bg-transparent'
                      />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                      Dificultad
                    </label>
                    <select
                      value={form.dificultad}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, dificultad: e.target.value }))
                      }
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] transition-all bg-white'
                    >
                      <option value=''>Selecciona un nivel</option>
                      <option value='basico'>Básico</option>
                      <option value='intermedio'>Intermedio</option>
                      <option value='avanzado'>Avanzado</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5'>
                      Estado
                    </label>
                    <select
                      value={form.estado}
                      onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))}
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] transition-all bg-white'
                    >
                      <option value=''>Selecciona un estado</option>
                      {estados.map((est) => (
                        <option key={est.mmdestadocursoid} value={est.mmdestadocursoid}>
                          {est.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='flex items-center gap-1.5 mt-1'>
                  <span
                    className={`w-2 h-2 rounded-full ${saveError ? 'bg-red-400' : 'bg-green-400'}`}
                  />
                  {saveError ? (
                    <p className='text-xs text-red-500'>{saveError}</p>
                  ) : saveSuccess ? (
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
                      {leccion.estado === 'procesando' ? '⏳' : <IconVideo size={14} />}
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
                    <IconVideo size={32} stroke={1} className='mx-auto mb-2 opacity-50' />
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
                className='w-full aspect-video rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center mb-3 cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#c2a381]/50 transition-colors'
                onClick={() => thumbnailRef.current?.click()}
              >
                {thumbnail ? (
                  <img
                    src={thumbnail}
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
                onClick={() => thumbnailRef.current?.click()}
                className='w-full text-sm font-bold text-[#c2a381] border border-[#c2a381] py-2 rounded-xl hover:bg-[#faf7f5] transition-colors'
              >
                {thumbnail ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </button>
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
                onClick={handleGuardar}
                disabled={isSaving}
                className='w-full py-3.5 rounded-full bg-[#c2a381] text-white font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] transition-all disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button
                onClick={handleDescartar}
                disabled={isSaving}
                className='w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50'
              >
                Descartar borradores
              </button>
            </div>

            {/* Botón guardar – mobile */}
            <div className='lg:hidden'>
              <button
                onClick={handleGuardar}
                disabled={isSaving}
                className='w-full py-3.5 rounded-full bg-[#c2a381] text-white font-bold shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] transition-all disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button
                onClick={handleDescartar}
                disabled={isSaving}
                className='w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50'
              >
                Descartar borradores
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubirVideo

