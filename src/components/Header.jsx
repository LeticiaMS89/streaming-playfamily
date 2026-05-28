// ========================================
// COMPONENTE: HEADER (CABEÇALHO)
// ========================================
// Componente responsável pela navegação superior da página
// Exibe logo, menu e links de navegação

function Header() {
  return (
    <header className="header"> {/* Elemento semântico de cabeçalho */}
      {/* Logo da plataforma */}
      <h1 className="header-logo">PlayFamily</h1>

      {/* Menu de navegação principal */}
      <nav className="header-nav">
        <a href="#filmes">Filmes</a> {/* Link para seção de filmes (scroll interno) */}
        <a href="#series">Séries</a> {/* Link para seção de séries (scroll interno) */}
        <a href="#documentarios">Documentários</a> {/* Link para seção de documentários (scroll interno) */}
      </nav>
    </header>
  );
}

// ========== EXPORTAÇÃO ==========
// Exporta o componente para ser usado em outras páginas
export default Header;