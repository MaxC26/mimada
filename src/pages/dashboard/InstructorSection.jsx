import { useRef, useState } from 'react'
import CreateInstructor from '../../components/settings/CreateInstructor'
import InstructorTable from '../../components/settings/InstructorTable'

const InstructorSection = () => {
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
        <CreateInstructor
          instructorToEdit={usuarioToEdit}
          onCancelEdit={handleCancelEdit}
          onSuccess={handleUsuarioCreado}
        />
      </div>
      <InstructorTable
        reloadTrigger={reloadTrigger}
        onEditInstructor={handleEditUsuario}
      />
    </div>
  )
}

export default InstructorSection
