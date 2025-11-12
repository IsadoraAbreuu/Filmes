import React, { useState } from 'react';
import './filtroGenero.css'; 



const FilterCard = ({ label, icone }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleCardClick = (e) => {
        if (e.target.closest('.deselect-btn')) {
             return; 
        }
        setIsSelected(prev => !prev);
    };


    const handleDeselectClick = (e) => {
        e.stopPropagation(); 
        setIsSelected(false);
    };

    const cardClasses = `filtroGenero ${isSelected ? 'selected' : ''}`;

    return (
        <div 
            className={cardClasses}
            onClick={handleCardClick}
        >
            <span className="iconeFiltroGenero">
                <img src={icone} alt='Ícone do filtro' />
            </span>
            <span className="textoFiltroGenero">{label}</span>
            
            {isSelected && (
                 <button 
                    className="deselectBotao"
                    onClick={handleDeselectClick}
                    aria-label="Deselecionar"
                >
                    &times;
                </button>
            )}
        </div>
    );
};


export default FilterCard;