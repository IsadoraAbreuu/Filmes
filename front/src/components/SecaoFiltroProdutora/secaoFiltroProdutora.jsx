import React, { useRef, useEffect } from 'react';
import FiltroProdutora from '../FiltroProdutora/filtroProdutora';
import './secaoFiltroProdutora.css';

const CarrosselFiltroProdutora = ({ produtoras, filtrosAtivos, onToggleFilter }) => {
  const carrosselRef = useRef(null);

  // Duplicar para efeito de loop infinito visual
  const produtorasDuplicadas = [...produtoras, ...produtoras];

  // Loop contínuo (reinicia o scroll quando chega no meio)
  useEffect(() => {
    const container = carrosselRef.current;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth } = container;
      if (scrollLeft >= scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollRight = () => {
    const container = carrosselRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth / 2;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleToggle = (nome) => onToggleFilter(nome);

  return (
    <div className="carrosselContainer">
      <div className="carrosselFiltros" ref={carrosselRef}>
        {produtorasDuplicadas.map((produtora, index) => (
        
          <FiltroProdutora
            key={`${produtora.id || produtora.nome}-${index}`}
            nome={produtora.nome}
            imagem={produtora.foto_produtora} // agora já vem pronto do backend
            isSelected={filtrosAtivos.includes(produtora.nome)}
            onSelect={handleToggle}
            onDeselect={handleToggle}
        />

        ))}
        
      </div>

      <button
        className="seta seta-direita"
        aria-label="Próximo"
        onClick={handleScrollRight}
      >
        ❯
      </button>
    </div>
  );
};

export default CarrosselFiltroProdutora;
