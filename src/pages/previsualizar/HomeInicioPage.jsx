import { useEffect, useState } from 'react'
import { Navbar } from '../../components/nabvar/Navbar'
import Footer from '../../components/Footer'
import { Head } from '../../components/head/Head'
import LoadingSpinner from '../../components/utils/LoadingSpinner'

export const HomeInicioPage = () => {
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
      <Head content={content} />
      <Footer />
    </div>
  )
}
