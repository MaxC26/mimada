import Footer from '../components/Footer'
import { Navbar } from '../components/nabvar/Navbar'
import { Outlet } from 'react-router-dom'

const ExplorePage = () => {
  return (
    <div className='flex min-h-screen bg-gray-50 flex-col font-sans'>
      <Navbar isExplore={true} />

      <main className='flex-grow w-full pt-20 md:pt-28 pb-16'>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default ExplorePage
