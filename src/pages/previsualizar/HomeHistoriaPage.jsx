import { useEffect, useState } from 'react'
import { Navbar } from '../../components/nabvar/Navbar'
import Footer from '../../components/Footer'
import OurStory from '../../components/home/OurStory'
import LoadingSpinner from '../../components/utils/LoadingSpinner'

const HomeHistoriaPage = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('previewData')
    if (stored) setData(JSON.parse(stored))
  }, [])

  if (!data)
    return (
      <div className='flex min-h-screen'>
        <div className='flex justify-center items-center w-full'>
          <LoadingSpinner />
        </div>
      </div>
    )

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
