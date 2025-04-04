import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/nabvar/Navbar'
import { HeadPrevisualizar } from './HeadPrevisualizar'

export const HomeInicio = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('previewData')
    if (stored) setData(JSON.parse(stored))
  }, [])

  if (!data) return <p>Cargando previsualización...</p>

  const content = { ...data }
  return (
    <div>
      <Navbar />
      <HeadPrevisualizar content={content} />
    </div>
  )
}

