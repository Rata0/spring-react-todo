import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
// import App from './App.tsx'
import RegisterForm from './components/RegisterForm.tsx'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<RegisterForm />}/>
      </Routes>
    </StrictMode>
  </HashRouter>
)
