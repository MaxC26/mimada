import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/css/fonts.css'
import './assets/css/navbar.css'
import './assets/css/servicio.css'
import './assets/css/footer.css'
import './assets/css/ourstory.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
