import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './navegacao.css'; 

const NavegacaoAbas = () => {
    // 1. Pega o ID do filme da URL (ex: /filme/48)
    const { id } = useParams(); 

    // Define os caminhos relativos ao ID atual
    const infoPath = `/filme/${id}`;         // Ex: /filme/48 (Para a descrição)
    const editPath = `/filme/${id}/editar`; // Ex: /filme/48/editar (Para a edição)
    
    // O end={true} garante que o link 'Informações' só esteja ativo se o caminho for exatamente '/filme/id'
    // O NavLink adiciona a classe 'active' ao link selecionado.

    return (
        <div className="movie-tabs-container">
            <nav className="movie-tabs-nav">
                
                <NavLink 
                    to={infoPath} 
                    end={true}
                    className={({ isActive }) => 
                        isActive ? "tab-item active" : "tab-item"
                    }
                >
                    Informações
                </NavLink>

                <NavLink 
                    to={editPath} 
                    className={({ isActive }) => 
                        isActive ? "tab-item active" : "tab-item"
                    }
                >
                    Editar filme
                </NavLink>

            </nav>
            {/* Linha Divisória de Estilo */}
            <hr className="tab-separator-line" />
        </div>
    );
};

export default NavegacaoAbas;