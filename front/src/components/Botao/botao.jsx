import React from 'react';
import { Link } from 'react-router-dom';
import './botao.css';

export default function Botao({ link, texto, iconeSrc }) {

    return (
        <Link to={link} className="botaoDestaque">
            
            <div className="botaoDestaqueIcone">
                {iconeSrc && 
                    <img src={iconeSrc} alt={`Ícone do botão ${texto}`} className="iconeBotaoImg" />
                }
            </div>

            <span className="botaoDestaqueTexto">
                {texto}
            </span>
        </Link>
    );
}