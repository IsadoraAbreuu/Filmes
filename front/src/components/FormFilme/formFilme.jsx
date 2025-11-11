import React, { useState, useEffect } from "react";
import "./formFilme.css";

const FormFilme = ({ modo = "add", filmeInicial = {}, onSubmit }) => {
  // estados do formulário
  const [titulo, setTitulo] = useState(filmeInicial.titulo || "");
  const [avaliacao, setAvaliacao] = useState(filmeInicial.avaliacao || "");
  const [duracao, setDuracao] = useState(filmeInicial.duracao || "");
  const [ano, setAno] = useState(filmeInicial.ano || "");
  const [descricao, setDescricao] = useState(filmeInicial.descricao || "");
  const [generosSelecionados, setGenerosSelecionados] = useState(filmeInicial.generos || []);
  const [poster, setPoster] = useState(filmeInicial.poster || "");
  const [atoresSelecionados, setAtoresSelecionados] = useState(filmeInicial.atores || []);
  const [diretoresSelecionados, setDiretoresSelecionados] = useState(filmeInicial.diretores || []);

  // estados auxiliares
  const [generos, setGeneros] = useState([]);
  const [atores, setAtores] = useState([]);
  const [diretores, setDiretores] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // buscar opções de dropdowns no backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resGeneros, resAtores, resDiretores] = await Promise.all([
          fetch("http://localhost:3001/api/generos"),
          fetch("http://localhost:3001/api/atores"),
          fetch("http://localhost:3001/api/diretores"),
        ]);

        const generosData = await resGeneros.json();
        const atoresData = await resAtores.json();
        const diretoresData = await resDiretores.json();

        setGeneros(generosData);
        setAtores(atoresData);
        setDiretores(diretoresData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar opções do banco");
      }
    };

    fetchData();
  }, []);

  // submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const filmeData = {
      titulo,
      avaliacao,
      descricao,
      generos: generosSelecionados,
      ano,
      duracao,
      poster,
      atores: atoresSelecionados,
      diretores: diretoresSelecionados,
    };

    try {
      const url =
        modo === "edit"
          ? `http://localhost:3001/api/filmes/${filmeInicial._id}`
          : "http://localhost:3001/api/filmes";

      const method = modo === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(filmeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao salvar o filme");
      }

      const data = await response.json();
      setSuccess(modo === "edit" ? "Filme atualizado com sucesso!" : "Filme cadastrado com sucesso!");

      if (onSubmit) onSubmit(data);

      // Limpar campos apenas no modo "add"
      if (modo === "add") {
        setTitulo("");
        setAvaliacao("");
        setDuracao("");
        setAno("");
        setDescricao("");
        setGenerosSelecionados([]);
        setPoster("");
        setAtoresSelecionados([]);
        setDiretoresSelecionados([]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <div className="conteudoCadastrarFilme">
        <div className="imagemCadastrarFilme">
          <div className="containerImagem">
            <img src={poster} alt="Poster do filme" />
          </div>
          <label>URL do poster:</label>
          <input
            type="text"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            required
            placeholder="Cole aqui a URL da imagem para o poster"
          />
        </div>

        <div className="cadastrarFilme">
          <form onSubmit={handleSubmit}>
            <h1>{modo === "edit" ? "Editar filme" : "Cadastrar novo filme"}</h1>

            <label>Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              placeholder="Digite aqui o título do filme"
            />

            <div className="avaliacaoEduracao">
              <label>Avaliação (0 a 5):</label>
              <input
                type="number"
                value={avaliacao}
                onChange={(e) => setAvaliacao(e.target.value)}
                required
                placeholder="Ex: 4.6"
              />
              <label>Duração (em min):</label>
              <input
                type="number"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                required
                placeholder="Ex: 139"
              />
            </div>

            <label>Ano de publicação:</label>
            <input
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              required
              placeholder="Ex: 2025"
            />

            <label>Descrição / Sinopse:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              placeholder="Digite aqui a sinopse do filme"
            />

            {/* Dropdown de gêneros */}
            <label>Gêneros:</label>
            <select
              multiple
              value={generosSelecionados}
              onChange={(e) =>
                setGenerosSelecionados(Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
              required
            >
              {generos.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.nome}
                </option>
              ))}
            </select>

            {/* Dropdown de atores */}
            <label>Atores:</label>
            <select
              multiple
              value={atoresSelecionados}
              onChange={(e) =>
                setAtoresSelecionados(Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
            >
              {atores.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.nome}
                </option>
              ))}
            </select>

            {/* Dropdown de diretores */}
            <label>Diretores:</label>
            <select
              multiple
              value={diretoresSelecionados}
              onChange={(e) =>
                setDiretoresSelecionados(Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
            >
              {diretores.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.nome}
                </option>
              ))}
            </select>

            <button type="submit">{modo === "edit" ? "Salvar alterações" : "Cadastrar"}</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default FormFilme;
