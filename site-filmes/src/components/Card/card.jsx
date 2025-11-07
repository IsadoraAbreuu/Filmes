import React, { useEffect, useRef, useState } from "react";
import "./card.css";
import IconeCoracao from '../../assets/icons/coracao.svg';
import IconeEstrela from '../../assets/icons/estrela.svg';
import ColorThief from "colorthief";

export default function CardFilme({ poster, titulo, avaliacao, ano }) {
  // cria uma referência para acessar a imagem diretamente no DOM
  const imgRef = useRef();

  // estado que guarda a cor de fundo dinâmica (inicialmente um fallback sem cor definida)
  const [bgColor, setBgColor] = useState("rgba(0,0,0,0.5)");

  // useEffect executa assim que o componente renderiza ou o pôster muda
  useEffect(() => {
    const colorThief = new ColorThief(); // instancia o extrator de cores

    // função que captura a cor dominante da imagem
    const handleColor = () => {
      // verifica se a imagem foi carregada completamente
      if (imgRef.current && imgRef.current.complete) {
        try {
          // getColor() retorna um array com [R, G, B]
          const color = colorThief.getColor(imgRef.current);

          // define a cor de fundo com leve transparência (0.6)
          setBgColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.6)`);
        } catch (error) {
          console.error("Erro ao pegar cor:", error);
        }
      }
    };

    // referência direta à imagem
    const img = imgRef.current;

    // se a imagem já estiver carregada (por cache, por exemplo), executa direto
    if (img.complete) handleColor();
    else img.addEventListener("load", handleColor); // senão, espera carregar

    // remove o listener quando o componente é desmontado (boa prática)
    return () => img.removeEventListener("load", handleColor);
  }, [poster]); // roda novamente se o pôster mudar

  return (
    <div className="cardFilme">
      {/* 
        ref={imgRef} - liga a referência à imagem para o ColorThief acessar.
        crossOrigin="anonymous" - necessário para permitir leitura de cor (CORS).
      */}
      <img 
        ref={imgRef} 
        src={poster} 
        alt={titulo} 
        className="posterFilme" 
        crossOrigin="anonymous" 
      />

      <div className="infoFilme" style={{ backgroundColor: bgColor }}>
        <div className="cabecalhoFilme">
          <h3 className="tituloFilme">{titulo}</h3>
          <button className="botaoFavoritos">
            <img src={IconeCoracao} alt="Ícone de favoritos" />
          </button>
        </div>

        <div className="detalhesFilme">
          <p className="avaliacaoFilme">
            <img src={IconeEstrela} alt="Ícone de estrela/avaliação" /> {avaliacao}
          </p>
          <span className="divisao">|</span>
          <p className="ano">{ano}</p>
        </div>
      </div>
    </div>
  );
}
