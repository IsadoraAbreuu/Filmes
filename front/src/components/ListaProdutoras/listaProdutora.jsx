import React, { useState, useEffect } from 'react';
import ImageCard from '../FiltroProdutora/filtroProdutora'; 
import './listaProdutora.css'; // Importa os estilos CSS

// A URL do endpoint que criamos no seu backend Python
const API_URL = 'http://localhost:8000/api/produtoras'; 

const FiltroProdutora = () => {
  const [produtoras, setProdutoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... (Lógica de fetch, sem alterações)
    const fetchProdutoras = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: status ${response.status}`);
        }
        
        const result = await response.json();
        setProdutoras(result.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutoras();
  }, []);

  if (loading) {
    // CORRIGIDO: Usando o nome da classe como string
    return <div className="loadingMessage">Carregando produtoras...</div>;
  }

  if (error) {
    // CORRIGIDO: Usando o nome da classe como string
    return <div className="errorMessage">Erro ao buscar dados: {error}</div>;
  }

  return (
    <div className="listContainer">
      {produtoras.map((produtora) => (
        <ImageCard 
          key={produtora.id_produtora} 
          imageUrl={produtora.logo_url} 
          altText={`Logo da ${produtora.nome}`}
          onClick={() => console.log(`Clicou na produtora: ${produtora.nome}`)}
        />
      ))}
    </div>
  );
};

export default FiltroProdutora;