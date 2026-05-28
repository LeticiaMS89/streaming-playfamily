// ========================================
// BASE DE DADOS: FILMES E SÉRIES
// ========================================
// Arquivo que contém a lista de todos os filmes/séries/animes disponíveis
// Cada filme possui: id, profileIds, título, descrição, tipo, gêneros, imagens e link do trailer

// MAPEAMENTO DE PERFIS (IDs dos usuários):
// 1: Leticia, 2: Nathy, 3: Pablo, 4: Eloise, 5: Malu, 6: Lorena

const movies = [
  // ========== FILME 1: MR. ROBOT ==========
  {
    id: 1,
    profileIds: [1, 3], // Visível apenas para: Leticia e Pablo
    title: "Mr. Robot",
    description: "Um jovem programador que trabalha como engenheiro de segurança cibernética de dia e como hacker vigilante à noite.",
    mediaType: "serie", // Tipo: série
    genres: ["suspense", "lancamentos"], // Categorias
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=60", // Imagem pequena (card)
    bannerImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=60", // Imagem grande (destaque)
    trailerUrl: "https://www.youtube.com/embed/nJvZV648W18", // URL do trailer no YouTube (formato embed)
    featured: true // Marca como destaque na tela de início
  },

  // ========== FILME 2: DEMON SLAYER ==========
  {
    id: 2,
    profileIds: [1, 2, 4], // Visível para: Leticia, Nathy e Eloise
    title: "Demon Slayer",
    description: "Tanjirou Kamado luta contra demônios para salvar sua irmã e vingar sua família.",
    mediaType: "anime", // Tipo: anime
    genres: ["acao", "animacao", "lancamentos"],
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
    featured: true
  },

  // ========== FILME 3: O DILEMA DAS REDES ==========
  {
    id: 3,
    profileIds: [5, 6], // Visível para: Malu e Lorena
    title: "O Dilema das Redes",
    description: "Especialistas em tecnologia e profissionais da área alertam sobre o impacto humano das redes sociais nas democracias e indivíduos.",
    mediaType: "documentario", // Tipo: documentário
    genres: ["suspense", "classicos"],
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/uaaC57tcci0",
    featured: true
  },

  // ========== FILME 4: INTERESTELAR ==========
  {
    id: 4,
    profileIds: [2, 3, 6], // Visível para: Nathy, Pablo e Lorena
    title: "Interestelar",
    description: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.",
    mediaType: "filme", // Tipo: filme
    genres: ["ficcao cientifica", "classicos", "drama"], // Múltiplos gêneros
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
    featured: false // Não é destaque
  }
];

// ========== EXPORTAÇÃO ==========
// Exporta a lista de filmes para ser usada em outros arquivos (padrão CommonJS do Node.js)
module.exports = movies;