import React from 'react';
import './user.css'; 
import IconePerfil from '../../assets/icons/foto-perfil.svg';

export default function User({ nome, tipo }) {

    const nomeUsuario = nome || "Usuário Desconhecido";
    const tipoUsuario = tipo || "Visitante";

    return (
        <div className="userInfoContainer">
            
            <div className="userIcone">
                <img src={IconePerfil} alt='Ícone de usuário' />
            </div>

            <div className="userDetalhes">
                <p className="userNome">{nomeUsuario}</p>
                <p className="userTipo">{tipoUsuario}</p>
            </div>
        </div>
    );
};

