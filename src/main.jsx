import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/css/fonts.css'
import './assets/css/navbar.css'
import './assets/css/head.css'
import './assets/css/servicio.css'
import './assets/css/footer.css'
import './assets/css/ourstory.css'
import './assets/css/itemServicie.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
