// ========================================
// PONTO DE ENTRADA PRINCIPAL DO APLICATIVO (comentado em português)
// ========================================
// Este arquivo instancia o BrowserRouter e monta o componente <App />
// Mantemos a responsabilidade de roteamento dentro de src/App.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Estilos globais
import './styles.css'

// Renderiza a aplicação React dentro de um BrowserRouter para lidar com rotas
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
