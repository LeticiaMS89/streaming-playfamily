# 🎬 PlayFamily — Plataforma de Streaming

O **PlayFamily** é uma aplicação *full-stack* que simula uma plataforma de streaming de mídia moderna. Desenvolvido como um projeto prático de portfólio, ele demonstra a implementação de uma Single Page Application (SPA) reativa e de alta performance conectada a uma API RESTful customizada.

O projeto foca em boas práticas de arquitetura, separação de responsabilidades (Frontend/Backend), autenticação segura com JWT e integração eficiente de dados.

---

## 🚀 Principais Funcionalidades

- **Autenticação Segura:** Sistema de login e controle de sessão via JSON Web Tokens (JWT).
- **Catálogo Dinâmico:** Consumo de API para listagem e filtragem de filmes e séries.
- **Roteamento Moderno:** Navegação fluida no lado do cliente utilizando React Router DOM v7.
- **Ambiente Otimizado:** Build super rápido e Hot Module Replacement (HMR) garantidos pelo Vite.
- **Arquitetura Desacoplada:** Backend configurado sob o namespace `/api` (ex: `/api/auth/login`, `/api/movies`), facilitando integrações e implantações em microsserviços.

---

## 🛠️ Stack Tecnológico

**Frontend:**
- **React 19:** Biblioteca principal para construção da interface.
- **Vite:** *Bundler* de nova geração para compilação e ambiente de desenvolvimento local.
- **React Router DOM v7:** Gerenciamento de rotas e navegação.
- **Variáveis de Ambiente:** Gerenciamento de chaves de API e URLs do servidor (via `VITE_API_URL`).

**Backend:**
- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express (v5.x):** Framework minimalista para criação da API RESTful.
- **jsonwebtoken (JWT):** Geração e validação de tokens de acesso.
- **CORS:** Liberação e controle de requisições de origens cruzadas (Frontend <-> Backend).

---

## 📂 Estrutura do Repositório

O projeto adota uma estrutura de monorepo simplificada, separando claramente o cliente e o servidor:

```text
PlayFamily/
├── backend/                # API RESTful
│   ├── controllers/        # Lógica de negócio e regras de cada endpoint
│   ├── middlewares/        # Interceptadores (ex: verificação de JWT, erros)
│   ├── routes/             # Definição das rotas (auth, movies, profiles)
│   ├── package.json        # Dependências do servidor (Express, CORS, JWT)
│   └── server.js           # Ponto de entrada do backend (Porta 4000)
│
├── frontend/               # Single Page Application
│   ├── public/             # Assets estáticos (favicon, logos)
│   ├── src/
│   │   ├── components/     # Componentes de UI reutilizáveis (VideoPlayer, Navbar)
│   │   ├── pages/          # Páginas principais (Home, Login, Dashboard)
│   │   ├── services/       # Lógica de chamadas de API (fetch via VITE_API_URL)
│   │   ├── App.jsx         # Raiz da árvore de componentes e rotas
│   │   └── main.jsx        # Ponto de montagem no DOM
│   ├── .env.example        # Template de variáveis de ambiente do Frontend
│   ├── package.json        # Dependências do cliente (React, Vite)
│   └── vite.config.js      # Configurações do Vite (Proxy, Aliases)
```
## ⚙️ Variáveis de Ambiente
Antes de iniciar, você precisará configurar os arquivos .env para apontar as portas e chaves corretas.

No diretório /frontend, crie um arquivo .env com o seguinte conteúdo:

```text
# URL base para consumo da API local
VITE_API_URL=http://localhost:4000/api
```
No diretório /backend (caso aplique variáveis para JWT ou Banco de Dados), crie um arquivo .env:

```text
PORT=4000
JWT_SECRET=sua_chave_secreta_aqui
```
## 🏃 Como Executar o Projeto Localmente
Siga os passos abaixo para rodar as duas pontas da aplicação simultaneamente.

1. Clonar o Repositório

```text
git clone [https://github.com/seu-usuario/playfamily.git](https://github.com/seu-usuario/playfamily.git)
cd playfamily
```
2. Inicializar o Backend
Em uma aba do terminal, instale as dependências e inicie o servidor:

```text
cd backend
npm install
npm start
```
O servidor estará rodando em: http://localhost:4000

3. Inicializar o Frontend
Abra uma nova aba no terminal, instale as dependências e inicie o Vite:

```text
cd frontend
npm install
npm run dev
```
A aplicação web estará rodando em: http://localhost:3000 (ou na porta definida no seu terminal).

👤 Autor
Desenvolvido por Leticia Moreira.

Perfil Profissional: Desenvolvedora Front-end focada no ecossistema React e criação de aplicações web progressivas.

Projeto educacional sem fins lucrativos.
