// CharacterBanner.jsx
import React from 'react';
import './personagens.css'; 

const CharacterBanner = ({ data }) => {
    return (
        <div className="banner-container">
            {data.map((personagem) => (
                <div 
                    key={personagem.id}
                    className="personagem-card"
                    style={{ 
                        // Define o flex-grow inicial com base nos dados. 
                        // Usamos flex: [grow] 1 [shrink] [basis] 
                        flex: `${personagem.flex} 1 0%`, 
                        
                        // Define a cor de fundo (Cor da divisória)
                        backgroundColor: personagem.cor, 
                        // Cria um gradiente sutil de cor para o preto (ou vice-versa)
                        backgroundImage: `linear-gradient(90deg, ${personagem.cor} 0%, ${personagem.cor} 100%)`
                    }}
                >
                    {/* ... (restante da estrutura: imagem-wrapper, info-overlay) ... */}
                    <div className="imagem-wrapper">
                        <img 
                            src={personagem.imagem} 
                            alt={personagem.nome} 
                            className="personagem-imagem"
                            style={{ objectPosition: personagem.objectPosition || 'center center' }} 
                        />
                    </div>
                    
                    <div className="info-overlay">
                        <p className="filme-titulo">{personagem.filme}</p>
                        <h3 className="personagem-nome">{personagem.nome}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterBanner;