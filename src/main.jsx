import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PayPalScriptProvider deferLoading={true}>
      <App />
    </PayPalScriptProvider>
  </StrictMode>,
)
