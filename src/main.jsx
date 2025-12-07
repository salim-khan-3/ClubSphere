import { Toaster } from 'react-hot-toast'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/Router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <Toaster />
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>,
)
