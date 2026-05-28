// Importa useEffect e useState do React
import { useEffect, useState } from "react";

// Importa os componentes usados na página Home
import Header from "../components/Header";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieRow from "../components/MovieRow";

// Cria o componente da página inicial
function Home() {
  // Estado que guarda a lista de filmes vinda do backend
  const [movies, setMovies] = useState([]);

  // Estado que guarda o filme em destaque
  const [featuredMovie, setFeaturedMovie] = useState(null);

  // Lista de categorias que serão exibidas na tela
  const categories = ["Lançamentos", "Ação", "Séries", "Documentários"];

  // useEffect executa uma ação quando a página carrega
  useEffect(() => {
    // Função assíncrona para buscar dados no backend
    async function loadData() {
      try {
        // Busca todos os filmes na API
        const moviesResponse = await fetch("http://localhost:3000/movies");

        // Converte a resposta dos filmes para JSON
        const moviesData = await moviesResponse.json();

        // Busca o filme em destaque na API
        const featuredResponse = await fetch("http://localhost:3000/featured");

        // Converte a resposta do filme em destaque para JSON
        const featuredData = await featuredResponse.json();

        // Salva os filmes no estado
        setMovies(moviesData);

        // Salva o filme em destaque no estado
        setFeaturedMovie(featuredData);
      } catch (error) {
        // Mostra erro no console caso o backend não responda
        console.log("Erro ao buscar dados:", error);
      }
    }

    // Chama a função que carrega os dados
    loadData();
  }, []); // [] faz o useEffect rodar apenas uma vez ao abrir a página

  // Retorna o JSX da página Home
  return (
    <div>
      {/* Cabeçalho da aplicação */}
      <Header />

      {/* Componente que mostra o filme em destaque */}
      <FeaturedMovie movie={featuredMovie} />

      {/* Área principal onde aparecem as categorias de filmes */}
      <main className="content">
        {/* Percorre cada categoria da lista */}
        {categories.map((category) => {
          // Filtra apenas os filmes que pertencem à categoria atual
          const filteredMovies = movies.filter(
            (movie) => movie.category === category
          );

          // Renderiza uma fileira de filmes para cada categoria
          return (
            <MovieRow
              key={category}
              title={category}
              movies={filteredMovies}
            />
          );
        })}
      </main>
    </div>
  );
}

// Exporta a página Home para ser usada nas rotas
export default Home;