// ========================================
// PÁGINA DE LOGIN - PLAYFAMILY (comentada em português)
// ========================================
// Este componente exibe um formulário de login e faz requisição ao backend
// Ao realizar login com sucesso armazena token e dados do usuário no localStorage

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Estados locais do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // URL base da API (definida via Vite env: VITE_API_URL)
  // Recomenda-se criar um arquivo .env.local com VITE_API_URL=http://localhost:4000/api
  const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  // Manipulador do envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validação básica no frontend
    if (!email.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    // AbortController para possibilitar cancelamento caso necessário
    const controller = new AbortController();
    const { signal } = controller;

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal,
      });

      // Tratamento de resposta robusto
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Mensagem vinda da API se existir, senão mensagem genérica
        throw new Error(data.message || `Erro ao efetuar login (status ${response.status}).`);
      }

      // Armazena o Token JWT e os dados do usuário no localStorage
      // Em produção, considerar cookie httpOnly e refresh tokens em vez de localStorage
      localStorage.setItem("@PlayFamily:token", data.token);
      localStorage.setItem("@PlayFamily:user", JSON.stringify(data.user));

      // Redireciona para a página principal (Home)
      navigate("/");
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Requisição cancelada.');
      } else {
        setError(err.message || "Não foi possível conectar ao servidor.");
      }
    } finally {
      setIsLoading(false);
    }

    // Nota: o controller.abort() pode ser chamado se desejar cancelar a requisição
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Entrar no PlayFamily</h2>

        {/* Exibição de mensagem de erro caso ocorra */}
        {error && (
          <div className="login-error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button" 
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
