# 🎬 PlayFamily — Plataforma de Streaming (em Português)

PlayFamily é um projeto educacional/portfólio que simula uma plataforma de streaming com uma aplicação frontend em React (Vite) e um backend simples em Node.js + Express. O objetivo é demonstrar padrões de arquitetura full‑stack, autenticação JWT e consumo de API a partir de um SPA.

## 🚀 Principais mudanças aplicadas neste repositório

- Padronizei API para o namespace /api (ex.: /api/auth/login, /api/movies).
- Backend configurado para rodar em porta 4000 por padrão.
- Frontend usa variável de ambiente VITE_API_URL (ex.: http://localhost:4000/api) em vez de URLs hardcoded.
- Comentários e documentação em português.
- Ajustes em package.json (raiz e backend) e README atualizado.

---

## Stack
- **Linguagem:** JavaScript (ESM no frontend, CommonJS no backend)
- **Frontend:** React 19 + Vite
- **Backend:** Node.js + Express
- **Autenticação:** JWT (jsonwebtoken)

## Estrutura relevante do repositório

```
backend/             # servidor Express (API)
  data/              # dados mock (movies.js)
  server.js          # servidor principal (rotas /api/...)
  package.json
src/                 # frontend React (Vite)
  components/        # componentes UI (FeaturedMovie, MovieRow, ...)
  pages/             # páginas (Login, Home, MovieDetails)
  main.jsx           # ponto de entrada que monta <App /> dentro do BrowserRouter
  App.jsx            # roteamento e layout principal
  styles.css
index.html           # HTML base (lang=pt-BR)
.env.example         # variáveis de ambiente de exemplo
README.md
```

## Como rodar localmente (curto caminho)

1) Instalar dependências

```bash
# Raiz — frontend
npm install

# Backend
cd backend
npm install
cd ..
```

2) Configurar variáveis de ambiente

- Crie um arquivo `.env` no backend com as variáveis (ex.: `backend/.env`) ou use as defaults.
- Crie um arquivo `.env.local` no frontend com a variável Vite:

```
VITE_API_URL=http://localhost:4000/api
```

3) Iniciar backend e frontend

```bash
# Em um terminal: backend
cd backend
npm run dev

# Em outro terminal: frontend
npm run dev
```

O frontend estará disponível em http://localhost:5173 (porta padrão do Vite) e consumirá a API em http://localhost:4000/api.

---

## Endpoints principais (resumo)

- POST /api/auth/login — login (body: { email, password }) → retorna { token, user }
- GET /api/auth/me — perfil do usuário (rota protegida com Authorization: Bearer <token>)
- GET /api/movies — lista de títulos (suporta query params: type, genre)
- GET /api/movies/:id — detalhes do título
- GET /api/featured — item em destaque

---

## Boas práticas / Observações

- Tokens JWT atualmente são armazenados no localStorage (simples para demo). Para produção, usar cookies httpOnly + refresh tokens.
- A base de dados é mockada (backend/data/movies.js). Substitua por um BD real (Postgres, MongoDB) em produção.
- Não comite arquivos `.env` contendo secrets.

---

## Próximos passos que posso automatizar (opcional)
- Criar `.github/workflows/ci.yml` para rodar lint e build
- Adicionar testes (Jest / React Testing Library / Supertest)
- Migrar dependências entre workspaces se quiser separar frontend/backend no mesmo monorepo

Se quiser, eu comito templates adicionais (CI, .env.example no backend, instruções de deploy) — diga quais prefere.
