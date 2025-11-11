import React from 'react';
import './filtroProdutora.css'; 

const ImageCard = ({ imageUrl, altText, onClick }) => {
  return (
    <button className="cardContainer" onClick={onClick}>
      <img 
        src={imageUrl} 
        alt={altText} 
        className="cardImage" 
      />
    </button>
  );
};

export default ImageCard;
