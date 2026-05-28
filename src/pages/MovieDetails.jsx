// ========================================
// PÁGINA: DETALHES DO FILME/SÉRIE
// ========================================
// Página que exibe informações completas sobre um filme/série
// Acessável ao clicar em um card ou no destaque

// Importa hooks do React
import { useEffect, useState } from "react";

// Importa hooks de roteamento
import { useParams, useNavigate } from "react-router-dom";

// Importa componente de cabeçalho
import Header from "../components/Header";

// Componente principal da página de detalhes
function MovieDetails() {
  // ========== OBTENÇÃO DO ID DA URL ==========
  // Recupera o parâmetro 'id' da URL (ex: /movies/2 → id = 2)
  const { id } = useParams();

  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // ========== ESTADOS DO COMPONENTE ==========
  // Armazena os dados do filme buscado na API
  const [movie, setMovie] = useState(null);

  // Controla se os dados estão em carregamento
  const [loading, setLoading] = useState(true);

  // ========== BUSCA DO FILME NO BACKEND ==========
  // Executado quando a página carrega ou quando o ID da URL muda
  useEffect(() => {
    // Função assíncrona que busca o filme
    async function loadMovie() {
      try {
        // Faz requisição GET para obter o filme pelo ID
        const response = await fetch(
          `http://localhost:3000/movies/${id}`
        );

        // Converte a resposta para objeto JavaScript
        const data = await response.json();

        // Salva os dados do filme no estado
        setMovie(data);
      } catch (error) {
        // Mostra erro no console
        console.log("Erro ao buscar filme:", error);
      } finally {
        // Marca que o carregamento terminou (com sucesso ou erro)
        setLoading(false);
      }
    }

    // Chama a função de busca
    loadMovie();
  }, [id]); // Re-executa se o ID da URL mudar

  // ========== RENDERIZAÇÃO: CARREGANDO ==========
  // Mostra enquanto os dados estão sendo carregados
  if (loading) {
    return (
      <div>
        <Header />

        <div className="details-page">
          <h2>Carregando filme...</h2>
        </div>
      </div>
    );
  }

  // ========== RENDERIZAÇÃO: FILME NÃO ENCONTRADO ==========
  // Mostra se o filme não existe ou a API retornou erro
  if (!movie || movie.message) {
    return (
      <div>
        <Header />

        <div className="details-page">
          <h2>Filme não encontrado</h2>

          {/* Botão para voltar à página inicial */}
          <button onClick={() => navigate("/home")}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // ========== RENDERIZAÇÃO: DETALHES DO FILME ==========
  // Mostra quando o filme foi encontrado com sucesso
  return (
    <div>
      <Header />

      {/* Seção principal da página com os detalhes do filme */}
      <section
        className="details-page"
        style={{
          // Background: imagem do filme com degradê para melhor legibilidade
          backgroundImage: `linear-gradient(to right, #111 40%, transparent), url(${movie.bannerImage})`
        }}
      >
        {/* Container com as informações do filme */}
        <div className="details-content">
          {/* Título do filme */}
          <h1>{movie.title}</h1>

          {/* Descrição do filme */}
          <p>{movie.description}</p>

          {/* Metadados: categoria e tipo */}
          <span>Categoria: {movie.category}</span>
          <span>Tipo: {movie.type}</span>

          {/* Botões de ação */}
          <div className="details-buttons">
            {/* Botão para assistir (ainda sem funcionalidade de player) */}
            <button>Assistir agora</button>

            {/* Botão para voltar à página inicial */}
            <button onClick={() => navigate("/home")}>
              Voltar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ========== EXPORTAÇÃO ==========
// Exporta o componente para ser usado nas rotas
export default MovieDetails;