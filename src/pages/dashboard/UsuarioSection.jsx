import { useState, useRef } from 'react'
import CreateUser from '../../components/settings/CreateUser'
import UsuariosTable from '../../components/settings/UsuariosTable'

/**
 * Sección del dashboard para la gestión e inscripción de usuarios.
 * Renderiza el formulario CreateUser y la tabla de usuarios.
 */
const UsuarioSection = () => {
  const [reloadTrigger, setReloadTrigger] = useState(0)
  const [usuarioToEdit, setUsuarioToEdit] = useState(null)
  const formRef = useRef(null)

  const handleUsuarioCreado = () => {
    setReloadTrigger((prev) => prev + 1)
    setUsuarioToEdit(null)
  }

  const handleEditUsuario = (usuario) => {
    setUsuarioToEdit(usuario)
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleCancelEdit = () => {
    setUsuarioToEdit(null)
  }

  return (
    <div className='space-y-8'>
      <div ref={formRef}>
        <CreateUser
          usuarioToEdit={usuarioToEdit}
          onCancelEdit={handleCancelEdit}
          onSuccess={handleUsuarioCreado}
        />
      </div>
      <UsuariosTable reloadTrigger={reloadTrigger} onEditUsuarios={handleEditUsuario} />
    </div>
  )
}

export default UsuarioSection
