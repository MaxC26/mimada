import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/nabvar/Navbar'
import Footer from '../../components/Footer'
import OurStory from '../../components/home/OurStory'

const HomeHistoriaPage = () => {
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
      <div className='w-full h-[75px]'></div>
      <OurStory content={content} />
      <Footer />
    </div>
  )
}

export default HomeHistoriaPage

