import { useEffect, useState } from 'react'
import { NavItem } from '../components/nabvar/NavItem'
import { IconClock2, IconMenu3, IconSmartHome, IconUsers } from '@tabler/icons-react'

const DashboardPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState('Inicio')

  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }, [activePage])

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar - versión escritorio siempre visible, versión móvil condicionalmente visible */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className='flex flex-col h-full justify-between p-4'>
          {/* Navegación principal */}
          <div className='space-y-2'>
            <NavItem
              icon={<IconSmartHome stroke={2} />}
              text='Inicio'
              url='Inicio'
              active={activePage === 'Inicio'}
              setActivePage={setActivePage}
            />
            <NavItem
              icon={<IconUsers stroke={2} />}
              text='Servicios'
              url='Servicios'
              active={activePage === 'Servicios'}
              setActivePage={setActivePage}
            />
            <NavItem
              icon={<IconClock2 stroke={2} />}
              text='Nuestra Historia'
              url='NuestraHistoria'
              active={activePage === 'Nuestra Historia'}
              setActivePage={setActivePage}
            />
          </div>
        </div>
      </div>

      {/* Botón de toggle para móvil */}
      <div className='fixed bottom-4 right-4 z-50 md:hidden'>
        <button
          className='btn btn-circle btn-primary shadow-lg'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <IconMenu3 stroke={2} />
        </button>
      </div>

      {/* Overlay para cerrar el sidebar en móvil cuando está abierto */}
      {mobileMenuOpen && (
        <div
          className='fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden'
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Contenido principal (placeholder) */}
      <div className='flex-1 p-8'>
        <h1 className='text-2xl font-bold mb-4'>{activePage}</h1>
        <p className='text-gray-600'>
          {activePage === 'Inicio' && 'Contenido de la página de inicio'}
          {activePage === 'Servicios' && 'Información sobre nuestros servicios'}
          {activePage === 'Nuestra Historia' && 'La historia de nuestra empresa'}
        </p>
      </div>
    </div>
  )
}

export default DashboardPage
