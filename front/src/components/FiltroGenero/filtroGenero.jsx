import React from 'react';
import './filtroGenero.css'; 



// Adicione as props: isSelected, onSelect, e onDeselect
const FiltroGenero = ({ label, icone, isSelected, onSelect, onDeselect }) => {
    
    // Altera o comportamento de clique para chamar a função do componente pai
    const handleCardClick = () => {
        if (isSelected) {
            onDeselect(label);
        } else {
            onSelect(label);
        }
    };

    // Altera o comportamento de deseleção para chamar a função do componente pai
    const handleDeselectClick = (e) => {
        e.stopPropagation(); 
        onDeselect(label);
    };

    const cardClasses = `filtroGenero ${isSelected ? 'selected' : ''}`;

    return (
        <div 
            className={cardClasses}
            onClick={handleCardClick}
        >
            <span className="iconeFiltroGenero">
                {/* Aqui você pode renderizar o ícone dinamicamente */}
                <img src={icone} alt={`Ícone do gênero ${label}`} />
            </span>
            <span className="textoFiltroGenero">{label}</span>
            
            {isSelected && (
                <button 
                    className="deselectBotao"
                    onClick={handleDeselectClick}
                    aria-label={`Deselecionar ${label}`}
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default FiltroGenero;