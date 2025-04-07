import { useEffect, useState } from 'react'
import { Navbar } from '../../components/nabvar/Navbar'
import Footer from '../../components/Footer'
import Body from '../../components/home/Body'
import LoadingSpinner from '../../components/utils/LoadingSpinner'

const HomeServicioPage = () => {
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
      <Body content={content} />
      <Footer />
    </div>
  )
}

export default HomeServicioPage
