import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
import IconeCoracao from "../../assets/icons/coracao.svg";
import IconeEstrela from "../../assets/icons/estrela.svg";
import ColorThief from "colorthief";

function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `http://localhost:8000/${path}`;
}

export default function CardFilme({ id, poster, titulo, avaliacao, ano }) {
  const imgRef = useRef();
  const [bgColor, setBgColor] = useState("rgba(0,0,0,0.5)");
  const [favoritado, setFavoritado] = useState(false);

useEffect(() => {
  try {
    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const validos = Array.isArray(favs)
      ? favs.filter((f) => f && typeof f === "object" && f.titulo)
      : [];

    setFavoritado(validos.some((f) => f.titulo === titulo));

    localStorage.setItem("favoritos", JSON.stringify(validos));
  } catch (e) {
    console.error("Erro ao ler favoritos:", e);
    localStorage.setItem("favoritos", "[]");
  }
}, [titulo]);


  // alterna favorito + salva/remover do localStorage
  const toggleFavorito = (e) => {
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");

    if (favoritado) {
      // se já estava favoritado, remove
      const novos = favs.filter((f) => f.titulo !== titulo);
      localStorage.setItem("favoritos", JSON.stringify(novos));
      setFavoritado(false);
      
    } else {
      // adiciona
      const novoFilme = { poster, titulo, avaliacao, ano };
      localStorage.setItem("favoritos", JSON.stringify([...favs, novoFilme]));
      setFavoritado(true);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="cardFilme" onClick={() => navigate(`/filme/${id}`)}>
      <img
        ref={imgRef}
        src={getImageUrl(poster)}
        alt={titulo}
        className="posterFilme"
        crossOrigin="anonymous"
      />

      <div className="infoFilme" style={{ backgroundColor: bgColor }}>
        <div className="cabecalhoFilme">
          <h3 className="tituloFilme">{titulo}</h3>
          <button className="botaoFavoritos" onClick={toggleFavorito}>
            <img
              src={IconeCoracao}
              alt="Ícone de favoritos"
              className={`iconeCoracao ${favoritado ? "ativo" : ""}`}
            />
          </button>
        </div>

        <div className="detalhesFilme">
          <p className="avaliacaoFilme">
            <img src={IconeEstrela} alt="Ícone de estrela/avaliação" />{" "}
            {avaliacao}
          </p>
          <span className="divisao">|</span>
          <p className="ano">{ano}</p>
        </div>
      </div>
    </div>
  );
}
