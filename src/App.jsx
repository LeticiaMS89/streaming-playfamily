// ========================================
// COMPONENTE PRINCIPAL - PLAYFAMILY HOME
// ========================================
// Este é o componente principal que exibe o catálogo de filmes/séries/animes
// Responsável por: filtros, busca, responsividade, carrouséis e modal de trailer

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // Recupera dados do perfil selecionado do armazenamento local (localStorage)
  const perfilId = Number(localStorage.getItem('perfilSelecionadoId')) || 1;
  const perfilNome = localStorage.getItem('perfilSelecionadoNome') || "Usuário";
  const perfilAvatar = localStorage.getItem('perfilSelecionadoAvatar') || '';

  // ========== ESTADOS DO APLICATIVO ==========
  const [movies, setMovies] = useState([]); // Lista completa de filmes/séries/animes
  const [loading, setLoading] = useState(true); // Indica se os dados estão carregando
  const [abaAtual, setAbaAtual] = useState('todos'); // Tipo selecionado: todos, filme, serie, anime, documentario
  const [busca, setBusca] = useState(''); // Termo de busca digitado pelo usuário
  const [midiaSelecionada, setMidiaSelecionada] = useState(null); // Filme/série selecionado para ver trailer

  // Controla a largura da janela para responsividade dinâmica (mobile vs desktop)
  const [larguraJanela, setLarguraJanela] = useState(window.innerWidth);

  // Atualiza a largura da janela quando o usuário redimensiona a tela
  useEffect(() => {
    const lidarResize = () => setLarguraJanela(window.innerWidth);
    window.addEventListener('resize', lidarResize);
    return () => window.removeEventListener('resize', lidarResize);
  }, []);

  // ========== LISTA DE GÊNEROS/CATEGORIAS ==========
  // Define as subcategorias (gêneros) disponíveis na plataforma
  const subcategorias = [
    { id: 'lancamentos', nome: 'Lançamentos' },
    { id: 'terror', nome: 'Terror & Horror' },
    { id: 'comedia', nome: 'Comédia' },
    { id: 'romance', nome: 'Romance' },
    { id: 'biografico', nome: 'Biografias e Histórias Reais' },
    { id: 'ficcao cientifica', nome: 'Ficção Científica' },
    { id: 'classicos', nome: 'Clássicos Cult' },
    { id: 'acao', nome: 'Ação & Aventura' },
    { id: 'animacao', nome: 'Animação' },
    { id: 'suspense', nome: 'Suspense e Mistério' },
    { id: 'drama', nome: 'Drama' }
    
  ];

  // ========== CARREGAMENTO DOS FILMES DO BACKEND ==========
  // Faz uma requisição HTTP para obter a lista de filmes/séries/animes da API
  useEffect(() => {
    async function carregarFilmes() {
      try {
        const response = await fetch("http://localhost:3000/movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false); // Para o carregamento, dando certo ou não
      }
    }
    carregarFilmes();
  }, []);

  // ========== FUNÇÃO DE TROCA DE PERFIL ==========
  // Remove os dados do perfil atual e redireciona para a tela de login
  const lidarTrocaPerfil = () => {
    localStorage.removeItem('perfilSelecionadoId');
    localStorage.removeItem('perfilSelecionadoNome');
    localStorage.removeItem('perfilSelecionadoAvatar');
    navigate('/');
  };

  // ========== LÓGICA DE FILTRAGEM ==========
  // Filtra os filmes de acordo com: perfil do usuário, tipo de mídia e busca

  // 1. Filtra por perfil: apenas filmes que este perfil pode ver
  const midiasDoPerfil = movies.filter(m =>
    perfilId > 6 || (m.profileIds && m.profileIds.includes(perfilId))
  );

  // 2. Filtra por tipo: filme, série, anime, documentário ou todos
  const midiasPorTipo = abaAtual === 'todos'
    ? midiasDoPerfil
    : midiasDoPerfil.filter(m => m.mediaType === abaAtual);

  // 3. Filtra por termo de busca (título ou gênero)
  const midiasFiltradasfinais = midiasPorTipo.filter(m =>
    m.title.toLowerCase().includes(busca.toLowerCase()) ||
    m.genres.some(g => g.toLowerCase().includes(busca.toLowerCase()))
  );

  // Define o filme em destaque (destaque ou o primeiro da lista)
  const destaque = midiasFiltradasfinais.find(m => m.featured) || midiasFiltradasfinais[0];

  // Define se o dispositivo é celular (viewport <= 768px)
  const esCelular = larguraJanela <= 768;

  // ========== RENDERIZAÇÃO DO CARREGAMENTO ==========
  // Mostra mensagem enquanto os dados estão sendo carregados
  if (loading) {
    return (
      <div style={{ backgroundColor: '#141414', color: '#fff', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <h2>Bem vindo à PlayFamily...</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#141414', color: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', paddingBottom: '50px', overflowX: 'hidden' }}>

      {/* ========== CABEÇALHO/HEADER RESPONSIVO ========== */}
      {/* Barra superior fixa com logo, navegação, busca e perfil do usuário */}
      <header style={{
        display: 'flex',
        flexDirection: esCelular ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: esCelular ? '15px 20px' : '15px 40px',
        backgroundColor: 'rgba(20, 20, 20, 0.95)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backdropFilter: 'blur(10px)',
        gap: esCelular ? '15px' : '0px'
      }}>
        {/* Logo + Navegação por Tipo de Mídia */}
        <div style={{ display: 'flex', flexDirection: esCelular ? 'column' : 'row', alignItems: 'center', gap: esCelular ? '10px' : '40px', width: esCelular ? '100%' : 'auto' }}>
          {/* Logo clicável que volta para "Todos" */}
          <h1 style={{ color: '#E50914', margin: 0, fontSize: '1.6rem', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px' }} onClick={() => setAbaAtual('todos')}>PlayFamily</h1>

          {/* Menu de navegação: Início, Filmes, Séries, Animes, Documentários */}
          <nav style={{
            display: 'flex',
            gap: '15px',
            color: '#e5e5e5',
            fontSize: '0.8rem',
            overflowX: esCelular ? 'auto' : 'unset',
            whiteSpace: 'nowrap',
            width: esCelular ? '100%' : 'auto',
            justifyContent: esCelular ? 'flex-start' : 'center',
            paddingBottom: esCelular ? '5px' : '0px'
          }}>
            {['todos', 'filme', 'serie', 'anime', 'documentario'].map(tipo => (
              <span key={tipo} onClick={() => setAbaAtual(tipo)} style={{ cursor: 'pointer', color: abaAtual === tipo ? '#fff' : '#b3b3b3', fontWeight: abaAtual === tipo ? 'bold' : 'normal', textTransform: 'capitalize' }}>
                {tipo === 'todos' ? 'Início' : tipo === 'serie' ? 'Séries' : tipo + 's'}
              </span>
            ))}
          </nav>
        </div>

        {/* ========== BUSCA E OPÇÕES DE PERFIL ========== */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', width: esCelular ? '100%' : 'auto' }}>

          {/* Caixa de Busca com Ícone de Lupa */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)', flexGrow: esCelular ? 1 : 0 }}>
            {/* Ícone da lupa */}
            <svg style={{ width: '16px', height: '16px', fill: '#b3b3b3', marginRight: '8px', flexShrink: 0 }} viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            {/* Campo de entrada de busca */}
            <input type="text" placeholder="Buscar..." value={busca} onChange={(e) => setBusca(e.target.value)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', width: esCelular ? '100%' : '140px', fontSize: '0.85rem' }} />
          </div>

          {/* ========== INFORMAÇÕES DO PERFIL E LOGOUT ========== */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0 }}>
            {perfilAvatar ? (
              <img
                src={perfilAvatar}
                alt={perfilNome}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.25)' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${perfilNome}`;
                }}
              />
            ) : (
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#333' }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.8rem' }}>{perfilNome}</span>
              <span onClick={lidarTrocaPerfil} style={{ color: '#b3b3b3', fontSize: '0.7rem', cursor: 'pointer', textDecoration: 'underline' }}>
                Trocar Perfil
              </span>
            </div>
            {/* Botão de Logout */}
            <a href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.75rem', backgroundColor: '#E50914', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold' }}>Sair</a>
          </div>

        </div>
      </header>

      {/* ========== BANNER DESTAQUE PRINCIPAL ========== */}
      {/* Exibe um filme/série em grande destaque apenas quando não há busca ativa */}
      {destaque && !busca && (
        <div style={{
          padding: esCelular ? '60px 20px 40px 20px' : '120px 40px 80px 40px',
          background: `linear-gradient(to top, #141414 5%, transparent 95%), linear-gradient(to right, rgba(20,20,20,0.95) 40%, rgba(20,20,20,0.4) 100%), url("${destaque.bannerImage}") center/cover`,
          minHeight: esCelular ? '30vh' : '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#E50914', fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '2px' }}>DESTAQUE PERSONALIZADO</span>
          <h2 style={{ fontSize: esCelular ? '2rem' : '3.5rem', margin: '10px 0', fontWeight: 'bold', textShadow: '2px 2px 10px rgba(0,0,0,0.9)', maxWidth: '90%' }}>{destaque.title}</h2>
          <p style={{ maxWidth: '500px', fontSize: esCelular ? '0.9rem' : '1.05rem', color: '#d2d2d2', lineHeight: '1.4', textShadow: '1px 1px 6px rgba(0,0,0,0.9)', marginBottom: '15px' }}>{destaque.description}</p>
          {/* Botão para abrir trailer */}
          <button onClick={() => setMidiaSelecionada(destaque)} style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '10px 24px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '4px', width: 'fit-content' }}>
            ▶ Assistir Trailer
          </button>
        </div>
      )}

      {/* ========== SEÇÃO DE CARROUSÉIS/GÊNEROS ========== */}
      {/* Mostra filmes agrupados por gênero/categoria ou resultados de busca */}
      <div style={{ padding: esCelular ? '0 20px' : '0 40px', marginTop: busca ? '20px' : esCelular ? '10px' : '-30px', position: 'relative', zIndex: 2 }}>
        {busca ? (
          // Se há busca ativa: mostra resultados filtrados
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#999', marginBottom: '15px' }}>Resultados:</h3>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: esCelular ? 'center' : 'flex-start' }}>
              {midiasFiltradasfinais.map(m => (
                <CardComponent key={m.id} m={m} setMidiaSelecionada={setMidiaSelecionada} esCelular={esCelular} />
              ))}
            </div>
          </div>
        ) : (
          // Se não há busca: mostra carrouséis por gênero
          subcategorias.map(sub => {
            const itensDaSub = midiasFiltradasfinais.filter(m => m.genres.includes(sub.id));
            if (itensDaSub.length === 0) return null; // Não mostra gêneros vazios
            return (
              <div key={sub.id} style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: esCelular ? '1.1rem' : '1.3rem', marginBottom: '12px', fontWeight: 'bold', color: '#fff' }}>{sub.nome}</h3>

                {/* Carroussel Horizontal com Scroll Suave */}
                {/* No mobile, permite scroll horizontal nativo e suave */}
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  overflowX: 'auto',
                  paddingBottom: '10px',
                  WebkitOverflowScrolling: 'touch', // Scroll nativo suave no iOS
                  scrollbarWidth: 'none' // Remove barra no Firefox
                }}>
                  {itensDaSub.map(m => (
                    <CardComponent key={m.id} m={m} setMidiaSelecionada={setMidiaSelecionada} esCelular={esCelular} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ========== MODAL DE TRAILER ========== */}
      {/* Janela modal que exibe o trailer do filme/série selecionado */}
      {midiaSelecionada && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: esCelular ? 'flex-start' : 'center', zIndex: 100, backdropFilter: 'blur(5px)', overflowY: esCelular ? 'auto' : 'hidden', padding: esCelular ? '20px 0' : '0' }}>
          <div style={{
            backgroundColor: '#181818',
            width: esCelular ? '90%' : '700px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #2c2c2c',
            position: 'relative',
            marginTop: esCelular ? '40px' : '0px',
            marginBottom: esCelular ? '40px' : '0px'
          }}>
            {/* Botão para Fechar Modal */}
            <button onClick={() => setMidiaSelecionada(null)} style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '0.9rem', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✕</button>

            {/* VIDEO RESPONSIVO (Proporção 16:9) */}
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' /* Proporção 16:9 */ }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={midiaSelecionada.trailerUrl?.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* INFORMAÇÕES DO FILME/SÉRIE NO MODAL */}
            <div style={{ padding: esCelular ? '20px' : '25px' }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: esCelular ? '1.4rem' : '1.7rem', fontWeight: 'bold' }}>{midiaSelecionada.title}</h2>
              <p style={{ color: '#cccccc', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 15px 0' }}>{midiaSelecionada.description}</p>
              <div style={{ display: 'flex', flexDirection: esCelular ? 'column' : 'row', gap: '10px', alignItems: esCelular ? 'flex-start' : 'center' }}>
                <span style={{ backgroundColor: 'rgba(229, 9, 20, 0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', textTransform: 'uppercase', color: '#E50914', fontWeight: 'bold' }}>{midiaSelecionada.mediaType}</span>
                <span style={{ color: '#808080', fontSize: '0.8rem' }}>Gêneros: {midiaSelecionada.genres.join(', ').toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== COMPONENTE CARD DE FILME/SÉRIE ==========
// Componente reutilizável que exibe um card individual de filme/série
// Se for celular: tamanho reduzido; Se for desktop: efeito hover (escala aumenta)

const CardComponent = ({ m, setMidiaSelecionada, esCelular }) => {
  // Define proporção vertical estilo pôster para mobile e desktop
  const larguraCard = esCelular ? '150px' : '190px';
  const alturaCard = esCelular ? '230px' : '300px';

  return (
    <div
      onClick={() => setMidiaSelecionada(m)}
      style={{
        minWidth: larguraCard,
        width: larguraCard,
        height: alturaCard,
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#111',
        boxShadow: '0 18px 40px rgba(0,0,0,0.25)',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => { if (!esCelular) e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; }}
      onMouseLeave={(e) => { if (!esCelular) e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
    >
      <img
        src={m.posterImage || m.coverImage}
        alt={m.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 18%, rgba(0,0,0,0.3) 45%, transparent 100%)'
      }} />

      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '12px',
        display: 'flex',
        alignItems: 'flex-end'
      }}>
        <span 
        translate="no"
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: esCelular ? '0.85rem' : '0.95rem',
          lineHeight: '1.2',
          textShadow: '0 2px 8px rgba(0,0,0,0.7)'
        }}>
          {m.title}
        </span>
      </div>
    </div>
  );
};

// ========== EXPORTAÇÃO ==========
// Exporta o componente App para ser usado nas rotas
export default App;