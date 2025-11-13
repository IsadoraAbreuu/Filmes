import React, { useEffect, useRef, useState } from "react";
import "./card.css";
import IconeCoracao from "../../assets/icons/coracao.svg";
import IconeEstrela from "../../assets/icons/estrela.svg";
import ColorThief from "colorthief";

// 🔧 Gera a URL correta da imagem (tanto local quanto externa)
function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `http://localhost:8000/${path}`;
}

export default function CardFilme({ poster, titulo, avaliacao, ano }) {
  const imgRef = useRef();
  const [bgColor, setBgColor] = useState("rgba(0,0,0,0.5)");
  const [favoritado, setFavoritado] = useState(false);

  // 🧠 Carrega favoritos do localStorage ao montar
// 🧠 Carrega favoritos do localStorage ao montar
useEffect(() => {
  try {
    const favs = JSON.parse(localStorage.getItem("favoritos") || "[]");
    // filtra apenas objetos válidos que tenham título
    const validos = Array.isArray(favs)
      ? favs.filter((f) => f && typeof f === "object" && f.titulo)
      : [];

    setFavoritado(validos.some((f) => f.titulo === titulo));

    // salva de volta os válidos (corrige o localStorage)
    localStorage.setItem("favoritos", JSON.stringify(validos));
  } catch (e) {
    console.error("Erro ao ler favoritos:", e);
    localStorage.setItem("favoritos", "[]");
  }
}, [titulo]);


  // ❤️ Alterna favorito + salva/remover do localStorage
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

  return (
    <div className="cardFilme">
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
