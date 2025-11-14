import React, { useState, useEffect, useCallback } from 'react';
import './filtro.css';

const FiltroFilmes = ({ filtros, onChange }) => {
    // 1. Estado local para gerenciar o input
    const [filtroLocal, setFiltroLocal] = useState(filtros);

    // Sincroniza o estado local com os props (usado para limpar filtros externos)
    useEffect(() => {
        setFiltroLocal(filtros);
    }, [filtros]);

    // 2. Handler local que atualiza APENAS o estado local
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFiltroLocal(prev => ({ ...prev, [name]: value }));
    };

    // 3. Efeito com DEBOUNCE (atraso) para chamar o 'onChange' do pai
    useEffect(() => {
        // Ignora a primeira execução
        if (filtroLocal.ator === filtros.ator && 
            filtroLocal.diretor === filtros.diretor && 
            filtroLocal.ano === filtros.ano) {
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            // Chama o handler do componente pai (Catalogo) APENAS após 500ms de pausa
            onChange(filtroLocal);
        }, 500); // 500 milissegundos de atraso

        // Cleanup function: cancela o timer se o usuário digitar novamente antes de 500ms
        return () => clearTimeout(delayDebounceFn);
    }, [filtroLocal, onChange, filtros]); // Dependências

    return (
        <div className="filtro-filmes-container">
            <div className="filtro-filmes-campo">
                <label htmlFor="ator">Ator</label>
                <input
                    id="ator"
                    name="ator"
                    type="text"
                    // Usa o estado local
                    value={filtroLocal.ator} 
                    // Usa o handler local
                    onChange={handleInputChange} 
                    placeholder="Procure por um ator..."
                />
            </div>

            <div className="filtro-filmes-campo">
                <label htmlFor="diretor">Diretor</label>
                <input
                    id="diretor"
                    name="diretor"
                    type="text"
                    value={filtroLocal.diretor}
                    onChange={handleInputChange}
                    placeholder="Procure por um diretor..."
                />
            </div>

            <div className="filtro-filmes-campo">
                <label htmlFor="ano">Ano de publicação</label>
                <input
                    id="ano"
                    name="ano"
                    type="number"
                    min="1800"
                    max={new Date().getFullYear()}
                    value={filtroLocal.ano}
                    onChange={handleInputChange}
                    placeholder="Procure por um ano..."
                />
            </div>
        </div>
    );
};

export default FiltroFilmes;