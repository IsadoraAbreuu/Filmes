import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="loginBackground">
        <div className="loginContainer">
            <div className="loginBox">
              <h3>Faça aqui seu</h3>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                <label>Usuário:</label>
                <input
                    type="usuario"
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

                {error && <p className="error">{error}</p>}

                <button type="submit">Entrar</button>

                <p className="cadastroTexto">
                  Ainda não possui uma conta? 
                  <a href="/cadastro">Cadastre-se</a>
                </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
