import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/caleder.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="573629402392-nt7g7lml87j7nnm6a2r46prrgjhk5lmj.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
