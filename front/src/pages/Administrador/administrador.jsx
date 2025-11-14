import React, { useState } from 'react';
import CardAdm from '../../components/CardAdm/cardAdm'; 

export default function AdministradorDashboard() {
    
    // Use um estado para controlar qual modal está aberto e qual o tipo de ação
    const [modalInfo, setModalInfo] = useState({ visible: false, type: null });

    const handleOpenEditModal = () => setModalInfo({ visible: true, type: 'editar' });
    const handleOpenAddModal = () => setModalInfo({ visible: true, type: 'adicionar' });

    const handleAccept = () => {
        alert(`Solicitação de ${modalInfo.type.toUpperCase()} Aceita!`);
        setModalInfo({ visible: false, type: null });
    };

    const handleReject = () => {
        alert(`Solicitação de ${modalInfo.type.toUpperCase()} Recusada!`);
        setModalInfo({ visible: false, type: null });
    };
    
    return (
        <div>
            <h1>Painel do Administrador</h1>
            
            <button onClick={handleOpenEditModal}>Mostrar Modal Edição</button>
            <button onClick={handleOpenAddModal}>Mostrar Modal Adição</button>
            
            {/* O modal só é renderizado se 'visible' for true */}
            {modalInfo.visible && (
                <SolicitacaoEdicaoModal
                    acaoType={modalInfo.type} // Passa o tipo de ação
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )}
        </div>
    );
};
