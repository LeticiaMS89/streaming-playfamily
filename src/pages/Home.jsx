// ========================================
// PÁGINA HOME - PLAYFAMILY (REFATORADA)
// ========================================

import { useState, useEffect } from "react";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieRow from "../components/MovieRow";

function Home() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController cancela requisições se o componente desmontar
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchHomeData() {
      try {
        setIsLoading(true);
        setError(null);

        // Busca simultânea de dados para otimizar o tempo de carregamento
        const [featuredResponse, moviesResponse] = await Promise.all([
          fetch("http://localhost:3000/featured", { signal }),
          fetch("http://localhost:3000/movies", { signal }),
        ]);

        if (!featuredResponse.ok || !moviesResponse.ok) {
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
  const moviesOnly = moviesList.filter((item) => item.type === "movie");
  const seriesOnly = moviesList.filter((item) => item.type === "series");
  const animesOnly = moviesList.filter((item) => item.type === "anime");

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
