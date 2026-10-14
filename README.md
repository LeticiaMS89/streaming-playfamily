# 🎬 PlayFamily — Plataforma de Streaming Full Stack

O **PlayFamily** é uma aplicação web full stack inspirada nas principais plataformas de streaming do mercado. O projeto conta com autenticação de usuários via JWT, navegação por categorias, banner em destaque, carrosséis horizontais interativos e páginas detalhadas para cada título.

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
- **React 19** (Vite)
- **React Router DOM v7** (Roteamento e Proteção de Rotas)
- **CSS3 / CSS Flexbox & Grid** (Layout Responsivo e Glassmorphism)
- **Fetch API & AbortController** (Consumo seguro e cancelamento de requisições)

### **Backend**
- **Node.js** & **Express**
- **JSON Web Token (JWT)** (Autenticação)
- **CORS** (Segurança na integração de APIs)

---

## 📌 Principais Funcionalidades

- 🔒 **Autenticação Segura:** Login funcional com validação de credenciais e rotas protegidas por JWT.
- 📺 **Categorização Completa:** Navegação no topo por *Início, Séries, Filmes, Doramas, Realitys e Animes*.
- 🌟 **Banner Principal (Featured):** Destaque visual dinamizado com informações completas e chamada para ação.
- 🎞️ **Fileiras Interativas (MovieRow):** Carrosséis horizontais com navegação por botões laterais ou touch.
- 📄 **Página de Detalhes:** Exibição detalhada de sinopse, avaliação, ano e opções de exibição.
- 📱 **Design Responsivo:** Interface otimizada para desktops, tablets e dispositivos móveis.

---

## 🛠️ Como Executar o Projeto

### **Pré-requisitos**
- Node.js instalado (versão 18 ou superior)
- Git para clonar o repositório

### **1. Configuração do Backend**
```bash
# Entre na pasta do servidor
cd backend

# Instale as dependências
npm install

# Inicie o servidor
npm start
