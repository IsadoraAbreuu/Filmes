import React from 'react';
import AcaoBotao from '../BotaoAcao/botaoAcao';
import './cardAdm.css';

const CardAdm = ({ 
    acaoType, // NOVO PARÂMETRO: 'editar' ou 'adicionar'
    onAccept,
    onReject
}) => {
    
    // Constrói o título e a mensagem baseados no tipo de ação
    const isEditing = acaoType === 'editar';

    const title = isEditing ? "Solicitação de EDIÇÃO" : "Solicitação de ADIÇÃO";
    
    const message = isEditing
        ? "O usuário deseja editar um filme, escolha uma das opções abaixo:"
        : "O usuário deseja adicionar um novo filme, escolha uma das opções abaixo:";

    // Ícone de edição (lápis)
    const IconeEdicao = () => (
        <span style={{ fontSize: '1.5em', color: '#ffd700', float: 'right' }}>
            &#9998;
        </span>
    );

    return (
        <div className="modal-overlay">
            <div className="solicitacao-edicao-modal">
                
                {/* Cabeçalho */}
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <IconeEdicao />
                </div>
                
                {/* Corpo */}
                <p className="modal-message">{message}</p>

                {/* Ações/Botões */}
                <div className="modal-actions">
                    <AcaoBotao 
                        label="Aceitar" 
                        type="accept" 
                        icon={<span style={{fontSize: '1.2em'}}>&#x2713;</span>} 
                        onClick={onAccept}
                    />
                    <AcaoBotao 
                        label="Recusar" 
                        type="reject" 
                        icon={<span style={{fontSize: '1.2em'}}>&#x2715;</span>} 
                        onClick={onReject}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardAdm;