import { useState } from 'react'
import Footer from '../components/Footer'
import { Head } from '../components/head/Head'
import Body from '../components/home/Body'

import OurStory from '../components/home/OurStory'
import { Navbar } from '../components/nabvar/Navbar'
import { useEffect } from 'react'
import { getAllContenido } from '../services/contenido'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  const getAllContent = async () => {
    const updatedContent = { ...content } // Copia del estado actual
    const contenido = await getAllContenido()
    contenido.data.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(updatedContent, item.llave)) {
        updatedContent[item.llave] = item.valor
      }
    })
    setContent(updatedContent)
    setIsLoading(false)
  }

  const [content, setContent] = useState({
    imgHead: '',
    textHead: '',
    textHead01: '',
    imgServicio01: '',
    textServicio01: '',
    imgServicio02: '',
    textServicio02: '',
    imgServicio03: '',
    textServicio03: '',
    imgServicio04: '',
    textServicio04: '',
    imgHistoria: '',
    textHistoria: '',
  })

  useEffect(() => {
    getAllContent()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full min-h-screen'>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <Navbar />
          <Head content={content} />
          <Body content={content} />
          <OurStory content={content} />
          <Footer />
        </>
      )}
    </div>
  )
}

export default Home
