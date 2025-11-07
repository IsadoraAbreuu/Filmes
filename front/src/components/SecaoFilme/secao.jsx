import React from "react";
import CardFilme from "../Card/card";
import "./secao.css";

export default function SecaoFilmes({ titulo, filmes }) {
  return (
    <section className="secaoDeFilmes">
      <h2>{titulo}</h2>
      
      <div className="listaFilmes"> 
        {filmes.map((filme) => (
          <CardFilme
            key={filme.id}
            poster={filme.poster}
            titulo={filme.titulo}
            avaliacao={filme.avaliacao}
            ano={filme.ano}
          />
        ))}
      </div>
    </section>
  );
}