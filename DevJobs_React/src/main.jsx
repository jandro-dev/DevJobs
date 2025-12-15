import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App /> {/* Cualquier componente dentro de app puede leer los valores del provider */}
    </AuthProvider>
  </BrowserRouter>,
)
