import React from "react";
import './botaoDelete.css'
import IconeDelete from '../../assets/icons/add-botao.svg'

export default function BotaoDelete() {
    return(
        <>
            <div className="botaoDelete">
                <img src={IconeDelete} className="iconeDelete" alt="Ícone do botão de deletar"/>
            </div>
            <span className="textoBotaoDelete">
                Deletar filme
            </span>
        </>
    )
}