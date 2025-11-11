import React from 'react';
import './user.css'; 
import IconePerfil from '../../assets/icons/foto-perfil.svg';

<<<<<<< HEAD
export default function User({ nome, tipo }) {
=======
export default function User({ nome, tipo })  {
>>>>>>> 5e14ce5 (fazendo uhu)
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

