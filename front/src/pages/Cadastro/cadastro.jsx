import React, { useState } from "react";
import "./cadastro.css";
import MockupLogin from '../../assets/images/img-login.svg'
import Logo from '../../assets/images/logo.svg'

const Cadastro = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // Adicione um estado para o sucesso para exibir mensagem (opcional)
  const [success, setSuccess] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(""); // Limpa mensagem de sucesso anterior

    try {
      // requisição POST para o backend
      const response = await fetch("http://localhost:8000/api/cadastro", { // 🛑 CORREÇÃO DA PORTA E ROTA
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, email, password }), // Envia 'email'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro no cadastro");
      }

      const data = await response.json();
      setSuccess(data.message || "Cadastro realizado com sucesso!");
      alert("Cadastro realizado com sucesso")
      
      // Opcional: Limpar campos após sucesso
      setUsuario("");
      setEmail("");
      setPassword("");

      // Redirecionar para login ou dashboard após sucesso
      window.location.href = "/login"; // Descomente para redirecionar
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cadastroBackground">
      <div className="logoEntrada">
        <img src={Logo} alt="logo de FilHub"/>
      </div>

      <div className="cadastroContainer">
      <div className="imagemCadastroContainer">
          <div className="escritoBoxCadastro">
            <h3>Seja <br />Bem-Vindo <br />ao <span>FilHub</span></h3>
          </div>
          <div className="imagemBoxCadastro">
            <img src={MockupLogin} alt="Mockup de notebook e celular com imagem do site" />
          </div>
        </div>

        <div className="cadastroBox">
          <h3>Faça aqui seu</h3>
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
            <label>Usuário:</label>
            <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                placeholder="Ex: isadoraabreu"
            />

            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ex: isa.linda@email.com"
            />

            <label>Senha:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ex: isalinda123"
            />

            {error && <p className="error" style={{color: 'red'}}>{error}</p>}
            {success && <p className="success" style={{color: 'green'}}>{success}</p>}

            <button type="submit">Cadastrar</button>

            <p className="loginTexto">
              Já tem uma conta? 
              <a href="/login">Faça login</a>
            </p>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
