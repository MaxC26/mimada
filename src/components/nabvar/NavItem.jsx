import React from 'react'

export const NavItem = ({ icon, text, url, active = false, setActivePage }) => {
  return (
    <a
      href={`#${url.toLowerCase()}`}
      className={`flex items-center p-3 rounded-lg ${
        active
          ? 'text-gray-700 bg-gray-100 font-semibold'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={(e) => {
        e.preventDefault()
        setActivePage(text)
      }}
    >
      {icon}
      <span className='ml-3'>{text}</span>
    </a>
  )
}
