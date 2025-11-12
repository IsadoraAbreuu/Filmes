import React, { useEffect, useState } from "react";
import ListaFilmesGrid from "../../components/ListaFilmes/listaFilmes";
import SecaoFiltroGenero from "../../components/SecaoFiltroGenero/secaoFiltroGenero";

const Catalogo = () => {
  const [todosFilmes, setTodosFilmes] = useState([]); // Renomeado para clareza
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os filmes do backend
    fetch("http://localhost:8000/api/filmes")
  .then(res => res.json())
  .then(json => {
    if (json.status === "ok") {
      setTodosFilmes(json.data); // Usando setTodosFilmes
    } else {
      console.error("Erro do servidor:", json.message);
    }
    setLoading(false);
  })
  .catch(err => {
    console.error("Erro ao buscar filmes:", err);
    setLoading(false);
  });
  }, []);

  if (loading) {
    return <p>Carregando filmes...</p>;
  }

  return (
  <>
    <div className="filtros">
      <SecaoFiltroGenero/>
    </div>
    <div>
      <ListaFilmesGrid titulo="Todos os filmes" filmes={todosFilmes} />
    </div>
  </>
      
  );
}

export default Catalogo;