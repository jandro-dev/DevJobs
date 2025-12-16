import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App /> {/* Cualquier componente dentro de app puede leer los valores del provider */}
  </BrowserRouter>,
)
