// ========================================
// COMPONENTE: FILEIRA DE FILMES
// ========================================
// Componente que exibe uma categoria/fileira de filmes/séries
// Utiliza o componente MovieCard para exibir cada filme em um carroussel

// Importa o componente que exibe cada filme individual
import MovieCard from "./MovieCard";

// Recebe: título da categoria e lista de filmes através de props
function MovieRow({ title, movies }) {
  
  // ========== VALIDAÇÃO ==========
  // Se a lista não existe ou está vazia, não renderiza a fileira
  if (!movies || movies.length === 0) {
    return null; // Não exibe nada se não houver filmes
  }

  return (
    <section className="movie-row"> {/* Seção que agrupa uma categoria de filmes */}
      {/* Título/nome da categoria */}
      <h2>{title}</h2>

      {/* Container que exibe os cards em forma de carroussel */}
      <div className="movie-list">
        {/* Itera sobre cada filme na lista e renderiza um card */}
        {movies.map((movie) => (
          // Exibe um MovieCard para cada filme
          // 'key' é necessário para React identificar cada elemento
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

// ========== EXPORTAÇÃO ==========
// Exporta o componente para ser usado em outras páginas
export default MovieRow;