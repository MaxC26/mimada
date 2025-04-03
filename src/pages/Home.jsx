import { useState } from 'react'
import Footer from '../components/Footer'
import { Head } from '../components/head/Head'
import Body from '../components/home/Body'

import OurStory from '../components/home/OurStory'
import { Navbar } from '../components/nabvar/Navbar'
import { useEffect } from 'react'

const Home = ({ contenido }) => {
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
    getContent()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getContent = async () => {
    const updatedContent = { ...content } // Copia del estado actual

    contenido.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(updatedContent, item.llave)) {
        updatedContent[item.llave] = item.valor
      }
    })

    setContent(updatedContent)
  }

  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <Head content={content} />
      <Body content={content} />
      <OurStory content={content} />
      <Footer />
    </div>
  )
}

export default Home
