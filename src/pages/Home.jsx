// ========================================
// PÁGINA HOME - PLAYFAMILY (comentada em português)
// ========================================
// Este componente carrega os dados em destaque e a lista de títulos
// Utiliza AbortController para cancelar requisições se o componente desmontar

import { useState, useEffect } from "react";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieRow from "../components/MovieRow";

function Home() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL base da API (definida via Vite env)
  const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  useEffect(() => {
    // AbortController cancela requisições se o componente desmontar
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchHomeData() {
      try {
        setIsLoading(true);
        setError(null);

        // Recupera token (se existir) para enviar em rotas protegidas
        const token = localStorage.getItem("@PlayFamily:token");
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        // Busca simultânea de dados para otimizar o tempo de carregamento
        const [featuredResponse, moviesResponse] = await Promise.all([
          fetch(`${API}/featured`, { signal, headers }),
          fetch(`${API}/movies`, { signal, headers }),
        ]);

        if (!featuredResponse.ok || !moviesResponse.ok) {
          // Tratamento simplificado — em caso de 401 pode redirecionar ao login
          if (featuredResponse.status === 401 || moviesResponse.status === 401) {
            throw new Error('Sessão expirada. Faça login novamente.');
          }
          throw new Error("Falha ao carregar catálogo do PlayFamily.");
        }

        const featuredData = await featuredResponse.json();
        const moviesData = await moviesResponse.json();

        setFeaturedMovie(featuredData);
        setMoviesList(moviesData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Erro de conexão com o servidor.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchHomeData();

    return () => controller.abort();
  }, []);

  // Exibição de estado de carregamento
  if (isLoading) {
    return (
      <div className="home-loading">
        <div className="spinner"></div>
        <p>Carregando catálogo PlayFamily...</p>
      </div>
    );
  }

  // Exibição de estado de erro
  if (error) {
    return (
      <div className="home-error">
        <h2>Ops! Algo deu errado.</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  // Agrupamento dinâmico por tipo/categoria
  // Alguns itens podem usar a propriedade 'type' ou 'mediaType' — normalizamos aqui
  const normalizeType = (item) => item.type || (item.mediaType === 'serie' ? 'series' : item.mediaType === 'filme' ? 'movie' : item.mediaType || 'movie');

  const moviesOnly = moviesList.filter((item) => normalizeType(item) === "movie");
  const seriesOnly = moviesList.filter((item) => normalizeType(item) === "series");
  const animesOnly = moviesList.filter((item) => normalizeType(item) === "anime");

  return (
    <div className="home-container">
      {/* Banner Principal em Destaque */}
      {featuredMovie && <FeaturedMovie movie={featuredMovie} />}

      {/* Fileiras de Conteúdo Agrupadas */}
      <section className="lists">
        {moviesOnly.length > 0 && (
          <MovieRow title="Filmes Recomendados" items={moviesOnly} />
        )}
        {seriesOnly.length > 0 && (
          <MovieRow title="Séries em Alta" items={seriesOnly} />
        )}
        {animesOnly.length > 0 && (
          <MovieRow title="Animes em Destaque" items={animesOnly} />
        )}
      </section>
    </div>
  );
}

export default Home;
