import React from 'react';
import CarrosselPrincipal from '../../components/CarrosselHome/carrosselHome';

function Home() {
    return (
        <div className="homePage">
            <h1>Filmes em Destaque (Renderizados pelo Servidor!)</h1>
            
            <CarrosselPrincipal/>

            {/* O restante do conteúdo da página */}
        </div>
    );
}


export default Home;