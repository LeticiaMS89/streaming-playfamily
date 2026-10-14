// ========================================
// DETALHES DO FILME - PLAYFAMILY (REFATORADA)
// ========================================

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:3000/movies/${id}`, { signal });

        if (response.status === 404) {
          throw new Error("O título solicitado não foi encontrado no catálogo.");
        }

        if (!response.ok) {
          throw new Error("Erro ao carregar os detalhes do título.");
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Erro de conexão com o servidor.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchMovieDetails();
    }

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <p>Carregando informações do título...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="details-error">
        <h2>Conteúdo Indisponível</h2>
        <p>{error || "Não foi possível carregar as informações."}</p>
        <button onClick={() => navigate("/")}>Voltar para o início</button>
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      {/* Banner de Fundo */}
      <div
        className="movie-banner"
        style={{
          backgroundImage: `linear-gradient(to top, #111 10%, transparent 90%), url(${movie.backdropUrl || movie.posterUrl})`,
        }}
      >
        <div className="movie-banner-content">
          <Link to="/" className="back-button">
            ← Voltar
          </Link>
          
          <h1>{movie.title}</h1>
          
          <div className="movie-meta">
            <span className="movie-rating">★ {movie.rating || "N/A"}</span>
            <span className="movie-year">{movie.year || "Ano desconhecido"}</span>
            <span className="movie-genre">{movie.genre || "Geral"}</span>
          </div>

          <p className="movie-description">
            {movie.description || "Nenhuma sinopse disponível no momento."}
          </p>

          <div className="movie-actions">
            <button 
              className="btn-play"
              onClick={() => alert(`Iniciando exibição de: ${movie.title}`)}
            >
              ▶ Assistir Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
