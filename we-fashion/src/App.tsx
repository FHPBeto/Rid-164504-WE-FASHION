import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [listaAlunos, setListaAlunos] = useState<string[]>([]);

  // 1. Função para enviar os dados (SITE)
  const lidarComEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3001/inscrever', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      });
      if (resposta.ok) {
        alert("✨ Sucesso! A WE FASHION recebeu seu interesse.");
        setNome('');
        setEmail('');
      }
    } catch (erro) {
      alert("❌ Erro: Verifique se o servidor Node está ligado!");
    }
  };

  // 2. Função para entrar no ADMIN com SENHA
  const entrarNoAdmin = async () => {
    const senha = prompt("🔐 Digite a senha de administrador:");
    
    if (senha === "2244") {
      try {
        const resposta = await fetch('http://localhost:3001/admin/alunos');
        const dados = await resposta.json();
        setListaAlunos(dados);
        setIsAdmin(true);
      } catch (erro) {
        alert("❌ Erro ao buscar dados. O servidor está ligado?");
      }
    } else {
      alert("🚫 Senha incorreta!");
    }
  };

  // 3. TELA DE ADMIN (Se isAdmin for verdadeiro)
  if (isAdmin) {
    return (
      <div className="admin-container">
        <button className="botao-voltar" onClick={() => setIsAdmin(false)}>← Voltar ao Site</button>
        <div className="tabela-vidro">
          <h1>📋 Alunos Interessados</h1>
          <div className="lista">
            {listaAlunos.map((item, index) => (
              <div key={index} className="aluno-item">{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. TELA DO SITE (Padrão)
  return (
    <div className="projeto-total">
      <nav className="menu">
        <div className="logo">WE FASHION</div>
        <div className="links">
          <a href="#home">Início</a>
          <a href="#cursos">Cursos</a>
          <button className="botao-admin-acesso" onClick={entrarNoAdmin}>🔑 Admin</button>
        </div>
      </nav>

      <header className="banner">
        <h1>Moda & Costura Moderna</h1>
        <p>A arte de criar nunca sai de moda.</p>
      </header>

     <section id="cursos" className="conteudo">
      <h2>Nossos Cursos</h2>
      <div className="cartoes">
        <div className="cartao">
         <img src="http://googleusercontent.com/image_collection/image_retrieval/3944407853999468068_0" alt="Costura Criativa" className="imagem-curso" />
         <h3>Costura Criativa</h3>
         <p>Aprenda técnicas artesanais únicas.</p>
      </div>
      <div className="cartao">
        <img src="http://googleusercontent.com/image_collection/image_retrieval/6172420584094560823_0" alt="Corte e Costura" className="imagem-curso" />
        <h3>Corte e Costura</h3>
        <p>Domine a máquina e os moldes.</p>
      </div>
      <div className="cartao">
        <img src="http://googleusercontent.com/image_collection/image_retrieval/13861219419390047035_0" alt="Design de Moda" className="imagem-curso" />
        <h3>Design de Moda</h3>
        <p>Criação, croquis e tendências.</p>
       </div>
      </div>
     </section>

      <section className="contato">
        <form className="formulario" onSubmit={lidarComEnvio}>
          <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit">Enviar Interesse</button>
        </form>
      </section>
    </div>
  );
}

export default App;