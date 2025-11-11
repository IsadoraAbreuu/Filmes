import React from 'react';
import CarrosselPrincipal from '../../components/CarrosselHome/carrosselHome';
import BannerHome from '../../assets/images/banner-home.svg';
import Botao from '../../components/Botao/botao'
import IconeSeta from '../../assets/icons/icone-seta-botao.svg'
import './home.css'
import FiltroProdutora from '../../components/ListaProdutoras/listaProdutora';

function Home() {
    return (
        <>
        
            <CarrosselPrincipal/>

            <div className='containerRecomendacoes'>
                <img src={BannerHome} alt='Banner sobre recomendações de filmes'/>
                <Botao
                    link="/favoritos" 
                    texto="Confira seus favoritos" 
                    iconeSrc={IconeSeta} 
                />
            </div>

            <FiltroProdutora />


        </>

        
    );
}


export default Home;