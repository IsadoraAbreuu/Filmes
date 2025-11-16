import React, { useState } from "react";
import "./login.css";
import Logo from '../../assets/images/logo.svg'
import MockupLogin from '../../assets/images/img-login.svg'

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // requisição POST para o backend
      const response = await fetch("http://localhost:8000/api/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Usa a mensagem de erro do backend se disponível
        throw new Error(errorData.message || "Credenciais inválidas"); 
      }

      const data = await response.json();

      //guarda o token, o nivel de acesso (role) e nome do usuario no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userName", data.usuario); 

      alert("Login realizado com sucesso!");
      // redirecionar para dashboard
      window.location.href = "/home";

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="loginBackground">
      <div className="logoEntrada">
        <img src={Logo} alt="logo de FilHub"/>
      </div>

      <div className="loginContainer">
        <div className="loginBox">
          <h3>Faça aqui seu</h3>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            <label>Usuário:</label>
            <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                placeholder="Ex: isadoraabreu"
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
            <button type="submit">Entrar</button>

            <p className="cadastroTexto">
              Ainda não possui uma conta? 
              <a href="/cadastro">Cadastre-se</a>
            </p>
            </form>
        </div>

        <div className="imagemLoginContainer">
          <div className="escritoBoxLogin">
            <h3>Seja <br />Bem-Vindo <br />ao <span>FilHub</span></h3>
          </div>
          <div className="imagemBoxLogin">
            <img src={MockupLogin} alt="Mockup de notebook e celular com imagem do site" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
