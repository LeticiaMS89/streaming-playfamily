// ========================================
// SERVIDOR PLAYFAMILY - BACKEND 
// ========================================

// 1. Carrega as variáveis do arquivo .env ANTES de qualquer coisa
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const movies = require("./data/movies");

const app = express();

// Configurações de Ambiente
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "playfamily_chave_secreta_super_segura_2026";

// Middlewares
app.use(cors());
app.use(express.json());

// Normaliza o catálogo para garantir campos consistentes para o frontend
function normalizeCatalog(raw) {
  return raw.map((item, index) => {
    // Normaliza o tipo para: movie | series | anime
    const rawType = item.type || item.mediaType || item.media_type || "movie";
    let type = "movie";
    if (/serie|series|serie/i.test(rawType)) type = "series";
    if (/filme|movie/i.test(rawType)) type = "movie";
    if (/anime/i.test(rawType)) type = "anime";

    return {
      // Prioriza o ID real do banco de dados. Usa index + 1 apenas se não existir.
      id: item.id || index + 1, 
      
      // CRÍTICO: Mantém a regra de controle parental/perfis do PlayFamily
      profileIds: item.profileIds || [], 
      
      // títulos e descrições
      title: item.title || item.name || "Sem título",
      description: item.description || item.sinopse || "Sem descrição",
      
      // imagens (nomes diferentes no dataset original)
      posterUrl: item.coverImage || item.posterUrl || "",
      backdropUrl: item.bannerImage || item.backdropUrl || "",
      
      // tipo normalizado
      type,
      
      // gêneros como array
      genres: Array.isArray(item.genres) ? item.genres : (item.genres ? [item.genres] : []),
      
      // trailer, rating e ano (se existirem)
      trailerUrl: item.trailerUrl || "",
      rating: item.rating || item.points || null,
      year: item.year || item.releaseYear || null,
      seasons: item.seasons || null,
      featured: item.featured === true,
      
      // mantém dados originais para inspeção se necessário
      _raw: item,
    };
  });
}

const catalog = normalizeCatalog(movies);

// Rota de healthcheck simples (fora do namespace /api)
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "API PlayFamily rodando com sucesso! 🚀" });
});

// ========== ROTAS API (prefixo /api) ==========
app.get("/api/movies", (req, res) => {
  try {
    // possibilidade de filtrar por type ou genre via query params
    const { type, genre } = req.query;
    let result = catalog;

    if (type) {
      result = result.filter((m) => m.type === type);
    }
    if (genre) {
      result = result.filter((m) => m.genres.includes(genre));
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar catálogo de filmes." });
  }
});

app.get("/api/featured", (req, res) => {
  try {
    const featuredMovie = catalog.find((movie) => movie.featured === true) || catalog[0] || null;
    if (!featuredMovie) {
      return res.status(404).json({ message: "Nenhum filme em destaque encontrado." });
    }
    res.status(200).json(featuredMovie);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar filme em destaque." });
  }
});

app.get("/api/movies/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID do filme deve ser um número válido." });

    const movie = catalog.find((m) => m.id === id);
    if (!movie) return res.status(404).json({ message: "Filme não encontrado." });

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar detalhes do filme." });
  }
});

// Autenticação com geração de Token JWT
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    // Credencial simulada (em produção, consultar banco de dados com hash de senha)
    if (email === "user@playfamily.com" && password === "123456") {
      const user = {
        id: "usr_101",
        name: "Usuário PlayFamily",
        email: email,
      };

      // Geração do token JWT válido por 8 horas
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: "8h" });

      return res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        token,
        user,
      });
    }

    return res.status(401).json({ success: false, message: "Email ou senha inválidos" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor ao realizar login." });
  }
});

// Middleware que protege as rotas
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token não fornecido." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido ou expirado." });
    req.user = user;
    next();
  });
}

app.get("/api/auth/me", authenticateToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

// Middleware Global de Tratamento de Erros
app.use((err, req, res, next) => {
  console.error("Erro inesperado no servidor:", err && err.stack ? err.stack : err);
  res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
