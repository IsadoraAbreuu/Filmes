import React from 'react';
import CardFilme from '../Card/card'; // Reutilizamos o CardFilme existente
import './listaFilmes.css'; // Onde definiremos o layout de grade

export default function ListaFilmesGrid({ titulo, filmes }) {
  return (
    <section className="secaoListaFilmes">
      <h2 className="tituloSecao">{titulo}</h2>
      
      {/* Container que aplicará o layout de grade */}
      <div className="filmesGridContainer">
        {filmes.map(filme => (
          <CardFilme 
            key={filme.id_filme}
            poster={filme.poster}
            titulo={filme.titulo}
            avaliacao={filme.avaliacao}
            ano={filme.ano}
            // Adicione outras props do filme aqui, se necessário
          />
        ))}
      </div>
    </section>
  );
}