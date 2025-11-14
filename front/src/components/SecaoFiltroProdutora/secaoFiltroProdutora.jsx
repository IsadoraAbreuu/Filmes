import React, { useRef, useEffect } from 'react';
import FiltroProdutora from '../FiltroProdutora/filtroProdutora';
import './secaoFiltroProdutora.css';

const CarrosselFiltroProdutora = ({ produtoras, filtrosAtivos, onToggleFilter }) => {
  const carrosselRef = useRef(null);

  const produtorasDuplicadas = [...produtoras, ...produtoras];

  useEffect(() => {
    const container = carrosselRef.current;
    const handleScroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollRight = () => {
    const container = carrosselRef.current;
    container.scrollBy({ left: container.offsetWidth / 2, behavior: 'smooth' });
  };

  return (
    <div className="carrosselContainer">
      <div className="carrosselFiltros" ref={carrosselRef}>
        {produtorasDuplicadas.map((produtora, index) => (
          <FiltroProdutora
            key={`${produtora.id || produtora.nome}-${index}`}
            nome={produtora.nome}
            imagem={produtora.foto_produtora}
            isSelected={filtrosAtivos.includes(produtora.nome)}
            onSelect={onToggleFilter}
            onDeselect={onToggleFilter}
          />
        ))}
      </div>

      <button className="seta seta-direita" aria-label="Próximo" onClick={handleScrollRight}>
        ❯
      </button>
    </div>
  );
};

export default CarrosselFiltroProdutora;
