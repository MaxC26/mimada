import { useState, useEffect } from 'react'
import {
  IconTag,
  IconPlus,
  IconPencil,
  IconTrash,
  IconCheck,
  IconX,
  IconLoader2,
} from '@tabler/icons-react'
import { toast } from 'sonner'
import LoadingSpinner from '../utils/LoadingSpinner'
import {
  apiGetCategorias,
  apiCrearCategoria,
  apiActualizarCategoria,
  apiEliminarCategoria
} from '../../services/categorias'

const Categorias = () => {
  const [categorias, setCategorias] = useState([])
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  const [editandoId, setEditandoId] = useState(null)
  const [editNombre, setEditNombre] = useState('')
  const [confirmEliminarId, setConfirmEliminarId] = useState(null)

  // Nueva categoría
  const [nueva, setNueva] = useState({ nombre: '' })
  const [mostarFormNueva, setMostrarFormNueva] = useState(false)

  useEffect(() => {
    cargarCategorias()
  }, [])

  const cargarCategorias = async () => {
    setLoadingInitial(true)
    try {
      const data = await apiGetCategorias()
      setCategorias(data)
    } catch (e) {
      toast.error('Error al cargar categorías')
    }
    setLoadingInitial(false)
  }

  /* ── Iniciar edición ── */
  const iniciarEdicion = (cat) => {
    setEditandoId(cat.mmdcategoriacursoid)
    setEditNombre(cat.nombre)
  }

  /* ── Guardar edición ── */
  const guardarEdicion = async (cat) => {
    if (!editNombre.trim()) {
      toast.error('El nombre no puede estar vacío')
      return
    }
    setIsProcessing(true)
    try {
      const payload = {
        codigo: cat.codigo,
        nombre: editNombre.trim()
      }
      const res = await apiActualizarCategoria(payload)
      if (res.value) {
        setCategorias(prev =>
          prev.map(c => c.mmdcategoriacursoid === cat.mmdcategoriacursoid ? { ...c, nombre: editNombre.trim() } : c)
        )
        setEditandoId(null)
        toast.success(res.message || 'Categoría actualizada')
      }
    } catch (e) {
      toast.error('Error al actualizar')
    }
    setIsProcessing(false)
  }

  /* ── Cancelar edición ── */
  const cancelarEdicion = () => setEditandoId(null)

  /* ── Eliminar ── */
  const eliminar = async (cat) => {
    setIsProcessing(true)
    try {
      const res = await apiEliminarCategoria(cat.codigo)
      if (res.value) {
        setCategorias(prev => prev.filter(c => c.mmdcategoriacursoid !== cat.mmdcategoriacursoid))
        setConfirmEliminarId(null)
        toast.success(res.message || 'Categoría eliminada')
      }
    } catch (e) {
      toast.error('Error al eliminar')
    }
    setIsProcessing(false)
  }

  /* ── Agregar nueva ── */
  const agregar = async () => {
    if (!nueva.nombre.trim()) {
      toast.error('Escribe un nombre para la categoría')
      return
    }
    setIsProcessing(true)
    try {
      const payloadNombre = nueva.nombre.trim()
      // Simulamos la respuesta JSON proporcionada por el backend al crear
      const res = await apiCrearCategoria(payloadNombre)
      setCategorias(prev => [...prev, res])
      setNueva({ nombre: '' })
      setMostrarFormNueva(false)
      toast.success('Categoría agregada exitosamente')
    } catch (e) {
      toast.error('Error al agregar categoría')
    }
    setIsProcessing(false)
  }

  return (
    <div className='w-full max-w-3xl mx-auto space-y-6'>

      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-black text-gray-900'>Categorías</h2>
          {loadingInitial ? (
            <p className='text-gray-500 text-sm mt-0.5'>Cargando categorías...</p>
          ) : (
             <p className='text-gray-500 text-sm mt-0.5'>{categorias.length} categorías registradas</p>
          )}
        </div>
        <button
          onClick={() => setMostrarFormNueva(v => !v)}
          disabled={loadingInitial || isProcessing}
          className='flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#c2a381] text-white font-bold text-sm shadow-md shadow-[#c2a381]/30 hover:bg-[#a58b6c] hover:-translate-y-0.5 transition-all duration-300 self-start sm:self-auto disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <IconPlus size={16} />
          Nueva Categoría
        </button>
      </div>

      {/* Formulario nueva categoría */}
      {mostarFormNueva && (
        <div className='bg-[#faf7f5] border border-[#f3ece5] rounded-2xl p-5 space-y-4'>
          <div className='flex items-center gap-2 mb-1'>
            <div className='w-1 h-5 bg-[#c2a381] rounded-full' />
            <h3 className='font-bold text-gray-900'>Nueva Categoría</h3>
          </div>

          <div>
            <label className='text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5'>
              Nombre de la categoría
            </label>
            <input
              type='text'
              value={nueva.nombre}
              onChange={e => setNueva({ nombre: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && agregar()}
              disabled={isProcessing}
              placeholder='Ej: Pestañas y Cejas'
              className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] transition-all disabled:opacity-60 disabled:bg-gray-50'
            />
          </div>

          <div className='flex gap-3 pt-1 border-t border-[#f3ece5] mt-2'>
            <button
              onClick={agregar}
              disabled={isProcessing}
              className='mt-2 px-6 py-2 rounded-full bg-[#c2a381] text-white font-bold text-sm hover:bg-[#a58b6c] transition-colors flex items-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm'
            >
              {isProcessing ? <IconLoader2 size={15} className='animate-spin' /> : <IconCheck size={15} stroke={2.5} />} 
              {isProcessing ? 'Guardando...' : 'Agregar'}
            </button>
            <button
              onClick={() => { setMostrarFormNueva(false); setNueva({ nombre: '' }) }}
              disabled={isProcessing}
              className='mt-2 px-6 py-2 rounded-full border border-gray-200 bg-white text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de categorías */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>

        {/* Cabecera tabla */}
        <div className='grid grid-cols-[1fr_auto_auto] px-6 py-3 border-b border-gray-100'>
          <span className='text-xs font-black text-gray-400 uppercase tracking-widest'>Categoría</span>
          <span className='text-xs font-black text-gray-400 uppercase tracking-widest hidden sm:block w-32'>Código</span>
          <span className='text-xs font-black text-gray-400 uppercase tracking-widest text-center w-24'>Acciones</span>
        </div>

        {/* Filas */}
        {loadingInitial ? (
          <div className='flex justify-center items-center py-16 text-[#c2a381]'>
            <LoadingSpinner />
          </div>
        ) : (
          <div className='divide-y divide-gray-50'>
            {categorias.map(cat => (
              <div
                key={cat.mmdcategoriacursoid}
                className='grid grid-cols-[1fr_auto_auto] items-center px-6 py-4 gap-4 hover:bg-gray-50/50 transition-colors'
              >
                {/* Nombre / edición inline */}
                {editandoId === cat.mmdcategoriacursoid ? (
                  <div className='flex items-center gap-2 min-w-0'>
                    <input
                      autoFocus
                      type='text'
                      value={editNombre}
                      onChange={e => setEditNombre(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') guardarEdicion(cat)
                        if (e.key === 'Escape') cancelarEdicion()
                      }}
                      disabled={isProcessing}
                      className='flex-1 min-w-0 border border-[#c2a381] rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[#f3ece5] transition-all disabled:opacity-50'
                    />
                  </div>
                ) : (
                  <div className='flex items-center gap-3 min-w-0'>
                    <IconTag size={18} className='text-[#c2a381] shrink-0' />
                    <span className='font-semibold text-gray-800 text-sm truncate'>{cat.nombre}</span>
                  </div>
                )}

                {/* Código */}
                <span className='text-[11px] text-gray-400 font-mono tracking-wider w-32 hidden sm:block truncate'>
                  {cat.codigo}
                </span>

                {/* Acciones */}
                <div className='flex items-center justify-center gap-1 w-24'>
                  {editandoId === cat.mmdcategoriacursoid ? (
                    <>
                      <button
                        onClick={() => guardarEdicion(cat)}
                        disabled={isProcessing}
                        className='w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors disabled:opacity-50'
                        title='Guardar'
                      >
                        {isProcessing ? <IconLoader2 size={15} className='animate-spin' /> : <IconCheck size={15} stroke={2.5} />}
                      </button>
                      <button
                        onClick={cancelarEdicion}
                        disabled={isProcessing}
                        className='w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-50'
                        title='Cancelar'
                      >
                        <IconX size={15} stroke={2} />
                      </button>
                    </>
                  ) : confirmEliminarId === cat.mmdcategoriacursoid ? (
                    <>
                      <button
                        onClick={() => eliminar(cat)}
                        disabled={isProcessing}
                        title='Confirmar eliminación'
                        className='w-full sm:w-auto px-2 py-1 h-8 rounded-lg bg-red-50 text-red-500 font-bold text-xs hover:bg-red-100 flex items-center justify-center gap-1 transition-colors disabled:opacity-50'
                      >
                        {isProcessing ? <IconLoader2 size={13} className='animate-spin' /> : <IconCheck size={13} stroke={2.5} />}
                        <span className='hidden sm:inline'>Sí</span>
                      </button>
                      <button
                        onClick={() => setConfirmEliminarId(null)}
                        disabled={isProcessing}
                        className='w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-50'
                      >
                        <IconX size={15} stroke={2} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => iniciarEdicion(cat)}
                        disabled={isProcessing || editandoId || confirmEliminarId}
                        className='w-8 h-8 rounded-lg text-gray-400 hover:bg-[#faf7f5] hover:text-[#c2a381] flex items-center justify-center transition-colors disabled:opacity-50'
                        title='Editar'
                      >
                        <IconPencil size={15} />
                      </button>
                      <button
                        onClick={() => setConfirmEliminarId(cat.mmdcategoriacursoid)}
                        disabled={isProcessing || editandoId || confirmEliminarId}
                        className='w-8 h-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors disabled:opacity-50'
                        title='Eliminar'
                      >
                        <IconTrash size={15} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {categorias.length === 0 && (
              <div className='px-6 py-12 text-center'>
                <div className='w-14 h-14 rounded-full bg-[#faf7f5] flex items-center justify-center mx-auto mb-3 text-[#c2a381]'>
                  <IconTag size={24} stroke={1.5} />
                </div>
                <p className='text-gray-500 font-semibold'>No hay categorías aún</p>
                <p className='text-gray-400 text-sm mt-1'>Crea tu primera categoría con el botón de arriba.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tip */}
      <p className='text-xs text-gray-400 text-center'>
        Haz clic en ✎ para editar el nombre · Pulsa Enter para confirmar · Esc para cancelar
      </p>

    </div>
  )
}

export default Categorias
