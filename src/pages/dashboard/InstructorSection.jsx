import { useState, useRef } from 'react'
import CreateInstructor from '../../components/settings/CreateInstructor'
import InstructoresTable from '../../components/settings/InstructoresTable'

/**
 * Sección del dashboard para la gestión e inscripción de instructores.
 * Renderiza el formulario CreateInstructor y la tabla de instructores.
 */
const InstructorSection = () => {
  const [reloadTrigger, setReloadTrigger] = useState(0)
  const [instructorToEdit, setInstructorToEdit] = useState(null)
  const formRef = useRef(null)

  const handleInstructorCreado = () => {
    setReloadTrigger((prev) => prev + 1)
    setInstructorToEdit(null)
  }

  const handleEditInstructor = (instructor) => {
    setInstructorToEdit(instructor)
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleCancelEdit = () => {
    setInstructorToEdit(null)
  }

  return (
    <div className='space-y-8'>
      <div ref={formRef}>
        <CreateInstructor
          instructorToEdit={instructorToEdit}
          onCancelEdit={handleCancelEdit}
          onSuccess={handleInstructorCreado}
        />
      </div>
      <InstructoresTable
        reloadTrigger={reloadTrigger}
        onEditInstructor={handleEditInstructor}
      />
    </div>
  )
}

export default InstructorSection
