import React, { useEffect, useState } from "react";
import ListaFilmesGrid from "../../components/ListaFilmes/listaFilmes";

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
    <main>
      <div>
        {/* Usa o novo componente de grade para listar todos */}
        <ListaFilmesGrid titulo="Todos os filmes" filmes={todosFilmes} />
      </div>
    </main>
  );
}

export default Catalogo;