import React from 'react';
import './user.css'; 

export default function User({ nome, tipo }) {
    const nomeUsuario = nome || "Usuário Desconhecido";
    const tipoUsuario = tipo || "Visitante";

    return (
        <div className="user-info-container">
            
            <div className="user-icon-circle">
                <span className="icon-placeholder">👤</span> 
            </div>

            <div className="user-details-box">
                <p className="user-name">{nomeUsuario}</p>
                <p className="user-type">{tipoUsuario}</p>
            </div>
        </div>
    );
};

