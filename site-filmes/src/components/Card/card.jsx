import React from "react";
import "./card.css";
import IconeCoracao from '../../assets/coracao.svg'
import IconeEstrela from '../../assets/estrela.svg'

export default function CardFilme({ poster, titulo, avaliacao, ano_publicacao }) {
  return (
    <div className="cardFilme">
      <img src={poster} alt={titulo} className="posterFilme" />

      <div className="infoFilme">
        <div className="cabecalhoFilme">
          <h3 className="tituloFilme">{titulo}</h3>
          <button className="botaoFavoritos">
            <img src={IconeCoracao} alt="Ícone de favoritos" />
          </button>
        </div>

        <div className="detalhesFilme">
          <p className="avaliacaoFilme">
            <img src={IconeEstrela} alt="Ícone de estrela/avaliação" /> {avaliacao}
          </p>
          <span className="divisao">|</span>
          <p className="ano">{ano_publicacao}</p>
        </div>
      </div>
    </div>
  );
}
