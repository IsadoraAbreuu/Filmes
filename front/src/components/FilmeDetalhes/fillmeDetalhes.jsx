import React, { useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import BannerFilme from "../../components/BannerFilme/bannerFilme";
import NavegacaoAbas from "../../components/Navegacao/navegacao"; // Seu componente de abas
import CardPessoa from '../CardDiretorEAtor/cardPessoas';
// Seu util de imagem
const getImageUrl = (path) => { 
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:8000/${path}`;
};


const FilmeDetalhe = () => {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/filme?id=${id}`);
                if (!res.ok) throw new Error("Erro ao buscar filme");

                const json = await res.json();
                if (json.status !== "ok") throw new Error("Resposta inválida");

                setFilme({
                    ...json.data,
                    poster: getImageUrl(json.data.poster)
                });

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFilme();
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (!filme) return <p>Filme não encontrado.</p>;

    return (
        <main>
            <BannerFilme filme={filme} />

            <NavegacaoAbas />

            <Outlet context={{ filmeData: filme, getImageUrl: getImageUrl }} /> 
            
        </main>
    );
};

export default FilmeDetalhe;