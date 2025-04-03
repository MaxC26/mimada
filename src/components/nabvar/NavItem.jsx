import React from 'react'

export const NavItem = ({ icon, text, active = false }) => {
  return (
    <a
      href='#'
      className={`flex items-center p-3 rounded-lg ${
        active
          ? 'text-gray-700 bg-gray-100 font-semibold'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className='ml-3'>{text}</span>
    </a>
  )
}

