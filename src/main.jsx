/**
 * @copyright 2025 Aniket Chakraborty
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

/**
 * Custom Modules
 */
import router from './routers/routes'

/**
 * Components
 */
import SnackbarProvider from './contexts/SnackbarContext'

/**
 * CSS Links
 */

import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </StrictMode>,
)
