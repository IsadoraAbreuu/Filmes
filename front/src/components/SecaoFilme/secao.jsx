import React, { useRef, useState } from "react";
import CardFilme from "../Card/card";
import "./secao.css";

// Define a constante de quantos cards se movem (1)
const CARDS_PER_PAGE = 1; 
// Largura do CardFilme (260px) + Gap (1rem = 16px) = 276px
const CARD_WIDTH_WITH_GAP = 276;

export default function SecaoFilme({ titulo, filmes }) {
  const listaFilmesRef = useRef(null);
  // 1. Adiciona o state para rastrear o índice do primeiro filme visível
  const [startIndex, setStartIndex] = useState(0); 

  // 2. Calcula a rolagem: 1 card * largura de um card = 276px
  const scrollAmount = CARDS_PER_PAGE * CARD_WIDTH_WITH_GAP; 

  // O índice máximo é o tamanho total da lista - 1 (o último item)
  const maxIndex = filmes.length - 1; 

  const scrollLeft = () => {
    if (startIndex > 0) {
      // Atualiza o índice (volta 1)
      const newIndex = startIndex - 1;
      setStartIndex(newIndex);
      
      // Rola o elemento visualmente
      if (listaFilmesRef.current) {
        listaFilmesRef.current.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth' 
        });
      }
    }
  };

  const scrollRight = () => {
    if (startIndex < maxIndex) {
      // Atualiza o índice (avança 1)
      const newIndex = startIndex + 1;
      setStartIndex(newIndex);
      
      // Rola o elemento visualmente
      if (listaFilmesRef.current) {
        listaFilmesRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth' 
        });
      }
    }
  };
  
  // 3. Lógica para desabilitar as setas
  const isAtStart = startIndex === 0;
  const isAtEnd = startIndex >= maxIndex; 

  return (
    <section className="secaoDeFilmes">
      
      <div className="cabecalhoSecao"> 
        <h2>{titulo}</h2>
        
        <div className="navegacaoSetas"> 
            
            {/* Botão Anterior: Desabilitado se estiver no início */}
            <button 
                className="botaoSeta esquerda" 
                onClick={scrollLeft}
                disabled={isAtStart} // Desabilita o botão
                // Estilo opcional para feedback visual de desabilitado
                style={{ opacity: isAtStart ? 0.4 : 1 }} 
            >
                &lt;
            </button>
            
            {/* Botão Próximo: Desabilitado se estiver no final */}
            <button 
                className="botaoSeta direita" 
                onClick={scrollRight}
                disabled={isAtEnd} // Desabilita o botão
                // Estilo opcional para feedback visual de desabilitado
                style={{ opacity: isAtEnd ? 0.4 : 1 }} 
            >
                +
            </button>
            
        </div>
      </div>
      
      <div className="listaFilmes" ref={listaFilmesRef}> 
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