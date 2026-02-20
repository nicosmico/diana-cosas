import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QuestionPoolProvider } from './context/QuestionPoolContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuestionPoolProvider>
      <App />
    </QuestionPoolProvider>
  </StrictMode>,
)
