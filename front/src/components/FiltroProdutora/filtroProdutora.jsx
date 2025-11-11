import React from 'react';
import './filtroProdutora.css'; // Importa os estilos CSS do módulo

/**
 * Componente de Card Reutilizável com uma Imagem.
 * @param {object} props
 * @param {string} props.imageUrl - A URL da imagem a ser exibida no card.
 * @param {string} props.altText - Texto alternativo para a imagem (importante para acessibilidade).
 * @param {function} [props.onClick] - Função opcional para ser chamada ao clicar.
 */
const ImageCard = ({ imageUrl, altText, onClick }) => {
  return (
    <button className={styles.cardContainer} onClick={onClick}>
      <img 
        src={imageUrl} 
        alt={altText} 
        className={styles.cardImage} 
      />
    </button>
  );
};

export default ImageCard;