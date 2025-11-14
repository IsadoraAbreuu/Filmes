import React from 'react';
import './filtroProdutora.css';

const FiltroProdutora = ({ nome, foto_produtora, isSelected, onSelect, onDeselect }) => {
    
    const handleCardClick = () => {
        isSelected ? onDeselect(nome) : onSelect(nome);
    };

    const handleDeselectClick = (e) => {
        e.stopPropagation();
        onDeselect(nome);
    };

    const cardClasses = `filtroProdutora ${isSelected ? 'selected' : ''}`;
    // transforma o caminho absoluto da img em url 
    // se foto_produtora for 'disney.svg', a URL será http://localhost:8000/assets/imageProdutoras/disney.svg
    const urlImagem = `http://localhost:8000/assets/imagesProdutoras/${foto_produtora}`;

    return (
        <div className={cardClasses} onClick={handleCardClick}>

            <span className="iconeFiltroProdutora">
                <img src={urlImagem} alt={`Logo da produtora ${nome}`} />
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
