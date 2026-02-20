import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QuestionPoolProvider } from './context/QuestionPoolContext.jsx'
import { EquivalencePoolProvider } from './context/EquivalencePoolContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuestionPoolProvider>
      <EquivalencePoolProvider>
        <App />
      </EquivalencePoolProvider>
    </QuestionPoolProvider>
  </StrictMode>,
)
