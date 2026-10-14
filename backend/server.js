// ========================================
// SERVIDOR PLAYFAMILY - BACKEND (REFATORADO)
// ========================================

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const movies = require("./data/movies");

const app = express();

// Configurações de Ambiente
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "playfamily_chave_secreta_super_segura_2026";

// ========== MIDDLEWARES ==========
app.use(cors());
app.use(express.json());

// ========== ROTAS DA API ==========

// Rota de Healthcheck
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "API PlayFamily rodando com sucesso! 🚀" });
});

// Listar todos os filmes/séries/animes
app.get("/movies", (req, res) => {
  try {
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar catálogo de filmes." });
  }
});

// Obter filme em destaque (Banner)
app.get("/featured", (req, res) => {
  try {
    const featuredMovie = movies.find((movie) => movie.featured === true);
    if (!featuredMovie) {
      return res.status(404).json({ message: "Nenhum filme em destaque encontrado." });
    }
    res.status(200).json(featuredMovie);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar filme em destaque." });
  }
});

// Obter detalhes de um filme específico por ID
app.get("/movies/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID do filme deve ser um número válido." });
    }

    const movie = movies.find((item) => item.id === id);

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado." });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar detalhes do filme." });
  }
});

// Autenticação com geração de Token JWT
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    // Credencial simulada (em produção, consultar banco de dados com hash de senha)
    if (email === "user@PlayFamily.com" && password === "123456") {
      const user = {
        id: "usr_101",
        name: "Usuário PlayFamily",
        email: email
      };

      // Geração do token JWT válido por 8 horas
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "8h" });

      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        token,
        user
      });
    }

    return res.status(401).json({
      success: false,
      message: "Email ou senha inválidos"
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor ao realizar login." });
  }
});

// Middleware Global de Tratamento de Erros
app.use((err, req, res, next) => {
  console.error("Erro inesperado no servidor:", err.stack);
  res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
});

// ========== INICIAR O SERVIDOR ==========
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
