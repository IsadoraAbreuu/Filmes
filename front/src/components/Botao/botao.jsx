import React from 'react';
import { Link } from 'react-router-dom';
import './botao.css';

export default function Botao({ link, texto, iconeSrc, onClick, type = 'button' }) {

    const content = (
        <>
            <div className="botaoDestaqueIcone">
                {iconeSrc && 
                    <img src={iconeSrc} alt={`Ícone do botão ${texto}`} className="iconeBotaoImg" />
                }
            </div>

            <span className="botaoDestaqueTexto">
                {texto}
            </span>
        </>
    );

    if (link) {
        return (
            <Link to={link} className="botaoDestaque" onClick={onClick}>
                {content}
            </Link>
        );
    }
    
    return (
        <button 
            type={type} 
            onClick={onClick} 
            className="botaoDestaque"
        >
            {content}
        </button>
    );
}