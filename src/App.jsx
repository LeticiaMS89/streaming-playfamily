// ========================================
// ROTEAMENTO E NAVEGAÇÃO - PLAYFAMILY (comentado em português)
// ========================================
// Este arquivo define as rotas principais da aplicação React.
// Estrutura:
// - ProtectedRoute: wrapper que verifica se existe token no localStorage
// - MainLayout: cabeçalho (header) e área principal para renderizar páginas
// - App: declara as rotas públicas e protegidas

import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";

// =========================
// ProtectedRoute
// - Recebe children (componentes que serão renderizados se o usuário estiver autenticado)
// - Verifica se existe um token no localStorage (ex.: '@PlayFamily:token')
// - Se não houver token, redireciona para /login
// - Observação: em produção, validar também a expiração do token
// =========================
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("@PlayFamily:token");

  if (!token) {
    // Se não está autenticado, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se autenticado, renderiza os filhos (conteúdo protegido)
  return children;
}

// =========================
// MainLayout
// - Componente de layout que envolve páginas protegidas
// - Contém header com navegação e botão de logout
// - Recebe children que serão renderizados abaixo do header
// =========================
function MainLayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("@PlayFamily:user") || "{}");

  const handleLogout = () => {
    // Remove credenciais locais e redireciona para login
    localStorage.removeItem("@PlayFamily:token");
    localStorage.removeItem("@PlayFamily:user");
    navigate("/login");
  };

  return (
    <div className="app-layout">
      <header className="main-header">
        <div className="header-brand">
          {/* Logo que leva à página inicial do app (rota protegida)
              Se preferir que a home seja pública, ajuste a rota */}
          <Link to="/" className="logo">PlayFamily</Link>
        </div>

        <nav className="header-nav">
          <Link to="/">Início</Link>
          <Link to="/series">Séries</Link>
          <Link to="/filmes">Filmes</Link>
          <Link to="/doramas">Doramas</Link>
          <Link to="/realitys">Realitys</Link>
          <Link to="/animes">Animes</Link>
        </nav>

        <div className="header-user">
          {/* Exibe o nome do usuário salvo no localStorage, se houver */}
          {user.name && <span className="user-name">Olá, {user.name}</span>}
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </header>

      {/* Área principal onde as páginas serão renderizadas */}
      <main className="main-content">{children}</main>
    </div>
  );
}

// =========================
// App (declaração de rotas)
// - Rota /login: pública (Login)
// - Rota /: protegida (Home dentro do MainLayout)
// - Rota /movies/:id: protegida (detalhes do filme)
// - Fallback: redireciona para /
// =========================
function App() {
  return (
    <Routes>
      {/* Rota Pública */}
      <Route path="/login" element={<Login />} />

      {/* Rotas Protegidas com Layout Principal */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MovieDetails />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Rota de Fallback (404 / Página não encontrada) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
