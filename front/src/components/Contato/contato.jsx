import React from "react";
import './contato.css'
import InputContato from '../../components/InputContato/inputContato'
import MockupSobre from '../../assets/images/mockup-contato.svg'

export default function Contato() {
    return(
        <>
        <div className="backgroundContato">
            <div className="contato">
                <div className="informacoesContato">
                    <h2>Fale com a gente !</h2>
                    <p>Tem alguma dúvida, quer reportar um erro ou conversar sobre parcerias? Contate-nos por aqui</p>
                    <InputContato />
                </div>
                <div className="mockupContato">
                    <img src={MockupSobre} alt="Mockup de celular para contato" />
                </div>
            </div>
        </div>
        </>
    )
}