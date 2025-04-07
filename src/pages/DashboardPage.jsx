import { useEffect, useState } from 'react'
import { NavItem } from '../components/nabvar/NavItem'
import { IconClock2, IconMenu3, IconSmartHome, IconUsers } from '@tabler/icons-react'
import { getContenidoBySeccion } from '../services/contenido'
import { Inicio } from '../components/settings/Inicio'
import Historia from '../components/settings/Historia'
import Servicios from '../components/settings/Servicios'
import LoadingSpinner from '../components/utils/LoadingSpinner'

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState('Inicio')
  const [contenido, setContenido] = useState([])

  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
    if (activePage === 'Inicio') {
      getSectionContent('Head')
    }
    if (activePage === 'Servicios') getSectionContent('servicio')
    if (activePage === 'Nuestra Historia') getSectionContent('historia')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, isLoading])

  const getSectionContent = async (seccion) => {
    const contenido = await getContenidoBySeccion(seccion)

    setContenido(contenido.data)
    setIsLoading(false)
  }

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
              newActive={activePage === 'Inicio'}
              setActivePage={setActivePage}
              setIsLoading={setIsLoading}
              activePage={activePage}
              disabled={isLoading}
            />
            <NavItem
              icon={<IconUsers stroke={2} />}
              text='Servicios'
              url='Servicios'
              newActive={activePage === 'Servicios'}
              setActivePage={setActivePage}
              setIsLoading={setIsLoading}
              activePage={activePage}
              disabled={isLoading}
            />
            <NavItem
              icon={<IconClock2 stroke={2} />}
              text='Nuestra Historia'
              url='NuestraHistoria'
              newActive={activePage === 'Nuestra Historia'}
              setActivePage={setActivePage}
              setIsLoading={setIsLoading}
              activePage={activePage}
              disabled={isLoading}
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
      {isLoading ? (
        <div className='flex justify-center items-center w-full'>
          <LoadingSpinner />
        </div>
      ) : (
        <div className='flex-1 p-8'>
          <h1 className='text-2xl font-bold mb-4'>{activePage}</h1>
          {activePage === 'Inicio' && (
            <Inicio contenido={contenido} setIsLoading={setIsLoading} />
          )}
          {activePage === 'Servicios' && (
            <Servicios contenido={contenido} setIsLoading={setIsLoading} />
          )}
          {activePage === 'Nuestra Historia' && (
            <Historia contenido={contenido} setIsLoading={setIsLoading} />
          )}
        </div>
      )}
    </div>
  )
}

export default DashboardPage
