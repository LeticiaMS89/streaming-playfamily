// ========================================
// SERVIDOR PLAYFAMILY - BACKEND
// ========================================
// API REST que fornece dados de filmes/séries e autentica usuários
// Executa na porta 3000 e se comunica com o frontend React
// Este servidor implementa o padrão RESTful com rotas GET e POST

// ========== IMPORTAÇÕES ==========

// Importa o Express, framework minimalista para criar servidores HTTP
// Express simplifica a criação de rotas, middlewares e respostas
const express = require("express");

// Importa o CORS (Cross-Origin Resource Sharing)
// Permite que o frontend (em http://localhost:5173) acesse as rotas do backend
// Sem CORS, o navegador bloquearia as requisições por segurança
const cors = require("cors");

// Importa a lista de filmes/séries/animes do arquivo de dados
const movies = require("./data/movies");

// ========== INICIALIZAÇÃO ==========

// Cria a aplicação Express
const app = express();

// ========== CONFIGURAÇÃO DE MIDDLEWARES ==========
// Middlewares são funções que processam requisições antes de chegar às rotas

// Habilita CORS: permite requisições do frontend
app.use(cors());

// Middleware que converte corpos de requisição JSON em objetos JavaScript
// Necessário para processar dados enviados pelo login (email e password)
app.use(express.json());

// ========== ROTAS DA API ==========

// ROTA 1: GET / (raiz)
// ============================================
// Acesso: http://localhost:3000/
// Método: GET
// Retorna: mensagem de boas-vindas (texto simples)
// Propósito: verificar se o servidor está funcionando
app.get("/", (req, res) => {
  res.send("API PlayFamily funcionando 🚀");
});

// ROTA 2: GET /movies
// ============================================
// Acesso: http://localhost:3000/movies
// Método: GET
// Parâmetros: nenhum
// Retorna: Array JSON com todos os filmes/séries/animes
// Propósito: carregar o catálogo completo no frontend
app.get("/movies", (req, res) => {
  // Retorna o array 'movies' em formato JSON
  res.json(movies);
});

// ROTA 3: GET /featured
// ============================================
// Acesso: http://localhost:3000/featured
// Método: GET
// Parâmetros: nenhum
// Retorna: um único objeto JSON (o filme em destaque)
// Propósito: obter o filme marcado como featured: true para exibir no banner
app.get("/featured", (req, res) => {
  // Procura o primeiro filme com a propriedade featured = true
  const featuredMovie = movies.find(
    (movie) => movie.featured === true
  );

  // Retorna o filme encontrado (ou null se não houver)
  res.json(featuredMovie);
});

// ROTA 4: GET /movies/:id
// ============================================
// Acesso: http://localhost:3000/movies/1, http://localhost:3000/movies/2, etc
// Método: GET
// Parâmetro: :id (número do filme na URL)
// Retorna: um único objeto JSON (o filme específico) ou erro 404
// Propósito: obter detalhes de um filme específico
app.get("/movies/:id", (req, res) => {
  // Extrai o parâmetro 'id' da URL e converte para número
  // req.params.id vem como string ("1", "2") e precisa ser número (1, 2)
  const id = Number(req.params.id);

  // Procura no array 'movies' por um filme com este id
  const movie = movies.find(
    (item) => item.id === id
  );

  // Se o filme não foi encontrado
  if (!movie) {
    // Retorna status HTTP 404 (Não Encontrado) com mensagem de erro
    return res.status(404).json({
      message: "Filme não encontrado"
    });
  }

  // Se encontrou o filme, retorna-o em JSON
  return res.json(movie);
});

// ROTA 5: POST /login
// ============================================
// Acesso: http://localhost:3000/login
// Método: POST (envia dados no corpo da requisição)
// Corpo esperado: { "email": "...", "password": "..." }
// Retorna: sucesso com dados do usuário ou erro 401
// Propósito: autenticar o usuário e liberar acesso ao catálogo
app.post("/login", (req, res) => {
  // Desestrutura email e password do corpo da requisição
  // O frontend envia: { email: "user@PlayFamily.com", password: "123456" }
  const { email, password } = req.body;

  // Valida as credenciais contra dados pré-definidos
  // Em uma aplicação real, isso consultaria um banco de dados com hash de senhas
  // Credenciais válidas: user@PlayFamily.com / 123456
  if (
    email === "user@PlayFamily.com" &&
    password === "123456"
  ) {
    // Login bem-sucedido
    // Retorna status 200 (padrão) com sucesso e dados do usuário
    return res.json({
      success: true,
      message: "Login realizado com sucesso",
      user: {
        name: "Usuário PlayFamily",
        email: email
      }
    });
  }

  // Login falhou: email ou senha incorretos
  // Retorna status HTTP 401 (Não Autorizado) com mensagem de erro
  return res.status(401).json({
    success: false,
    message: "Email ou senha inválidos"
  });
});

// ========== INICIAR O SERVIDOR ==========
// Inicia o servidor na porta 3000
// A porta 3000 é o padrão para APIs de desenvolvimento
app.listen(3000, () => {
  // Callback executado quando o servidor está pronto para receber requisições
  // Mostra mensagem no console do terminal
  console.log(
    "Servidor rodando em http://localhost:3000"
  );
});