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
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`)} 
      style={{
        width: '180px',
        height: '270px',
        borderRadius: '14px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: '#111',
        boxShadow: '0 18px 40px rgba(0,0,0,0.2)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
    >
      {/* Imagem de capa do filme */}
      <img src={movie.coverImage} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 18%, rgba(0,0,0,0.3) 45%, transparent 100%)'
      }} />

      <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '14px' }}>
        <h3 style={{ margin: 0, color: '#fff', fontSize: '0.95rem', lineHeight: '1.2', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>{movie.title}</h3>
        <span style={{ color: '#dcdcdc', fontSize: '0.72rem' }}>{movie.type}</span>
      </div>
    </div>
  );
}

// ========== EXPORTAÇÃO ==========
// Exporta o componente para ser usado em outras páginas
export default MovieCard;