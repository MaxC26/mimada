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
import axios from 'axios'
import { AuthProvider } from './context/AuthContext.jsx'

// Permitir que Axios envíe y reciba cookies HttpOnly automáticamente
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
