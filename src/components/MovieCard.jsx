// ========================================
// COMPONENTE: CARD DE FILME
// ========================================
// Componente que exibe um filme/série em formato de card (miniatura)
// Usado em carrouséis e listas de filmes

// Importa o hook para navegação entre páginas
import { useNavigate } from "react-router-dom";

// Recebe um objeto 'movie' (filme) através de props
function MovieCard({ movie }) {
  // Hook que permite redirecionar o usuário para outra página
  const navigate = useNavigate();

  return (
    <div
      className="movie-card" // Classe CSS para estilização
      // Ao clicar no card, redireciona para a página de detalhes do filme (/movies/ID)
      onClick={() => navigate(`/movies/${movie.id}`)} 
    >
      {/* Imagem de capa do filme */}
      <img src={movie.coverImage} alt={movie.title} />
      
      {/* Título do filme */}
      <h3>{movie.title}</h3>
      
      {/* Tipo de mídia: filme, série, anime, documentário */}
      <span>{movie.type}</span>
    </div>
  );
}

// ========== EXPORTAÇÃO ==========
// Exporta o componente para ser usado em outras páginas
export default MovieCard;