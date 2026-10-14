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
