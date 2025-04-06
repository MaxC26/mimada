import { useEffect, useState } from 'react'
import { Navbar } from '../../components/nabvar/Navbar'
import Footer from '../../components/Footer'
import Body from '../../components/home/Body'

const HomeServicioPage = () => {
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
      <Body content={content} />
      <Footer />
    </div>
  )
}

export default HomeServicioPage

