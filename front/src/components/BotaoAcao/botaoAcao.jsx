import React from 'react';
import './botaoAcao.css';

const AcaoBotao = ({ label, type, onClick, icon }) => {
    // Classes CSS: 'acao-botao' é a base, e 'accept' ou 'reject' define o estilo
    const buttonClass = `acao-botao acao-botao-${type}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {label} {icon}
        </button>
    );
};

export default AcaoBotao;