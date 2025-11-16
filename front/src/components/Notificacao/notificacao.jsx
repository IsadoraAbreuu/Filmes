import React from 'react';
import './notificacao.css';
import IconeNotificacao from '../../assets/icons/sino.svg'; 
import { Link } from 'react-router-dom';


export default function Notificacao() {
    const rota_adm = "/adm";
    return (
        <>
        <Link to={rota_adm}>
            <div className='containerNotificacao'>
                <div className='iconeNotificacao'>
                    <img src={IconeNotificacao} alt='Ícone de Notificação'/>
                </div>
            </div>
        </Link>
        </>
    )
}