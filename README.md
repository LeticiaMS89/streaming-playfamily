# 🎬 PlayFamily — Plataforma de Streaming Full Stack

Uma aplicação web full‑stack inspirada nas principais plataformas de streaming do mercado. O PlayFamily oferece autenticação via JWT, navegação por categorias, banners em destaque, fileiras/carrosséis de títulos e páginas de detalhes com informações completas. O objetivo do projeto é servir como base prática para aprender e demonstrar padrões de front-end reativos com React e back-end leve em Node.js/Express.

> Nota: Este projeto foi desenvolvido para fins didáticos, estudo prático de arquitetura Full Stack e composição de portfólio técnico.

---

## 🚀 Sumário

- Sobre
- Principais funcionalidades
- Arquitetura e tecnologias
- Estrutura do repositório
- Pré‑requisitos
- Instalação e execução (desenvolvimento e produção)
- Variáveis de ambiente
- Endpoints principais (API)
- Autenticação (fluxo JWT)
- Testes
- Deploy sugerido
- Boas práticas / Checklist de qualidade
- Contribuições
- Licença e contato

---

## ℹ️ Sobre

PlayFamily é um projeto educativo/portfolio que simula uma plataforma de streaming com foco em:

- Experiência do usuário (navegação, carrosséis, destaque).
- Boas práticas de organização de front-end (componentização, roteamento protegido).
- API REST simples com autenticação (JWT) para proteger rotas e gerenciar sessão.
- Código estruturado para facilitar deploy e evolução.

---

## ✨ Principais funcionalidades

- Autenticação: registro, login e rotas protegidas com JWT.
- Feed por categorias: Início, Séries, Filmes, Doramas, Realitys, Animes.
- Banner em destaque (Featured) com CTA para reprodução/detalhes.
- Fileiras (MovieRow): carrosséis horizontais com navegação por botões e suporte touch.
- Página de detalhes: sinopse, classificação, ano, trailer/preview.
- Layout responsivo com técnicas de CSS moderno (Flexbox, Grid, glassmorphism).
- Consumo de API com Fetch + AbortController para cancelamento seguro de requisições.
- Suporte básico a CORS no backend.

---

## 🏗 Arquitetura e Tecnologias

Frontend
- React 19 (Vite)
- React Router DOM v7
- CSS3 (Flexbox & Grid), design responsivo
- Fetch API, AbortController

Backend
- Node.js (>=18) + Express
- JSON Web Token (JWT) para autenticação
- CORS para integração entre front e back
- Armazenamento: (pode ser memória/JSON/localstore em dev — adapte para DB real se necessário)

Ferramentas
- npm
- Git

---

## 📁 Estrutura do repositório (exemplo)

- backend/           # servidor Express (API)
  - src/
    - controllers/
    - routes/
    - middlewares/
    - services/
  - package.json
- frontend/          # app React (Vite)
  - src/
    - components/
    - pages/
    - hooks/
    - services/      # chamadas à API
  - package.json
- README.md
- .gitignore

A estrutura real pode variar — o importante é manter separação clara entre client e server.

---

## ⚙️ Pré‑requisitos

- Node.js v18 ou superior
- npm (ou yarn)
- Git

---

## 🛠 Instalação e execução

1) Clone o repositório
```bash
git clone https://github.com/LeticiaMS89/streaming-playfamily.git
cd streaming-playfamily
```

2) Backend
```bash
cd backend
npm install
# Em desenvolvimento
npm run dev        # se houver (ex.: nodemon)
# Ou
npm start
```

3) Frontend
```bash
cd ../frontend
npm install
npm run dev        # inicia o Vite (modo desenvolvimento)
# Para gerar build de produção
npm run build
# Servir build estático (ex.: serve, vercel, netlify)
```

Observação: ajuste os scripts conforme os pacotes configurados em package.json.

---

## 🔐 Variáveis de ambiente (exemplos)

Backend (.env)
```
PORT=4000
JWT_SECRET=uma_chave_secreta_forte
JWT_EXPIRES_IN=7d
# Se usar DB
DATABASE_URL=...
```

Frontend (.env)
```
VITE_API_URL=http://localhost:4000/api
```

Não comite arquivos `.env` em repositórios públicos. Use secrets/variáveis do provedor no deploy.

---

## 📡 Endpoints principais (resumo)

Auth
- POST /api/auth/register — registro de usuário (nome, email, senha)
- POST /api/auth/login — login → retorna token JWT
- GET /api/auth/me — perfil do usuário (rota protegida)

Conteúdo (exemplo)
- GET /api/movies — lista de títulos (aceita query params: category, page)
- GET /api/movies/:id — detalhes do título
- GET /api/featured — item em destaque

Proteções: rotas que retornam dados pessoais ou exigem autenticação devem validar o JWT enviado no header Authorization: Bearer <token>.

---

## 🔁 Fluxo de autenticação (JWT) — Resumo

1. Usuário envia credenciais para /auth/login.
2. Backend valida credenciais e emite um token JWT assinado (contendo userId, roles, exp).
3. Frontend armazena token (recomendação: armazenar em memória ou cookies httpOnly; evitar localStorage em produção).
4. Requisições a rotas protegidas enviam header Authorization: Bearer <token>.
5. Backend valida token e garante acesso.

Boas práticas:
- Usar tokens curtos e refresh tokens quando necessário.
- Proteger cookies com httpOnly, secure e sameSite.

---

## ✅ Boas práticas e checklist de qualidade

- Tratar errors e retornar mensagens e códigos HTTP adequados (400/401/403/404/500).
- Validar entradas (ex.: express-validator / zod).
- Manter secrets fora do repositório.
- Testes unitários e E2E para fluxos críticos (login, exibição de conteúdo).
- Linting (ESLint) e formatação (Prettier).
- Types (TypeScript) podem aumentar robustez — considerar migração.

---

## 🚀 Deploy (sugestões)

Front-end
- Vercel / Netlify / Surge — hospedagem de SPA via build estático.

Back-end
- Railway / Render / Heroku / Fly.io — hospedar Node.js/Express.
- Se usar banco: provisionar banco (Postgres, MongoDB) e apontar DATABASE_URL.

CI/CD
- GitHub Actions para rodar lint, testes e build, e para deploy automático a partir de main.

---

## 🧪 Testes

- Adicione testes unitários para funções críticas (ex.: autenticação, serviços).
- Ferramentas: Jest + React Testing Library (frontend), Jest / Supertest (backend).
- Exemplo de script:
```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

---

## 🤝 Como contribuir

1. Fork o projeto
2. Crie uma branch com a feature ou fix: feature/nome-descritivo
3. Faça commits claros e atômicos
4. Abra um Pull Request descrevendo a mudança
5. Responda a comentários e ajuste conforme necessário

Sugestões de melhorias: adicionar banco de dados persistente, endpoints para avaliações, sistema de favoritos, paginação/filtragem avançada, testes E2E.

---

## 🧾 Licença

Este projeto está sob a licença MIT. A licença foi adicionada ao repositório para registrar uso acadêmico e didático do código.

---

## 📞 Contato

- Autor: LeticiaMS89
- Repositório: https://github.com/LeticiaMS89/streaming-playfamily

---

Obrigado por usar o PlayFamily como base para aprender e demonstrar habilidades full‑stack. Se quiser, eu posso:
- Atualizar (comitar) este README diretamente no repositório (preciso da confirmação do branch para commitar).
- Gerar um arquivo LICENSE (ex.: MIT).
- Criar templates de issues/PR ou um workflow de GitHub Actions para CI.
