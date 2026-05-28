# 🎬 PLAYFAMILY (DEVFLIX) - PLATAFORMA DE STREAMING

O **PlayFamily** é uma aplicação de streaming inspirada no layout da Netflix, desenvolvida para proporcionar uma experiência dinâmica de consumo de mídia. O projeto é **Full Stack**, composto por uma API robusta no ecossistema Node.js (Backend) e uma interface moderna, fluida e totalmente responsiva construída em React (Frontend).

O grande diferencial do projeto é o sistema de **perfis independentes**, onde o catálogo de filmes, séries, animes e documentários se adapta dinamicamente com base no usuário que está assistindo.

---

## 🛠️ LINGUAGENS, TECNOLOGIAS E FERRAMENTAS UTILIZADAS

### LINGUAGENS PRINCIPAIS
* **HTML5:** Estruturação semântica dos elementos da interface.
* **JavaScript (ES6+):** Linguagem principal utilizada tanto no ecossistema do Frontend quanto no Backend.

### FRONTEND (INTERFACE DO USUÁRIO)
* **React.js:** Biblioteca para construção da interface baseada em componentes modulares e estados eficientes.
* **Vite:** Ferramenta de build ultra-rápida para o ambiente de desenvolvimento local.
* **React Router DOM:** Biblioteca para gerenciamento e controle das rotas internas da aplicação.
* **CSS-in-JS (Inline Styles):** Estilização e estruturação responsiva avançada direto nos componentes React.

### BACKEND (API E SERVIDOR)
* **Node.js:** Ambiente de execução JavaScript do lado do servidor.
* **Express:** Framework minimalista para criação das rotas e controle de requisições HTTP.
* **CORS:** Middleware para liberação e segurança de requisições cruzadas entre domínios diferentes.
* **Nodemon:** Utilitário para reiniciar o servidor automaticamente a cada alteração de código.

### FERRAMENTAS DE DESENVOLVIMENTO E PRODUTIVIDADE
* **Visual Studio Code:** Ambiente de Desenvolvimento Integrado (IDE) utilizado para a escrita do código.
* **Git:** Sistema de controle de versão distribuído para rastreamento de alterações.
* **GitHub:** Plataforma de hospedagem de código e colaboracao.
* **NPM:** Gerenciador de pacotes utilizado para instalar as dependências do ecossistema Node.

---

## 🚀 FUNCIONALIDADES PRINCIPAIS

* **Autenticação Integrada:** Tela de Login conectada à API com validações de credenciais em tempo real.
* **Seleção e Criação de Perfis:** Suporte a múltiplos perfis de usuários com avatares dinâmicos gerados via API (*DiceBear*). Os dados e perfis criados persistem no navegador utilizando `localStorage`.
* **Alternador de Perfis (In-App):** Opção de trocar de perfil de usuário de dentro da plataforma a qualquer momento sem a necessidade de deslogar da conta principal.
* **Filtros Inteligentes:** Separação precisa do catálogo em categorias por meio de abas de navegação: *Início*, *Filmes*, *Séries*, *Animes* e *Documentários*.
* **Barra de Busca Minimalista:** Campo de pesquisa moderno com ícone vetorial (SVG) que busca instantaneamente por títulos ou subcategorias de forma fluida.
* **Catálogo Expandido por Gêneros:** Organização visual em carrosséis horizontais divididos em *Lançamentos, Terror e Horror, Comédia, Romance, Biografias, Ficção Científica, Clássicos Cult, Ação* e *Animação*.
* **Modal de Trailer Dinâmico:** Ao clicar em um card ou no banner de destaque, um modal responsivo é aberto renderizando o player do YouTube com a sinopse e os dados do título.
* **Layout 100% Responsivo:** Interface projetada minuciosamente para se adaptar perfeitamente a smartphones, tablets, notebooks e smart TVs.

---

## 📂 ESTRUTURA DE PASTAS DO PROJETO

```text
playfamily/
├── backend/
│   ├── data/
│   │   └── movies.js       # Banco de dados simulado em formato JSON
│   ├── server.js           # Arquivo principal do servidor Express e Rotas
│   └── package.json        # Dependências e scripts do Backend
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   └── Login.jsx   # Tela de login e gerenciamento/seleção de perfis
    │   ├── App.jsx         # Tela principal da vitrine de filmes responsiva
    │   └── main.jsx        # Configuração de rotas e inicialização do React
    └── package.json        # Dependências e scripts do Frontend
