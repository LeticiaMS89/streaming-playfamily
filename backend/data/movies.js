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
    profileIds: [1, 2, 5],
    title: "Dark",
    description: "Dark é uma complexa trama de mistério e ficção científica onde o desaparecimento de uma criança revela segredos sombrios de quatro famílias interligadas. A busca por respostas desbloqueia uma conspiração de viagens no tempo que conecta várias gerações em um ciclo temporal inevitável",
    mediaType: "serie",
    genres: ["suspense"],
    coverImage: "https://tse4.mm.bing.net/th/id/OIP.DDVsQMKfO45p7rXJGKbu9wHaLH?pid=Api&P=0&h=180",
    bannerImage: "https://tse2.mm.bing.net/th/id/OIP.J4nRbtZn33U-FDVdPPKrFAHaEK?pid=Api&P=0&h=180",
    trailerUrl: "https://www.youtube.com/watch?v=JCCssUOtn2E",
    featured: true
  },
    {
    id: 2,
    profileIds: [1, 2, 3, 5],
    title: "Stranger Things",
    description: "Stranger Things acompanha um grupo de amigos que, ao investigar o sumiço misterioso de um deles, descobre experimentos secretos do governo, uma garota com poderes telecinéticos e uma dimensão alternativa sombria habitada por monstros.",
    mediaType: "serie",
    genres: ["suspense", "acao"],
    coverImage: "https://tse1.mm.bing.net/th/id/OIP.whYKzWvW_OWccVEFgcWhwQHaKX?pid=Api&P=0&h=180",
    bannerImage: "https://tse2.mm.bing.net/th/id/OIP.J4nRbtZn33U-FDVdPPKrFAHaEK?pid=Api&P=0&h=180",
    trailerUrl: "https://www.youtube.com/watch?v=RMmGQNNl164",
    featured: false
  },
  {
    id: 3,
    profileIds: [1, 2, 5],
    title: "From",
    description: "From (Origem) acompanha os moradores de uma cidade misteriosa no interior dos Estados Unidos que prende todos que nela entram. Enquanto tentam manter a sanidade e buscar uma saída, eles precisam sobreviver a criaturas aterrorizantes que saem da floresta ao anoitecer.",
    mediaType: "serie",
    genres: ["suspense", "misterio", "terror"],
    coverImage: "https://tse3.mm.bing.net/th/id/OIP.vRZ0VJPEdhXSBaHF_6oFiAHaLH?pid=Api&P=0&h=180",
    bannerImage: "https://tse2.mm.bing.net/th/id/OIP.J4nRbtZn33U-FDVdPPKrFAHaEK?pid=Api&P=0&h=180",
    trailerUrl: "https://www.youtube.com/watch?v=sYXr3ZgyS2U",
    featured: false
  },
  // --- ANIME / ANIMAÇÃO ---
  {
    id: 5,
    profileIds: [1, 2, 3, 5],
    title: "Naruto",
    description: "Naruto conta a história de um jovem ninja órfão e rejeitado que sonha em se tornar o líder máximo de sua vila (Hokage). Através de muita determinação, laços de amizade e superação, ele luta para conquistar o respeito de todos e proteger o mundo ninja.",
    mediaType: "anime",
    genres: ["acao", "animacao"],
    coverImage: "https://tse2.mm.bing.net/th/id/OIP.r3FvvLaX-mzlpU3FVfsukQHaLH?pid=Api&P=0&h=180",
    bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/watch?v=7KoGSa4F3Xs",
    featured: false
  },
    // --- ANIME / ANIMAÇÃO ---
  {
    id: 6,
    profileIds: [1, 2, 3],
    title: "Dragon Ball Super",
    description: "Dragon Ball Super acompanha as novas e grandiosas batalhas de Goku e seus amigos contra divindades universais e guerreiros de outras dimensões. Buscando proteger a Terra, eles alcançam níveis de poder inéditos e participam de um torneio que define a sobrevivência de todo o multiverso.",
    mediaType: "anime",
    genres: ["acao", "animacao"],
    coverImage: "https://tse4.mm.bing.net/th/id/OIP.gQKw-ZqAfuiJHLekgj2nYQHaKe?pid=Api&P=0&h=180",
    bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/watch?v=JQtIATMIpu8",
    featured: false
  },
  // --- ANIME / ANIMAÇÃO ---
  {
    id: 2,
    profileIds: [1, 3, 4, 5, 6],
    title: "Demon Slayer",
    description: "Tanjiro Kamado luta contra demônios terríveis em uma jornada implacável para salvar sua irmã e vingar sua família.",
    mediaType: "anime",
    genres: ["acao", "animacao", "lancamentos"],
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=60",
    bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
    featured: false
  },
  // --- FILME ---
    {
    id: 4,
    profileIds: [2, 4],
    title: "Shrek",
    description: "Shrek é um ogro que vive em uma floresta, mas é forçado a deixar seu lar quando o rei põe um decreto proibindo todos os habitantes de sua terra.",
    mediaType: "filme",
    genres: ["fantasia", "aventura", "animacao"],
    coverImage: "https://tse1.mm.bing.net/th/id/OIP.Qapy56z-Rz0XxQ77VbjAiwHaLH?pid=Api&P=0&h=180",
    bannerImage: "https://tse4.mm.bing.net/th/id/OIP.75Roa8EqyDlHO2ChE0spZAHaEU?pid=Api&P=0&h=180",
    trailerUrl: "https://www.youtube.com/watch?v=4LT5Km2svpQ",
    featured: false
  },

  {
    id: 5,
    profileIds: [2],
    title: "Alice no País das Maravilhas",
    description: "Alice no País das Maravilhas acompanha uma jovem curiosa que cai em uma toca de coelho e vai parar em um mundo fantástico e absurdo. Lá, ela interage com criaturas excêntricas e desafia a tirania da Rainha de Copas para conseguir voltar para casa.",
    mediaType: "filme",
    genres: ["fantasia", "aventura"],
    coverImage: "https://tse2.mm.bing.net/th/id/OIP.wlnW01sj6EOvrY0j0z3-qwHaLG?pid=Api&P=0&h=180",
    bannerImage: "https://tse4.mm.bing.net/th/id/OIP.75Roa8EqyDlHO2ChE0spZAHaEU?pid=Api&P=0&h=180",
    trailerUrl: "https://www.youtube.com/watch?v=uJqMRLFezbo",
    featured: true
  },

  {
    id: 6,
    profileIds: [1, 2],
    title: "A Vida é Bela",
    description: "A Vida é Bela narra a emocionante história de um pai judeu que usa sua imaginação e bom humor para proteger o filho pequeno em um campo de concentração nazista. Ele transforma a terrível realidade em um jogo fictício para salvar a inocência e a vida do menino.",
    mediaType: "filme",
    genres: ["drama", "comedia", "classicos"],
    coverImage: "https://tse4.mm.bing.net/th/id/OIP.G5xaPNl82v0Pv44UBP5fiwAAAA?pid=Api&P=0&h=180",
    bannerImage: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1200&auto=format&fit=crop&q=60",
    trailerUrl: "https://www.youtube.com/watch?v=0dyP53zq0UQ",
    featured: false
  },
  {
    id: 7,
    profileIds: [1, 3, 4, 5, 6],
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
    profileIds: [1, 3, 4, 5, 6],
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
    profileIds: [1, 3, 4, 5, 6],
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
    profileIds: [1, 3, 4, 5, 6],
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
    profileIds: [1, 3, 4, 5, 6],
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
    profileIds: [1, 3, 4, 5, 6],
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
    profileIds: [1, 3, 4, 5, 6],
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