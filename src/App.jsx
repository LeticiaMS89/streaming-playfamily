// ========================================
// ROTEAMENTO E NAVEGAÇÃO - PLAYFAMILY (REFATORADA)
// ========================================

import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";

// Componente Wrapper de Rota Protegida
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("@PlayFamily:token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Layout Padrão com Header
function MainLayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("@PlayFamily:user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("@PlayFamily:token");
    localStorage.removeItem("@PlayFamily:user");
    navigate("/login");
  };

  return (
    <div className="app-layout">
      <header className="main-header">
        <div className="header-brand">
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
          {user.name && <span className="user-name">Olá, {user.name}</span>}
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
}

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
