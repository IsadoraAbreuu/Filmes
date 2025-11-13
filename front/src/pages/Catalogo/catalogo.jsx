import React, { useEffect, useState } from "react";
// Importe o seu componente de Carrossel/Secao de Filtro
import CarrosselFiltroGenero from "../../components/SecaoFiltroGenero/secaoFiltroGenero"; 
import ListaFilmesGrid from "../../components/ListaFilmes/listaFilmes";
// Importe a função de mapeamento que criamos (Opção 1)
import { formatarGenerosParaCarrossel } from '../../../public/utils/generoMap'; 
import CharacterBanner from '../../components/BannerPersonagens/personagens'

// Data para o componente CharacterBanner
const PERSONAGENS_DATA = [
    { id: 1, nome: "Minion", filme: "Meu Malvado Favorito", cor: "#D9D83B", imagem: "caminho/minion.png", flex: 1.5 }, // Maior
    { id: 2, nome: "Yoda", filme: "Star Wars", cor: "#91A936", imagem: "caminho/yoda.png", flex: 2 }, // Médio-grande
    { id: 3, nome: "Dory", filme: "Procurando Nemo/Dory", cor: "#4A6EAA", imagem: "caminho/dory.png", flex: 1.2 }, // Pequeno
    { id: 4, nome: "Barbie", filme: "Barbie", cor: "#E184C0", imagem: "caminho/barbie.png", flex: 1.5 }, // Médio
    { id: 5, nome: "Iron Man", filme: "Vingadores", cor: "#E3452E", imagem: "caminho/ironman.png", flex: 2.5 }, // O maior
    { id: 6, nome: "Pennywise", filme: "It: A Coisa", cor: "#F57E42", imagem: "caminho/pennywise.png", flex: 1 }, // O menor
    { id: 7, nome: "Malévola", filme: "Malévola", cor: "#441857", imagem: "caminho/malevola.png", flex: 1.3 }, // Pequeno
];

const Catalogo = () => {


    // ESTADOS
    const [todosFilmes, setTodosFilmes] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    // ESTADOS DE FILTRO
    const [listaGeneros, setListaGeneros] = useState([]); // Gêneros formatados vindos do DB
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]); // Array de nomes dos gêneros ativos
    
    // --- LÓGICA DE BUSCA DE GÊNEROS (Roda apenas na montagem) ---
    useEffect(() => {
        fetch("http://localhost:8000/api/generos")
            .then(res => res.json())
            .then(json => {
                // Se você corrigiu o backend, json.data conterá a lista bruta
                if (json.status === "ok" && json.data) {
                    // Formata os dados brutos (adiciona ícones e o item "Todos")
                    const generosFormatados = formatarGenerosParaCarrossel(json.data);
                    setListaGeneros(generosFormatados);
                } else {
                    console.error("Erro ao buscar gêneros: Formato de dados inesperado.", json);
                }
            })
            .catch(err => {
                console.error("Erro na requisição dos gêneros:", err);
            });
    }, []);

    // --- LÓGICA DE BUSCA DE FILMES (Roda na montagem e na mudança de filtros) ---
    useEffect(() => {
        setLoading(true);
        
        // Constrói a query string com os filtros ativos: ?generos=Acao,Terror
        // O `join(',')` é essencial para o backend processar.
        const queryParams = filtrosSelecionados.length > 0 
            ? `?generos=${filtrosSelecionados.join(',')}` 
            : '';
            
        const urlBusca = `http://localhost:8000/api/filmes${queryParams}`;

        fetch(urlBusca)
            .then(res => res.json())
            .then(json => {
                if (json.status === "ok" && json.data) {
                    setTodosFilmes(json.data);
                } else {
                    console.error("Erro do servidor ao buscar filmes:", json.message);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar filmes:", err);
                setLoading(false);
            });
    }, [filtrosSelecionados]); // Dependência: Requisita novos filmes sempre que o filtro muda
    
    
    // --- LÓGICA DE FILTRAGEM DE ESTADO ---
    const handleToggleFilter = (label) => {
        // Se o gênero "Todos" for clicado, limpamos todos os filtros
        if (label === "Todos") {
             setFiltrosSelecionados([]);
             return;
        }

        setFiltrosSelecionados(prev => {
            // Se o filtro já está na lista, remove (desseleciona)
            if (prev.includes(label)) {
                return prev.filter(f => f !== label);
            } 
            // Se não está na lista, adiciona (seleciona)
            else {
                // Opcional: Remover "Todos" se um filtro específico foi selecionado
                return [...prev.filter(f => f !== "Todos"), label];
            }
        });
        // O `useEffect` de filmes será disparado automaticamente pela mudança de `filtrosSelecionados`.
    };

    if (loading) {
        return <p>Carregando filmes...</p>;
    }
    
    // --- RENDERIZAÇÃO ---
    
    // Determina o título baseado nos filtros ativos
    const tituloGrid = filtrosSelecionados.length > 0 && filtrosSelecionados.join(', ') !== "Todos"
        ? `Filmes de ${filtrosSelecionados.join(', ')}` 
        : "Todos os filmes";

    return (
        <>
            <main>
                <div>
                    <CharacterBanner data={PERSONAGENS_DATA} />
                </div>
                <div className="filtros">
                    {/* Passagem das props essenciais para o Carrossel */}
                    <CarrosselFiltroGenero
                        generos={listaGeneros}
                        filtrosAtivos={filtrosSelecionados}
                        onToggleFilter={handleToggleFilter}
                    />
                </div>
                <div>
                    <ListaFilmesGrid 
                        titulo={tituloGrid} 
                        filmes={todosFilmes} 
                    />
                </div>
            </main>
        </>
    );
}

export default Catalogo;