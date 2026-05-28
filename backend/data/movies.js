// ========================================
// BASE DE DADOS: CATÁLOGO DE FILMES/SÉRIES/ANIMES
// ========================================
// Este arquivo contém a lista estática de todos os filmes, séries e animes
// disponíveis na plataforma PlayFamily
// Estrutura: Array de objetos, cada um representando uma mídia

// ========== MAPEAMENTO DE PERFIS DE USUÁRIOS ==========
// Cada perfil tem um ID único que controla qual conteúdo pode ver
// ID 1: Leticia
// ID 2: Nathy
// ID 3: Pablo
// ID 4: Eloise
// ID 5: Malu
// ID 6: Lorena
// ID > 6: Perfis criados dinamicamente pelo usuário

const movies = [
  // --- SCI-FI / SUSPENSE / LANÇAMENTOS ---
  {
    id: 1,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "Mr. Robot",
    description: "Um jovem engenheiro de segurança cibernética de dia e hacker vigilante à noite se vê no meio de uma conspiração global.",
    mediaType: "serie",
    genres: ["suspense", "lancamentos"],
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/nJvZV648W18",
    featured: true
  },
  {
    id: 4,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "Interestelar",
    description: "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço para tentar garantir a sobrevivência da humanidade.",
    mediaType: "filme",
    genres: ["ficcao cientifica", "classicos"],
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
    featured: false
  },

  // --- ANIME / ANIMAÇÃO ---
  {
    id: 2,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "Demon Slayer",
    description: "Tanjiro Kamado luta contra demônios terríveis em uma jornada implacável para salvar sua irmã e vingar sua família.",
    mediaType: "anime",
    genres: ["acao", "animacao", "lancamentos"],
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
    featured: false
  },
  {
    id: 5,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "Cyberpunk: Edgerunners",
    description: "Um garoto de rua tentando sobreviver em uma cidade do futuro obcecada por tecnologia e modificação corporal se torna um mercenário fora da lei.",
    mediaType: "anime",
    genres: ["acao", "ficcao cientifica", "lancamentos"],
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/JtqIas3bYhg",
    featured: false
  },

  // --- TERROR ---
  {
    id: 6,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "O Despertar da Floresta",
    description: "Um grupo de amigos isolado em uma cabana remota descobre um diário antigo que liberta forças demoníacas implacáveis.",
    mediaType: "filme",
    genres: ["terror", "suspense"],
    coverImage: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/kRkS8A7I-r8",
    featured: false
  },
  {
    id: 7,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "Arquivos do Além",
    description: "Investigadores paranormais encaram o caso mais aterrorizante de suas vidas ao tentar limpar uma residência assombrada por um espírito secular.",
    mediaType: "serie",
    genres: ["terror", "lancamentos"],
    coverImage: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/g6EwN_S9N0M",
    featured: false
  },

  // --- COMÉDIA ---
  {
    id: 8,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "De Volta ao Jogo",
    description: "Dois amigos fracassados planejam o golpe perfeito para mudar de vida, mas tudo o que conseguem é se meter em confusões hilárias com a máfia.",
    mediaType: "filme",
    genres: ["comedia", "acao"],
    coverImage: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/WN_g772v3G8",
    featured: false
  },
  {
    id: 9,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "TI: Emergência de Risos",
    description: "O dia a dia caótico e cômico de uma equipe de suporte de tecnologia lidando com os usuários mais bizarros da empresa.",
    mediaType: "serie",
    genres: ["comedia", "lancamentos"],
    coverImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/NZaXfbeasXU",
    featured: false
  },

  // --- ROMANCE ---
  {
    id: 10,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "Conexões Cruzadas",
    description: "Dois desenvolvedores de cidades diferentes começam a colaborar em um código de código aberto e acabam encontrando uma paixão inesperada.",
    mediaType: "filme",
    genres: ["romance", "lancamentos"],
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/3U8q0gV8O3U",
    featured: false
  },
  {
    id: 11,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "Amor em Linhas de Código",
    description: "Uma história emocionante de encontros e desencontros na era digital, mostrando que o amor verdadeiro não segue algoritmos.",
    mediaType: "serie",
    genres: ["romance", "classicos"],
    coverImage: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/7V8bXy0eF1Q",
    featured: false
  },

  // --- BIOGRÁFICOS / DOCUMENTÁRIOS ---
  {
    id: 3,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "O Dilema das Redes",
    description: "Especialistas e profissionais do Vale do Silício alertam sobre o impacto humano assustador das redes sociais nas democracias e nos indivíduos.",
    mediaType: "documentario",
    genres: ["biografico", "suspense", "classicos"],
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/uaaC57tcci0",
    featured: false
  },
  {
    id: 12,
    profileIds: [1, 2, 3, 4, 5, 6],
    title: "Ada Lovelace: A Primeira",
    description: "A fascinante cinebiografia de Ada Lovelace, a matemática do século XIX que enxergou o potencial das máquinas e escreveu o primeiro algoritmo de computador da história.",
    mediaType: "filme",
    genres: ["biografico", "classicos"],
    coverImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/1K3m6Lwfv9U",
    featured: false
  }
];

module.exports = movies;