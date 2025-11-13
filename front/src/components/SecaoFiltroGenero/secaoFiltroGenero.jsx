import React from 'react';
import FiltroGenero from '../FiltroGenero/filtroGenero';
import './secaoFiltroGenero.css';

// Importa os ícones direto do src/assets
import acaoIcone from '../../assets/icons/acao-filtro.svg';
import romanceIcone from '../../assets/icons/romance-filtro.svg';
import terrorIcone from '../../assets/icons/terror-filtro.svg';
import musicalIcone from '../../assets/icons/musical-filtro.svg';
import animacaoIcone from '../../assets/icons/animacao-filtro.svg';
import historicoIcone from '../../assets/icons/historico-filtro.svg';
import TodosIcone from '../../assets/icons/todos-filtro.svg'
import ComediaIcone from '../../assets/icons/comedia-filtro.svg';
import AventuraIcone from '../../assets/icons/aventura-filtro.svg'
import MisterioIcone from '../../assets/icons/misterio-filtro.svg'
import InfantilIcone from '../../assets/icons//infantil-filtro.svg'
import ThrillerIcone from '../../assets/icons/thriller-filtro.svg'
import DramaIcone from '../../assets/icons/drama-filtro.svg'
import GuerraIcone from '../../assets/icons/guerra-filtro.svg'
import SuspenseIcone from '../../assets/icons/suspense-filtro.svg'
import FiccaoIcone from '../../assets/icons/ficcao-filtro.svg'
import FantasiaIcone from '../../assets/icons/fantasia-filtro.svg'
import DocumentarioIcone from '../../assets/icons/documentario-filtro.svg'
import CrimeIcone from '../../assets/icons/crime-filtro.svg'


// Mapeia nome do gênero para o ícone
const ICONE_MAP = {
    "Ação": acaoIcone,
    "Romance": romanceIcone,
    "Terror": terrorIcone,
    "Musical": musicalIcone,
    "Animação": animacaoIcone,
    "História": historicoIcone,
    "Todos": TodosIcone,
    "Comédia": ComediaIcone,
    "Aventura": AventuraIcone,
    "Mistério": MisterioIcone,
    "Infantil": InfantilIcone,
    "Thriller": ThrillerIcone,
    "Drama": DramaIcone,
    "Guerra": GuerraIcone,
    "Suspense": SuspenseIcone,
    "Ficção Científica": FiccaoIcone,
    "Fantasia": FantasiaIcone,
    "Documentário": DocumentarioIcone,
    "Crime": CrimeIcone
};

const CarrosselFiltroGenero = ({ generos, filtrosAtivos, onToggleFilter }) => {

    const handleToggle = (label) => {
        onToggleFilter(label);
    };

    const handleDeselect = (label) => {
        onToggleFilter(label);
    };

    return (
        <div className="carrosselContainer">
            <div className="carrosselFiltros">
                {generos && generos.map((genero) => (
                    <FiltroGenero
                        key={genero.id || genero.label}
                        label={genero.label}
                        icone={ICONE_MAP[genero.label] || '/assets/default.png'}
                        isSelected={filtrosAtivos.includes(genero.label)}
                        onSelect={handleToggle}
                        onDeselect={handleDeselect}
                    />
                ))}
            </div>
            <button className="maisBotao" aria-label="Mais gêneros">+</button>
        </div>
    );
};

export default CarrosselFiltroGenero;
