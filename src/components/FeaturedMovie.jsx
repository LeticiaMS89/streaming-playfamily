// ========================================
// BANNER EM DESTAQUE - PLAYFAMILY (REFATORADO)
// ========================================

import { Link } from "react-router-dom";

function FeaturedMovie({ movie }) {
  if (!movie) return null;

  // Trunca a descrição se ultrapassar o limite de caracteres
  const truncateText = (text, maxLength = 200) => {
    if (!text) return "Sem sinopse disponível.";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Trata gêneros enviados como Array ou String
  const genresFormatted = Array.isArray(movie.genres)
    ? movie.genres.join(", ")
    : movie.genre || "Geral";

  return (
    <section
      className="featured-container"
      style={{
        backgroundImage: `linear-gradient(to top, #111 10%, transparent 90%), linear-gradient(to right, #111 30%, transparent 70%), url(${movie.backdropUrl || movie.posterUrl})`,
      }}
    >
      <div className="featured-content">
        <h1 className="featured-title">{movie.title}</h1>

        <div className="featured-info">
          <span className="featured-points">★ {movie.rating || "N/A"}</span>
          <span className="featured-year">{movie.year || "Lançamento"}</span>
          {movie.seasons && (
            <span className="featured-seasons">
              {movie.seasons} {movie.seasons === 1 ? "Temporada" : "Temporadas"}
            </span>
          )}
        </div>

        <p className="featured-description">
          {truncateText(movie.description)}
        </p>

        <div className="featured-buttons">
          <Link to={`/movies/${movie.id}`} className="btn-featured-watch">
            ▶ Assistir
          </Link>
          <Link to={`/movies/${movie.id}`} className="btn-featured-info">
            ℹ Mais Informações
          </Link>
        </div>

        <div className="featured-genres">
          <strong>Gêneros:</strong> {genresFormatted}
        </div>
      </div>
    </section>
  );
}

export default FeaturedMovie;
