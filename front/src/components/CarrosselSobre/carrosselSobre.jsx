import React, { useState } from "react";
import "./carrosselSobre.css";

const CarrosselSobre = ({ imagens }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="carrosselContainerSobre">
      {imagens.map((img, index) => {
        const isHovered = index === hoveredIndex;
        const imgClass = isHovered
          ? "carrosselImagem hovered"
          : hoveredIndex === null
          ? "carrosselImagem"
          : "carrosselImagem small";

        return (
          <img
            key={index}
            src={img}
            alt={`Imagem ${index}`}
            className={imgClass}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        );
      })}
    </div>
  );
};

export default CarrosselSobre;
