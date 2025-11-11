import React from 'react';
import './notificacao.css';
import IconeNotificacao from '../../assets/icons/sino.svg'; 

export default function Notificacao() {
    return (
        <>
            <div className='containerNotificacao'>
                <div className='iconeNotificacao'>
                    <img src={IconeNotificacao} alt='Ícone de Notificação'/>
                </div>
            </div>
        </>
    )
}