import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Set the global default base URL for all Axios requests.
// It will use the environment variable if present, otherwise default to the Render backend URL.
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://h-backend-8tc0.onrender.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PayPalScriptProvider deferLoading={true}>
      <App />
    </PayPalScriptProvider>
  </StrictMode>,
)
