# 🎬 PlayFamily

O **PlayFamily** é uma aplicação web moderna voltada para o gerenciamento ou streaming de conteúdo de mídia familiar. Desenvolvido com uma arquitetura que separa as responsabilidades entre o front-end (interface interativa e responsiva) e o back-end (servidor para processamento de dados e APIs), o projeto oferece uma experiência fluida, rápida e padronizada.

---

## 🛠️ Ferramentas, Tecnologias e Linguagens

O projeto foi construído utilizando o que há de mais moderno no ecossistema JavaScript para garantir alta performance no desenvolvimento e na execução.

### 🌐 Linguagens de Programação e Marcação
* **JavaScript (ES6+)**: Linguagem principal utilizada tanto para a lógica dos componentes do React quanto para o desenvolvimento das APIs e rotas no servidor Node.js.
* **HTML5**: Estrutura base da aplicação utilizada para a renderização e marcação dos elementos semânticos.
* **CSS3**: Utilizado para a estilização, criação de layouts responsivos e design visual da interface do usuário.

### 💻 Front-end (Interface do Usuário)
* **React 19**: Biblioteca para a construção de interfaces de usuário modulares, reativas e baseadas em componentes.
* **Vite**: Ferramenta de build de última geração que oferece um servidor de desenvolvimento ultra veloz com Hot Module Replacement (HMR).
* **React Router DOM v7**: Biblioteca para o gerenciamento de rotas e navegação interna, permitindo o comportamento de Single Page Application (SPA).

### ⚙️ Back-end (Ambiente do Servidor)
* **Node.js**: Ambiente de execução que permite rodar código JavaScript no lado do servidor.
* **Express**: Framework minimalista e flexível utilizado para estruturar e gerenciar rotas, requisições HTTP e a criação de APIs REST.
* **CORS (Cross-Origin Resource Sharing)**: Middleware de segurança configurado para permitir que o front-end consuma os recursos do back-end com segurança.

### 🔧 Ferramentas de Desenvolvimento e Produtividade
* **Git & GitHub**: Sistema de controle de versão distribuído e plataforma de hospedagem para gerenciamento do código-fonte.
* **Visual Studio Code (VS Code)**: Editor de código-fonte principal adotado no desenvolvimento do projeto.
* **ESLint**: Ferramenta de análise estática (Linter) para identificar problemas, prevenir bugs e garantir a padronização na escrita do código.
* **Nodemon**: Utilitário que monitora as alterações nos arquivos do back-end e reinicia o servidor Express automaticamente durante o desenvolvimento.

---

## 📂 Estrutura de Arquivos Chave

Abaixo estão os principais arquivos de configuração que guiam a arquitetura da aplicação:

* `index.html`: Ponto de entrada do front-end carregado pelo navegador.
* `src/main.jsx`: Arquivo principal que inicializa e renderiza a árvore de componentes do React.
* `vite.config.js`: Configurações de compilação, otimização e plugins do Vite.
* `eslint.config.js`: Definição das regras de padronização estética e boas práticas do código.
* `package.json`: Manifesto do projeto que gerencia as dependências utilizadas e os scripts de execução.

---

## 🔧 Como Instalar e Executar o Projeto

Certifique-se de possuir o **Node.js** (versão 18 ou superior) e o **npm** instalados em sua máquina antes de prosseguir.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/LeticiaMS89/streaming-playfamily.git](https://github.com/LeticiaMS89/streaming-playfamily.git)
cd streaming-playfamily
```
### 2. Instalar as Dependências
Instale todos os pacotes necessários listados no gerenciador de pacotes:

```bash
npm install
```
### 3. Executar em Ambiente de Desenvolvimento
Para iniciar o Front-end (Vite):

```bash
  npm run dev
```
O terminal exibirá um endereço local semelhante a http://localhost:5173/ para acessar no navegador.

* Para validar o código com o Linter:

```bash
  npm run lint
```
---
## 👤 Autora

Desenvolvido por Leticia Moreira Silva 🚀 

Se você quiser conversar sobre desenvolvimento de software ou trocar experiências técnicas, sinta-se à vontade para se conectar comigo!

LinkedIn: https://www.linkedin.com/in/ltc-moreira-silva
