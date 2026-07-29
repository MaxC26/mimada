import { useState, useEffect } from 'react'
import {
  IconUsers,
  IconSearch,
  IconMail,
  IconPhone,
  IconPencil,
  IconTrash,
  IconCheck,
  IconX,
  IconLoader2,
} from '@tabler/icons-react'
import { toast } from 'sonner'
import LoadingSpinner from '../utils/LoadingSpinner'
import { apiEliminarUsuario, getUsuarios } from '../../services/usuarios'

const UsuariosTable = ({ reloadTrigger, onEditUsuarios }) => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [confirmEliminarId, setConfirmEliminarId] = useState(null)
  const [isDeletingId, setIsDeletingId] = useState(null)

  const cargarUsuarios = async () => {
    setLoading(true)
    try {
      const resp = await getUsuarios()
      // Soporta respuesta directa en array o envuelta en propiedad data/usuarios
      const lista = Array.isArray(resp) ? resp : resp?.usuarios || resp?.data || []
      setUsuarios(lista)
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
      toast.error(
        error?.response?.data?.message || 'Error al obtener la lista de usuarios'
      )
      setUsuarios([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [reloadTrigger])

  const eliminarUsuarios = async (id) => {
    setIsDeletingId(id)
    const toastId = toast.loading('Eliminando usuario...')
    try {
      const resp = await apiEliminarUsuario(id)

      // Validate the response — backend should return a truthy body;
      // some APIs also send { success: false } with a 200 status.
      if (!resp || resp?.success === false) {
        throw new Error(
          resp?.message || 'La eliminación no fue confirmada por el servidor'
        )
      }

      toast.dismiss(toastId)
      toast.success('Usuario eliminado exitosamente')
      setUsuarios((prev) => prev.filter((inst) => inst.mmdusuarioid !== id))
      setConfirmEliminarId(null)
    } catch (error) {
      toast.dismiss(toastId)
      const msg =
        error?.response?.data?.message || error?.message || 'Error al eliminar usuario'
      toast.error(msg)
    } finally {
      setIsDeletingId(null)
    }
  }

  const usuariosFiltrados = usuarios.filter((inst) => {
    const query = search.toLowerCase().trim()
    if (!query) return true

    const nombreCompleto =
      `${inst.nombre || inst.name || ''} ${inst.apellido || ''}`.toLowerCase()
    const email = (inst.email || '').toLowerCase()
    const telefono = (inst.telefono || inst.phone || '').toString().toLowerCase()

    return (
      nombreCompleto.includes(query) || email.includes(query) || telefono.includes(query)
    )
  })

  return (
    <div className='w-full max-w-4xl mx-auto space-y-4'>
      {/* Container principal */}
      <div>
        <h2 className='text-2xl font-black text-gray-900'>Usuarios</h2>
        <p className='text-gray-500 text-sm mt-0.5'>
          Listado general de usuarios en la plataforma
        </p>
      </div>
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        {/* Buscador */}
        <div className='p-4 border-b border-gray-100 bg-white'>
          <div className='relative'>
            <IconSearch
              size={16}
              className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Buscar por nombre, correo o teléfono...'
              className='w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#c2a381] focus:ring-2 focus:ring-[#f3ece5] transition-all placeholder-gray-400'
            />
          </div>
        </div>

        {/* Contenido / Tabla */}
        {loading ? (
          <div className='flex justify-center items-center py-12 text-[#c2a381]'>
            <LoadingSpinner />
          </div>
        ) : usuariosFiltrados.length === 0 ? (
          <div className='px-6 py-12 text-center space-y-2'>
            <div className='w-12 h-12 rounded-full bg-[#faf7f5] text-[#c2a381] flex items-center justify-center mx-auto mb-2'>
              <IconUsers size={22} stroke={1.5} />
            </div>
            <p className='text-gray-600 font-semibold text-sm'>
              {search ? 'No se encontraron resultados' : 'No hay usuarios registrados'}
            </p>
            <p className='text-xs text-gray-400'>
              {search
                ? 'Intenta con otro término de búsqueda.'
                : 'Usa el formulario superior para registrar el primer usuario.'}
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='border-b border-gray-100 bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-widest'>
                  <th className='px-6 py-3'>Usuario</th>
                  <th className='px-6 py-3'>Contacto</th>
                  <th className='px-6 py-3'>Rol</th>
                  <th className='px-6 py-3 text-right'>Acción</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50 text-sm'>
                {usuariosFiltrados.map((inst) => {
                  const instId = inst.mmdusuarioid
                  const nombre = inst.nombre || inst.name || 'Sin nombre'
                  const apellido = inst.apellido || ''
                  const nombreCompleto = `${nombre} ${apellido}`.trim()
                  const email = inst.email || 'Sin correo'
                  const telefono = inst.telefono || inst.phone || '-'
                  const rolLabel = inst.rol || 'Sin rol'
                  const isConfirming = confirmEliminarId === instId
                  const isDeleting = isDeletingId === instId

                  return (
                    <tr key={instId} className='hover:bg-[#faf7f5]/40 transition-colors'>
                      {/* Nombre con avatar iniciales */}
                      <td className='px-6 py-3.5'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full bg-[#c2a381]/20 text-[#a58b6c] font-bold text-xs flex items-center justify-center shrink-0 uppercase'>
                            {nombre.charAt(0)}
                            {apellido.charAt(0)}
                          </div>
                          <div>
                            <p className='font-bold text-gray-800 text-sm leading-tight'>
                              {nombreCompleto}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contacto */}
                      <td className='px-6 py-3.5 space-y-0.5'>
                        <div className='flex items-center gap-1.5 text-xs text-gray-600'>
                          <IconMail size={13} className='text-gray-400 shrink-0' />
                          <span>{email}</span>
                        </div>
                        {telefono !== '-' && (
                          <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                            <IconPhone size={13} className='text-gray-400 shrink-0' />
                            <span>{telefono}</span>
                          </div>
                        )}
                      </td>

                      {/* Rol */}
                      <td className='px-6 py-3.5'>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs`}
                        >
                          {rolLabel}
                        </span>
                      </td>

                      {/* Acciones: Editar / Eliminar */}
                      <td className='px-6 py-3.5 text-right'>
                        {isConfirming ? (
                          <div className='flex items-center justify-end gap-1.5'>
                            <span className='text-xs text-red-500 font-semibold mr-1'>
                              ¿Eliminar?
                            </span>
                            <button
                              onClick={() => eliminarUsuarios(instId)}
                              disabled={isDeleting}
                              title='Confirmar eliminación'
                              className='px-2.5 py-1 rounded-lg bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 flex items-center gap-1 transition-colors disabled:opacity-50'
                            >
                              {isDeleting ? (
                                <IconLoader2 size={13} className='animate-spin' />
                              ) : (
                                <IconCheck size={13} stroke={2.5} />
                              )}
                              <span>Sí</span>
                            </button>
                            <button
                              onClick={() => setConfirmEliminarId(null)}
                              disabled={isDeleting}
                              title='Cancelar'
                              className='w-7 h-7 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50'
                            >
                              <IconX size={14} stroke={2} />
                            </button>
                          </div>
                        ) : (
                          <div className='flex items-center justify-end gap-2'>
                            <button
                              onClick={() => onEditUsuarios && onEditUsuarios(inst)}
                              className='px-3 py-1.5 rounded-lg text-xs font-bold text-[#c2a381] bg-[#faf7f5] hover:bg-[#f3ece5] transition-all flex items-center gap-1.5'
                              title='Editar usuario'
                            >
                              <IconPencil size={14} />
                              Editar
                            </button>
                            <button
                              onClick={() => setConfirmEliminarId(instId)}
                              className='p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all'
                              title='Eliminar usuario'
                            >
                              <IconTrash size={15} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default UsuariosTable
