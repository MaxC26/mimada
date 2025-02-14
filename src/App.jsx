import { useEffect } from 'react'
import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'

function App() {
  useEffect(() => {
    AOS.init({
      once: true, // Ensures animations only happen once
    })
  }, [])

  return (
    <div className='w-full min-h-screen'>
      <Home />
    </div>
  )
}

export default App
