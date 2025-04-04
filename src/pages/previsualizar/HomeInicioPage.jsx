import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/nabvar/Navbar'
import Footer from '../../components/Footer'
import { Head } from '../../components/head/Head'

export const HomeInicioPage = () => {
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
      <Head content={content} />
      <Footer />
    </div>
  )
}

