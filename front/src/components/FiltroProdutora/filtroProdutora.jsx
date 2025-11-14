import React from 'react';
import './filtroProdutora.css';

const FiltroProdutora = ({ nome, imagem, isSelected, onSelect, onDeselect }) => {
    
    const handleCardClick = () => {
        if (isSelected) {
            onDeselect(nome);
        } else {
            onSelect(nome);
        }
    };

    const handleDeselectClick = (e) => {
        e.stopPropagation();
        onDeselect(nome);
    };

    const cardClasses = `filtroProdutora ${isSelected ? 'selected' : ''}`;

    return (
        <div 
            className={cardClasses}
            onClick={handleCardClick}
        >
            <span className="iconeFiltroProdutora">
                <img src={imagem} alt={`Logo da produtora ${nome}`} />
            </span>

            <span className="textoFiltroProdutora">{nome}</span>
            
            {isSelected && (
                <button 
                    className="deselectBotao"
                    onClick={handleDeselectClick}
                    aria-label={`Deselecionar ${nome}`}
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default FiltroProdutora;
