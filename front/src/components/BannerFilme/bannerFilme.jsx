import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";
import "./bannerFilme.css";

export default function BannerFilme({ filme }) {
  const [bgColor, setBgColor] = useState("#000");

  useEffect(() => {
    if (filme?.poster) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = filme.poster;
      img.onload = () => {
        const colorThief = new ColorThief();
        const [r, g, b] = colorThief.getColor(img);
        setBgColor(`rgb(${r}, ${g}, ${b})`);
      };
    }
  }, [filme?.poster]);

  return (
    <div
      className="filme-header"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${bgColor}cc, #000000dd),
          url(${filme.poster})
        `
      }}
    >
      <div className="filme-header-content">
        <h1>{filme.titulo}</h1>

        <div className="filme-generos">
          {filme.generos?.map((g, i) => (
            <span key={i} className="genero">
              {g}
            </span>
          ))}
        </div>

        <p className="filme-tagline">{filme.tagline}</p>
      </div>

      <div className="filme-header-poster">
        <img src={filme.poster} alt={filme.titulo} />
      </div>
    </div>
  );
}
