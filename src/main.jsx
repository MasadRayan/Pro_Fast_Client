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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


AOS.init();

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='urbanist'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
