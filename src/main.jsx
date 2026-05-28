// ========================================
// PONTO DE ENTRADA PRINCIPAL DO APLICATIVO
// ========================================
// Este arquivo configura o React Router e monta a aplicação na DOM

// Importa React e ReactDOM (necessário para renderizar componentes)
import React from 'react'
import ReactDOM from 'react-dom/client'

// Importa o sistema de roteamento (navegação entre páginas)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Importa as páginas/componentes da aplicação
import Login from './pages/Login.jsx' 
import App from './App.jsx' // Componente principal: vitrine de filmes

// ========== CONFIGURAÇÃO DE ROTAS ==========
// Define as rotas (caminhos) e qual componente será exibido em cada uma
const router = createBrowserRouter([
  {
    path: "/", // Rota inicial (http://localhost:5173/)
    element: <Login />, // Exibe a página de login quando usuário acessa a aplicação
  },
  {
    path: "/home", // Rota secundária (http://localhost:5173/home)
    element: <App />, // Exibe o catálogo de filmes após o login bem-sucedido
  },
  /* Rota para detalhes de filme (descomentada quando a página estiver pronta) 
  {
    path: "/movies/:id", // :id é um parâmetro dinâmico (ex: /movies/1, /movies/2)
    element: <MovieDetails />, 
  }
  */
])

// ========== RENDERIZAÇÃO NA DOM ==========
// Renderiza a aplicação React no elemento HTML com id='root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* RouterProvider ativa o sistema de rotas em toda a aplicação */}
    <RouterProvider router={router} />
  </React.StrictMode>
)