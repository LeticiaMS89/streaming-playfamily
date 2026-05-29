// ========================================
// PÁGINA: LOGIN E SELEÇÃO DE PERFIL
// ========================================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarPerfis, setMostrarPerfis] = useState(false);

  const [perfis, setPerfis] = useState([]);
  const [perfilEditando, setPerfilEditando] = useState(null);
  const [perfilForm, setPerfilForm] = useState({
    id: null,
    nome: '',
    tipoInputAvatar: 'link',
    avatarLink: '',
    avatarArquivo: ''
  });
  const [criandoPerfil, setCriandoPerfil] = useState(false);

  const navigate = useNavigate();

  const perfisIniciais = [
    { id: 1, nome: 'Leticia', avatar: '/perfis/Leticia.jpeg' },
    { id: 2, nome: 'Nathy', avatar: '/perfis/Nathy.jpeg' },
    { id: 3, nome: 'Pablo', avatar: '/perfis/Pablo.jpeg' },
    { id: 4, nome: 'Eloise', avatar: '/perfis/Eloise.jpeg' },
    { id: 5, nome: 'Malu', avatar: '/perfis/Malu.jpeg' },
    { id: 6, nome: 'Lorena', avatar: '/perfis/Lorena.jpeg' }
  ];

  useEffect(() => {
    const perfisSalvos = localStorage.getItem('PlayFamily_perfis');
    const lista = perfisSalvos ? JSON.parse(perfisSalvos) : perfisIniciais;
    const listaFiltrada = lista.filter((perfil) => {
      const nome = String(perfil.nome || '').toLowerCase();
      return nome !== 'yrt';
    });
    setPerfis(listaFiltrada);
    localStorage.setItem('PlayFamily_perfis', JSON.stringify(listaFiltrada));
  }, []);

  const salvarPerfis = (novaLista) => {
    setPerfis(novaLista);
    localStorage.setItem('PlayFamily_perfis', JSON.stringify(novaLista));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha })
      });
      const data = await response.json();

      if (data.success === true) {
        setMostrarPerfis(true);
      } else {
        setErro(data.message);
      }
    } catch (error) {
      setErro('Erro ao conectar com o backend. Verifique se o servidor está rodando.');
      console.error('Erro na requisição de login:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPerfilForm((prev) => ({ ...prev, avatarArquivo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const abrirFormularioPerfil = (perfil = null) => {
    if (perfil) {
      setPerfilEditando(perfil.id);
      setPerfilForm({
        id: perfil.id,
        nome: perfil.nome,
        tipoInputAvatar: perfil.avatar && perfil.avatar.startsWith('data:') ? 'arquivo' : 'link',
        avatarLink: perfil.avatar && !perfil.avatar.startsWith('data:') ? perfil.avatar : '',
        avatarArquivo: perfil.avatar && perfil.avatar.startsWith('data:') ? perfil.avatar : ''
      });
    } else {
      setPerfilEditando(null);
      setPerfilForm({ id: null, nome: '', tipoInputAvatar: 'link', avatarLink: '', avatarArquivo: '' });
    }
    setCriandoPerfil(true);
  };

  const fecharFormularioPerfil = () => {
    setCriandoPerfil(false);
    setPerfilEditando(null);
    setPerfilForm({ id: null, nome: '', tipoInputAvatar: 'link', avatarLink: '', avatarArquivo: '' });
  };

  const salvarPerfil = () => {
    const nomeTrim = perfilForm.nome.trim();
    if (!nomeTrim) return;

    let avatarFinal = '';
    if (perfilForm.tipoInputAvatar === 'link' && perfilForm.avatarLink.trim()) {
      avatarFinal = perfilForm.avatarLink.trim();
    } else if (perfilForm.tipoInputAvatar === 'arquivo' && perfilForm.avatarArquivo) {
      avatarFinal = perfilForm.avatarArquivo;
    } else {
      avatarFinal = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(nomeTrim)}`;
    }

    const perfilSalvo = {
      id: perfilForm.id || Date.now(),
      nome: nomeTrim,
      avatar: avatarFinal
    };

    const novaLista = perfilForm.id
      ? perfis.map((perfil) => (perfil.id === perfilForm.id ? perfilSalvo : perfil))
      : [...perfis, perfilSalvo];

    salvarPerfis(novaLista);
    fecharFormularioPerfil();
  };

  const excluirPerfil = (id) => {
    const novaLista = perfis.filter((perfil) => perfil.id !== id);
    salvarPerfis(novaLista);
  };

  const selecionarPerfil = (perfil) => {
    localStorage.setItem('perfilSelecionadoId', perfil.id);
    localStorage.setItem('perfilSelecionadoNome', perfil.nome);
    localStorage.setItem('perfilSelecionadoAvatar', perfil.avatar || '');
    navigate('/home');
  };

  if (mostrarPerfis) {
    return (
      <div style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif', padding: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', fontWeight: 'normal' }}>Quem está assistindo?</h1>

        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '900px' }}>
          {perfis.map((perfil) => (
            <div key={perfil.id} style={{ width: '140px', textAlign: 'center' }}>
              <div
                onClick={() => selecionarPerfil(perfil)}
                style={{ cursor: 'pointer', marginBottom: '12px' }}
              >
                <img
                  src={perfil.avatar}
                  alt={perfil.nome}
                  style={{ width: '140px', height: '140px', backgroundColor: '#222', borderRadius: '16px', display: 'block', margin: '0 auto', objectFit: 'cover', border: '3px solid transparent', transition: 'border-color 0.2s' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(perfil.nome)}`;
                  }}
                />
              </div>

              <span style={{ color: '#ddd', fontSize: '1rem', display: 'block', marginBottom: '8px' }}>{perfil.nome}</span>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => abrirFormularioPerfil(perfil)}
                  style={{ backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => excluirPerfil(perfil.id)}
                  style={{ backgroundColor: '#770000', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}

          <div style={{ width: '140px', textAlign: 'center' }}>
            {!criandoPerfil ? (
              <button
                type="button"
                onClick={() => abrirFormularioPerfil()}
                style={{ width: '140px', height: '140px', borderRadius: '16px', backgroundColor: '#222', color: '#888', border: '2px dashed #555', cursor: 'pointer', fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                +
              </button>
            ) : null}
          </div>
        </div>

        {criandoPerfil && (
          <div style={{ marginTop: '30px', width: '360px', backgroundColor: '#181818', padding: '20px', borderRadius: '14px', border: '1px solid #333' }}>
            <h2 style={{ margin: '0 0 16px 0', color: '#fff' }}>{perfilEditando ? 'Editar Perfil' : 'Adicionar Perfil'}</h2>

            <label style={{ display: 'block', marginBottom: '10px', color: '#bbb', fontSize: '0.9rem' }}>
              Nome
              <input
                type="text"
                value={perfilForm.nome}
                onChange={(e) => setPerfilForm((prev) => ({ ...prev, nome: e.target.value }))}
                style={{ width: '100%', marginTop: '6px', padding: '10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#111', color: '#fff' }}
              />
            </label>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <label style={{ color: '#bbb', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="tipoAvatar"
                  checked={perfilForm.tipoInputAvatar === 'link'}
                  onChange={() => setPerfilForm((prev) => ({ ...prev, tipoInputAvatar: 'link' }))}
                  style={{ marginRight: '6px' }}
                />
                Link
              </label>
              <label style={{ color: '#bbb', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="tipoAvatar"
                  checked={perfilForm.tipoInputAvatar === 'arquivo'}
                  onChange={() => setPerfilForm((prev) => ({ ...prev, tipoInputAvatar: 'arquivo' }))}
                  style={{ marginRight: '6px' }}
                />
                Arquivo
              </label>
            </div>

            {perfilForm.tipoInputAvatar === 'link' ? (
              <label style={{ display: 'block', marginBottom: '12px', color: '#bbb', fontSize: '0.9rem' }}>
                URL ou caminho local
                <input
                  type="text"
                  value={perfilForm.avatarLink}
                  onChange={(e) => setPerfilForm((prev) => ({ ...prev, avatarLink: e.target.value }))}
                  placeholder="Ex: /perfis/foto.jpg ou https://..."
                  style={{ width: '100%', marginTop: '6px', padding: '10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#111', color: '#fff' }}
                />
              </label>
            ) : (
              <label style={{ display: 'block', marginBottom: '12px', color: '#bbb', fontSize: '0.9rem' }}>
                Selecionar arquivo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ width: '100%', marginTop: '6px', color: '#fff' }}
                />
              </label>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={salvarPerfil}
                style={{ flex: 1, backgroundColor: '#E50914', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={fecharFormularioPerfil}
                style={{ flex: 1, backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

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