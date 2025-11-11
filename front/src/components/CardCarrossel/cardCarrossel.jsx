import React from 'react';
import { Play } from 'lucide-react';
import './cardCarrossel.css';
import BotaoInfo from '../../components/Botao/botao'
import IconeSeta from '../../assets/icons/icone-seta-botao.svg'

function CardCarrossel({ filme, className, onCardClick }) {
    const { titulo, descricao, capaFundo } = filme;
 
    return (
        <div
            className={`cardCarrossel ${className}`}
            style={{ backgroundImage: `url(${capaFundo})` }}
            onClick={onCardClick}
        >
            <div className="cardConteudo">
                <h2 className="cardTitulo">{titulo}</h2>
                <p className="cardDescricao">{descricao}</p>
                <BotaoInfo 
                    link="/descricao"
                    texto="Saiba mais"
                    iconeSrc={IconeSeta}
                />

            </div>
        </div>
    );
}
 
export default CardCarrossel;