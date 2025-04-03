import React, { useState } from 'react'
import { NavItem } from '../components/nabvar/NavItem'

export const DashboardPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const SettingsIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-6 h-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  )

  const MenuIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4 6h16M4 12h16M4 18h7'
      />
    </svg>
  )

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
            <NavItem icon={<SettingsIcon />} text='Settings' active />
          </div>
        </div>
      </div>

      {/* Botón de toggle para móvil */}
      <div className='fixed bottom-4 right-4 z-50 md:hidden'>
        <button
          className='btn btn-circle btn-primary shadow-lg'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon />
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
        <h1 className='text-2xl font-bold mb-4'>Settings</h1>
        <p className='text-gray-600'>Aquí el contenido de Settings</p>
      </div>
    </div>
  )
}

