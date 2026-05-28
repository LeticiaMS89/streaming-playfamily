// ========================================
// COMPONENTE: FILME EM DESTAQUE
// ========================================
// Componente que exibe um filme/série em grande destaque na tela inicial
// Mostra imagem de fundo, título, descrição e botões de ação

// Importa o hook para navegação entre páginas
import { useNavigate } from "react-router-dom";

// Recebe um objeto 'movie' (filme) através de props
function FeaturedMovie({ movie }) {
  // Hook que permite redirecionar o usuário para outra página
  const navigate = useNavigate();

  // ========== VALIDAÇÃO ==========
  // Se não existe filme em destaque, não renderiza nada
  if (!movie) {
    return null; // Retorna null para não exibir nada na tela
  }

  return (
    <section
      className="featured" // Classe CSS para estilização
      style={{
        // Background: imagem do filme com degradê escuro para melhor legibilidade do texto
        backgroundImage: `linear-gradient(to right, #111 30%, transparent), url(${movie.bannerImage})`
      }}
    >
      {/* Container com conteúdo textual do destaque */}
      <div className="featured-content">
        {/* Título do filme/série */}
        <h2>{movie.title}</h2>
        
        {/* Descrição do filme/série */}
        <p>{movie.description}</p>

        {/* Área dos botões de ação */}
        <div className="featured-buttons">
          {/* Botão para assistir (ainda sem funcionalidade) */}
          <button>Assistir</button>
          
          {/* Botão para ver detalhes - Redireciona para página /movies/:id */}
          <button onClick={() => navigate(`/movies/${movie.id}`)}>
            Ver detalhes
          </button>
        </div>
      </div>
    </section>
  );
}

// ========== EXPORTAÇÃO ==========
// Exporta o componente para ser usado em outras páginas
export default FeaturedMovie;