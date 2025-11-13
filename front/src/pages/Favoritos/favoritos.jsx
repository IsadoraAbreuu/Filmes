import React, { useEffect, useState } from "react";
import CardFilme from "../../components/Card/card";
import BannerFavoritos from '../../assets/images/banner-favoritos.svg'
import Botao from '../../components/Botao/botao'
import IconeSeta from '../../assets/icons/icone-seta-botao.svg'
import "./favoritos.css";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavoritos(favs);
  }, []);

  return (
    <main>
      <div className="paginaFavoritos">
        <div className="bannerFavoritos">
          <img src={BannerFavoritos} alt="Banner de favoritos" />
          <Botao
            link="/favoritos" //vai para a secao de recomendação aq embaixo
            texto="Confira as recomendações"
            iconeSrc={IconeSeta}
          />
        </div>
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
      </div>
    </main>
  );
}
