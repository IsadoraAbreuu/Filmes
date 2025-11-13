import React, { useEffect, useState } from "react";
import CardFilme from "../../components/Card/card";
import BannerFavoritos from "../../assets/images/banner-favoritos.svg";
import Botao from "../../components/Botao/botao";
import IconeSeta from "../../assets/icons/icone-seta-botao.svg";
import SecaoFilme from "../../components/SecaoFilme/secao";
import "./favoritos.css";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Estados da seção "Achamos que você vai gostar"
  const [filmesRecomendados, setFilmesRecomendados] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Buscar favoritos do localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavoritos(favs);
  }, []);

  // Buscar filmes recomendados do backend
  const buscarFilmesRecomendados = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/filmes_achamos_gostar");
      const data = await res.json();

      if (data.status === "ok") {
        setFilmesRecomendados(data.data);
      } else {
        throw new Error(data.message || "Erro ao buscar filmes recomendados.");
      }
    } catch (err) {
      console.error("Erro ao buscar filmes recomendados:", err);
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarFilmesRecomendados();
  }, []);

  return (
    <main>
      <div className="paginaFavoritos">
        {/* Banner de topo */}
        <div className="bannerFavoritos">
          <img src={BannerFavoritos} alt="Banner de favoritos" />
          <Botao
            link="#recomendacoes"
            texto="Confira as recomendações"
            iconeSrc={IconeSeta}
          />
        </div>

        {/* Lista de filmes favoritos */}
        <div className="containerFavoritos">
          <h2>❤️ Meus Favoritos</h2>
          {favoritos.length === 0 ? (
            <p>Nenhum filme foi favoritado ainda.</p>
          ) : (
            <div className="listaFavoritos">
              {favoritos.map((filme) => (
                <CardFilme key={filme.id} {...filme} />
              ))}
            </div>
          )}
        </div>

        {/* Seção de recomendações */}
        <div id="recomendacoes" className="secaoRecomendacoes">
          {carregando ? (
            <p>Carregando recomendações...</p>
          ) : erro ? (
            <p style={{ color: "red" }}>Erro: {erro}</p>
          ) : (
            <SecaoFilme
              titulo="🎯 Achamos que você vai gostar"
              filmes={filmesRecomendados}
            />
          )}
        </div>
      </div>
    </main>
  );
}
