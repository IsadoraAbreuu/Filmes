import React, { useState } from "react";
import "./cadastro.css";
import MockupLogin from '../../assets/img-login.svg'

const Cadastro = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // requisição POST para o backend
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();

      // exemplo se o backend retornar um token JWT
      localStorage.setItem("token", data.token);

      alert("Login realizado com sucesso!");
      // redirecionar para outra página
      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cadastroBackground">
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
                type="usuario"
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

            {error && <p className="error">{error}</p>}

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
