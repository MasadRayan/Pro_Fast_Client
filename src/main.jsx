import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/router.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './Context/AuthProvider.jsx'
import 'leaflet/dist/leaflet.css';
  import { ToastContainer } from 'react-toastify';


AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='urbanist'>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
      </AuthProvider>
    </div>
  </StrictMode>,
)
