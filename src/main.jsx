import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='urbanist'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  </StrictMode>,
)
