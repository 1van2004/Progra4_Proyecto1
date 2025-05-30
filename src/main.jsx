import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { RouterProvider } from '@tanstack/react-router'
import router from './routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Crear la instancia de QueryClient
const queryClient = new QueryClient()

// Renderizar la aplicación
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
)
