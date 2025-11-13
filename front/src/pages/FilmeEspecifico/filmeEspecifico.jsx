import React, { useEffect, useState } from "react";
import BannerFilme from "../../components/BannerFilme/bannerFilme";
import './FilmeEspecifico.css'

export default function FilmeEspecifico({ id }) {
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5173/api/filmes/${id}`)
      .then((res) => res.json())
      .then((data) => setFilme(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!filme) return <p>Carregando...</p>;

  return (
    <main>
      <BannerFilme filme={filme} />
      {/* aqui pode vir sinopse, diretores, elenco etc */}
    </main>
  );
}
