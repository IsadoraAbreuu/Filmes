import React from 'react';
import './cardPessoas.css'; 

/**
 * Componente CardPessoa
 * Exibe a foto e o nome de um Ator ou Diretor, usando uma URL de imagem externa.
 * * @param {string} fotoUrl - URL completa da foto (Ex: "https://exemplo.com/ator_foto.jpg").
 * @param {string} nomeCompleto - Nome completo da pessoa.
 * @param {string} role - Opcional, para acessibilidade (e.g., "Ator", "Diretor").
 */
const CardPessoa = ({ fotoUrl, nomeCompleto, role = "" }) => {
    
    // Define um placeholder para caso a URL falhe ou não seja fornecida
    // Nota: É importante ter um placeholder local em /public ou /src/assets para isso funcionar
    const PLACEHOLDER_FOTO = "/assets/placeholder-person.png"; 
    
    // A URL de origem é diretamente a prop fotoUrl, ou o placeholder se estiver vazia.
    const imagemSrc = fotoUrl || PLACEHOLDER_FOTO;
    
    const altText = `Foto ${role} ${nomeCompleto}`;

    return (
        <div className="card-pessoa-container">
            
            <div className="card-pessoa-foto-wrapper">
                <img 
                    // 🚨 CORREÇÃO AQUI: Usa a URL diretamente.
                    src={imagemSrc} 
                    alt={altText} 
                    className="card-pessoa-foto" 
                    // Optional: Fallback para o placeholder se a URL externa falhar
                    onError={(e) => { 
                        // Impede loop infinito de erro se o placeholder também falhar
                        if (e.target.src.indexOf(PLACEHOLDER_FOTO) === -1) {
                            e.target.src = PLACEHOLDER_FOTO;
                        }
                    }}
                />
            </div>
            
            <span className="card-pessoa-nome">
                {nomeCompleto}
            </span>
        </div>
    );
};

export default CardPessoa;