import React from 'react';
import styles from './filtroGenero.css'; 
import { FaRegCheckSquare } from 'react-icons/fa'; 

const FiltroGenero = ({ Icon, text, onClick }) => {
  // Define um ícone padrão caso a prop 'Icon' não seja passada
  const DefaultIcon = Icon || FaRegCheckSquare; 

  return (
    // Usa o botão para manter a semântica de um elemento clicável
    <button className={styles.cardContainer} onClick={onClick}>
      
      {/* O ícone será renderizado aqui */}
      <DefaultIcon className={styles.icon} />
      
      {/* O texto será renderizado aqui */}
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default FiltroGenero;