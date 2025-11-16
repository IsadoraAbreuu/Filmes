import React, { useEffect, useState } from "react";
import CarrosselFiltroGenero from "../../components/SecaoFiltroGenero/secaoFiltroGenero";
import CarrosselFiltroProdutora from "../../components/SecaoFiltroProdutora/secaoFiltroProdutora";
import ListaFilmesGrid from "../../components/ListaFilmes/listaFilmes";
import CharacterBanner from "../../components/BannerPersonagens/personagens";
import FiltroFilmes from "../../components/Filtro/filtro";
import "./catalogo.css";

// Banner de personagens (não modificado)
const PERSONAGENS_DATA = [
  { id: 1, nome: "Minion", filme: "Meu Malvado Favorito", cor: "#D9D83B", imagem: "caminho/minion.png", flex: 1.5 },
  { id: 2, nome: "Yoda", filme: "Star Wars", cor: "#91A936", imagem: "caminho/yoda.png", flex: 2 },
  { id: 3, nome: "Dory", filme: "Procurando Nemo/Dory", cor: "#4A6EAA", imagem: "caminho/dory.png", flex: 1.2 },
  { id: 4, nome: "Barbie", filme: "Barbie", cor: "#E184C0", imagem: "caminho/barbie.png", flex: 1.5 },
  { id: 5, nome: "Iron Man", filme: "Vingadores", cor: "#E3452E", imagem: "caminho/ironman.png", flex: 2.5 },
  { id: 6, nome: "Pennywise", filme: "It: A Coisa", cor: "#F57E42", imagem: "caminho/pennywise.png", flex: 1 },
  { id: 7, nome: "Malévola", filme: "Malévola", cor: "#441857", imagem: "caminho/malevola.png", flex: 1.3 },
];

const Catalogo = () => {
  // ---------- ESTADOS ----------
  const [todosFilmes, setTodosFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [listaGeneros, setListaGeneros] = useState([]);
  const [filtrosGenero, setFiltrosGenero] = useState([]); // agora armazena ID

  const [listaProdutoras, setListaProdutoras] = useState([]);
  const [filtrosProdutora, setFiltrosProdutora] = useState([]); // armazena ID

  const [filtros, setFiltros] = useState({
    ator: "",
    diretor: "",
    ano: "",
  });

  // ---------- BUSCA GÊNEROS ----------
  useEffect(() => {
    fetch("http://localhost:8000/api/generos")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "ok") {
          const generosFormatados = [
            { id: 0, label: "Todos" },
            ...json.data.map((g) => ({
              id: g.id,
              label: g.nome,
            })),
          ];
          setListaGeneros(generosFormatados);
        }
      })
      .catch(console.error);
  }, []);

  // ---------- BUSCA PRODUTORAS ----------
  useEffect(() => {
    fetch("http://localhost:8000/api/produtoras")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "ok") {
          setListaProdutoras(
            json.data.map((p) => ({
              id: p.id,
              nome: p.nome,
              imagem: p.foto_produtora, // nome do arquivo
            }))
          );
        }
      })
      .catch(console.error);
  }, []);

  // ---------- BUSCA FILMES (COM FILTROS) ----------
  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();

    if (filtrosGenero.length > 0) {
      params.append("generos", filtrosGenero.join(","));
    }

    if (filtrosProdutora.length > 0) {
      params.append("produtoras", filtrosProdutora.join(","));
    }

    if (filtros.ator) params.append("ator", filtros.ator);
    if (filtros.diretor) params.append("diretor", filtros.diretor);
    if (filtros.ano) params.append("ano", filtros.ano);

    fetch(`http://localhost:8000/api/filmes?${params.toString()}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "ok") setTodosFilmes(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar filmes:", err);
        setLoading(false);
      });
  }, [filtrosGenero, filtrosProdutora, filtros]);

  // ---------- HANDLERS ----------
  const limparTodosFiltros = () => {
    setFiltrosGenero([]);
    setFiltrosProdutora([]);
    setFiltros({ ator: "", diretor: "", ano: "" });
  };

  const handleToggleGenero = (id) => {
    if (id === 0) {
      limparTodosFiltros();
      return;
    }

    setFiltrosGenero((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev.filter((f) => f !== 0), id]
    );

    setFiltros({ ator: "", diretor: "", ano: "" });
  };

  const handleToggleProdutora = (id) => {
    setFiltrosProdutora((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );

    setFiltros({ ator: "", diretor: "", ano: "" });
  };

  const handleFiltrosChange = (novosFiltros) => {
    setFiltros((prev) => ({ ...prev, ...novosFiltros }));

    if (filtrosGenero.length > 0 || filtrosProdutora.length > 0) {
      setFiltrosGenero([]);
      setFiltrosProdutora([]);
    }
  };

  // ---------- RENDER ----------
  if (loading) return <p>Carregando filmes...</p>;

  const tituloGrid =
    filtrosGenero.length > 0 ||
    filtrosProdutora.length > 0 ||
    filtros.ator ||
    filtros.diretor ||
    filtros.ano
      ? "Filmes filtrados"
      : "Todos os filmes";

  return (
    <main>
      <CharacterBanner data={PERSONAGENS_DATA} />

      <div className="filtros">
        <CarrosselFiltroGenero
          generos={listaGeneros}
          filtrosAtivos={filtrosGenero}
          onToggleFilter={handleToggleGenero}
        />

        <CarrosselFiltroProdutora
          produtoras={listaProdutoras}
          filtrosAtivos={filtrosProdutora}
          onToggleFilter={handleToggleProdutora}
        />

        <FiltroFilmes filtros={filtros} onChange={handleFiltrosChange} />
      </div>

      <div className="filmesCatalogo">
        <ListaFilmesGrid titulo={tituloGrid} filmes={todosFilmes} />
      </div>
    </main>
  );
};

export default Catalogo;
