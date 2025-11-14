import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './navegacao.css'; 

const NavegacaoAbas = () => {
    // pega o id do filme que esta na URL
    const { id } = useParams(); 

    // a partir do id, define caminho de:
    const infoPath = `/filme/${id}`; // informações do filme como descrição/sinopse       
    const editPath = `/filme/${id}/editar`; // form de edição das informações daquele filme
    

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

            <hr className="tab-separator-line" />
        </div>
    );
};

export default NavegacaoAbas;