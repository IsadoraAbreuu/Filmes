import React from 'react';
import FiltroGenero from '../FiltroGenero/filtroGenero'; 
import './secaoFiltroGenero.css'; 

const CarrosselFiltroGenero = ({ 
    generos, // Lista de gêneros vindos do DB
    filtrosAtivos, // Array de labels dos gêneros atualmente selecionados
    onToggleFilter // Função para selecionar/desselecionar um filtro
}) => {
    
    // Função unificada para alternar o estado de um filtro
    const handleToggle = (label) => {
        onToggleFilter(label);
    };

    // Função para deseleção explícita (usada no botão 'x')
    const handleDeselect = (label) => {
        onToggleFilter(label); // Se a lógica de toggle estiver no pai, ela fará a deseleção
    };

    return (
        <div className="carrosselContainer">
            <div className="carrosselFiltros">
                {/* Verifica se a lista de gêneros existe antes de mapear */}
                {generos && generos.map((genero) => (
                    <FiltroGenero 
                        key={genero.id || genero.label} 
                        label={genero.label} 
                        icone={genero.icone} 
                        // Verifica se o gênero atual está no array de filtrosAtivos
                        isSelected={filtrosAtivos.includes(genero.label)}
                        onSelect={handleToggle}
                        onDeselect={handleDeselect}
                    />
                ))}
            </div>
            <button className="maisBotao" aria-label="Mais gêneros">
                +
            </button>
        </div>
    );
};

export default CarrosselFiltroGenero;