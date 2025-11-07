import React, { useEffect, useState } from "react";
import CarrosselFilmes from "../../components/SecaoFilme/secao";

const Catalogo = () => {
    const [todosFilmes, setClassicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os filmes do backend
    fetch("http://localhost:8000/api/filmes")
  .then(res => res.json())
  .then(json => {
    if (json.status === "ok") {
      setClassicos(json.data);
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
        {/* Passa os filmes para o carrossel */}
        <CarrosselFilmes titulo="Todos os filmes" filmes={todosFilmes} />
      </div>
    </main>
  );
}

export default Catalogo;