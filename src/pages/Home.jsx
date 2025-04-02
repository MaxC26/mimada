import Footer from '../components/Footer'
import { Head } from '../components/head/Head'
import Body from '../components/home/Body'

import OurStory from '../components/home/OurStory'
import { Navbar } from '../components/nabvar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Head />
      <Body />
      <OurStory />
      <Footer />
    </div>
  )
}

export default Home

