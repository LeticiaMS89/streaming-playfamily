// ========================================
// FILEIRA DE FILMES/SÉRIES - PLAYFAMILY (REFATORADA)
// ========================================

import { useRef } from "react";
import { Link } from "react-router-dom";

function MovieRow({ title, items = [] }) {
  const rowRef = useRef(null);

  // Manipula a rolagem horizontal suave
  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;

      rowRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!items.length) return null;

  return (
    <div className="movie-row-container">
      <h2 className="movie-row-title">{title}</h2>

      <div className="movie-row-wrapper">
        {/* Botão de Rolagem Esquerda */}
        <button
          className="row-nav-btn nav-left"
          onClick={() => handleScroll("left")}
          aria-label={`Rolar ${title} para a esquerda`}
        >
          ‹
        </button>

        {/* Lista Horizontal de Cards */}
        <div className="movie-row-list" ref={rowRef}>
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/movies/${item.id}`}
              className="movie-card-link"
            >
              <div className="movie-card">
                <img
                  src={item.posterUrl || "/placeholder.jpg"}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x450?text=Sem+Capa";
                  }}
                />
                <div className="movie-card-info">
                  <span className="movie-card-title">{item.title}</span>
                  {item.rating && (
                    <span className="movie-card-rating">★ {item.rating}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Botão de Rolagem Direita */}
        <button
          className="row-nav-btn nav-right"
          onClick={() => handleScroll("right")}
          aria-label={`Rolar ${title} para a direita`}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default MovieRow;
