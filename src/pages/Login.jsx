// ========================================
// PÁGINA: LOGIN E SELEÇÃO DE PERFIL
// ========================================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // ========== ESTADOS DO FORMULÁRIO DE LOGIN ==========
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState(''); 
  const [erro, setErro] = useState(''); 
  const [mostrarPerfis, setMostrarPerfis] = useState(false); 
  
  // ========== ESTADOS DE GERENCIAMENTO DE PERFIS ==========
  const [perfis, setPerfis] = useState([]); 
  const [novoNome, setNovoNome] = useState(''); 
  const [criandoPerfil, setCriandoPerfil] = useState(false); 

  const navigate = useNavigate();

  // ========== CARREGAMENTO INICIAL DE PERFIS ==========
  useEffect(() => {
    const perfisSalvos = localStorage.getItem('PlayFamily_perfis');
    
    if (perfisSalvos) {
      setPerfis(JSON.parse(perfisSalvos));
    } else {
      const perfisIniciais = [
        { id: 1, nome: "Leticia", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Leticia" },
        { id: 2, nome: "Nathy", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Nathy" },
        { id: 3, nome: "Pablo", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Pablo" },
        { id: 4, nome: "Eloise", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Eloise" },
        { id: 5, nome: "Malu", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Malu" },
        { id: 6, nome: "Lorena", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Lorena" },
      ];
      setPerfis(perfisIniciais);
      localStorage.setItem('PlayFamily_perfis', JSON.stringify(perfisIniciais));
    }
  }, []);

  // ========== FUNÇÃO DE LOGIN ==========
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setErro(''); 

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          email: email,
          password: senha 
        })
      });

      const data = await response.json();

      if (data.success === true) {
        setMostrarPerfis(true); 
      } else {
        setErro(data.message);
      }

    } catch (error) {
      setErro("Erro ao conectar com o backend. Verifique se o servidor está rodando.");
      console.error("Erro na requisição de login:", error);
    }
  };

  // ========== FUNÇÃO DE ADICIONAR NOVO PERFIL ==========
  const adicionarPerfil = () => {
    if (!novoNome.trim()) return;
    
    const novoPerfil = {
      id: Date.now(), 
      nome: novoNome,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${novoNome}`
    };
    
    const listaAtualizada = [...perfis, novoPerfil];
    setPerfis(listaAtualizada);
    localStorage.setItem('PlayFamily_perfis', JSON.stringify(listaAtualizada));
    
    setNovoNome('');
    setCriandoPerfil(false);
  };

  // ========== FUNÇÃO DE SELEÇÃO DE PERFIL ==========
  const selecionarPerfil = (perfil) => {
    localStorage.setItem('perfilSelecionadoId', perfil.id);
    localStorage.setItem('perfilSelecionadoNome', perfil.nome);
    navigate('/home');
  };

  // ========== RENDERIZAÇÃO: TELA DE SELEÇÃO DE PERFIS ==========
  if (mostrarPerfis) {
    return (
      <div style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif', padding: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', fontWeight: 'normal' }}>Quem está assistindo?</h1>
        
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
          {perfis.map((perfil) => (
            <div key={perfil.id} onClick={() => selecionarPerfil(perfil)} style={{ textAlign: 'center', cursor: 'pointer', width: '120px' }}>
              <img 
                src={perfil.avatar} 
                alt={perfil.nome} 
                style={{ width: '100px', height: '100px', backgroundColor: '#222', borderRadius: '8px', border: '3px solid transparent', display: 'block', margin: '0 auto 10px auto', transition: '0.2s' }} 
                onMouseEnter={(e) => e.target.style.borderColor = '#fff'} 
                onMouseLeave={(e) => e.target.style.borderColor = 'transparent'} 
              />
              <span style={{ color: '#aaa', fontSize: '1rem' }}>{perfil.nome}</span>
            </div>
          ))}

          <div style={{ textAlign: 'center', width: '120px' }}>
            {!criandoPerfil ? (
              <div onClick={() => setCriandoPerfil(true)} style={{ width: '100px', height: '100px', backgroundColor: '#333', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', cursor: 'pointer', color: '#666', margin: '0 auto 10px auto' }}>+</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <input type="text" placeholder="Nome" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} style={{ width: '90px', padding: '5px', borderRadius: '4px', border: 'none' }} />
                <button onClick={adicionarPerfil} style={{ backgroundColor: '#E50914', color: '#fff', border: 'none', padding: '3px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Salvar</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ========== RENDERIZAÇÃO: TELA DE FORMULÁRIO DE LOGIN ==========
  return (
    <div style={{ backgroundColor: '#111', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#E50914', fontSize: '3rem', marginBottom: '20px' }}>PlayFamily</h1>
      
      <form onSubmit={handleLogin} style={{ backgroundColor: '#222', padding: '40px', borderRadius: '8px', width: '300px' }}>
        <h2>Entrar</h2>
        
        {erro && <p style={{ color: '#E50914', fontSize: '0.9rem', marginBottom: '10px' }}>{erro}</p>}
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ display: 'block', margin: '15px 0', padding: '12px', width: '92%', backgroundColor: '#333', border: 'none', color: '#fff', borderRadius: '4px' }} 
        />
        
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          style={{ display: 'block', margin: '15px 0', padding: '12px', width: '92%', backgroundColor: '#333', border: 'none', color: '#fff', borderRadius: '4px' }} 
        />
        
        <button type="submit" style={{ backgroundColor: '#E50914', color: '#fff', border: 'none', padding: '12px', width: '100%', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>Entrar</button>
        
        <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '15px', textAlign: 'center' }}>
          Use: user@PlayFamily.com / 123456
        </p>
      </form>
    </div>
  );
}

export default Login;