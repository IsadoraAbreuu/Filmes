import Claquete from '../../assets/images/claquete-sobrenos.svg';
import IconeEngrenagem from '../../assets/icons/engrenagem-sobrenos.svg';
import IconeLampada from '../../assets/icons/lampada-sobrenos.svg';
import IconeFiltro from '../../assets/icons/filtro-sobrenos.svg'
import Footer from '../../components/Footer/footer';
import Botao from '../../components/Botao/botao'
import IconeSetaBotao from '../../assets/icons/icone-seta-botao.svg'; 
import './sobre.css';

const SobreNos = () => {
    return (
        <>
        <main>
            <div className="backgroundSobreNos">
                <div className="bannerSobreNos">
                    <h1>Cinema ao Seu Alcance:</h1>
                    <h2>Explore, Filtre e Contribua</h2>
                    <p>Encontre, filtre e adicione seus filmes favoritos de forma rápida e fácil. 
                        No <span>FilHub</span> a experiência de explorar cinema é totalmente personalizada e divertida!</p>
                    <img src={Claquete} alt='Imagem de Claquete de filme' />
                </div>

                <div className='funcionalidadesSobreNos'>
                    <h2>A Magia por Trás da Tela</h2>
                    <div className='containerCards'>
                        <div className='cardFiltro'>
                            <img src={IconeFiltro} alt='Ícone de engrenagem' />
                            <h5>Filtros inteligentes</h5>
                            <p>por genêro, produtora, diretor e ator</p>
                        </div>
                        <div className='cardLampada'>
                            <img src={IconeLampada} alt='Ícone de lampada' />
                            <h5>Recomendações personalizadas</h5>
                            <p>baseado em seus filmes favoritos</p>
                        </div>
                        <div className='cardEngrenagem'>
                            <img src={IconeEngrenagem} alt='Ícone de lampada' />
                            <h5>Gerenciamento de filmes</h5>
                            <p>edição de filmes e adição de novos </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    
        </>
    )
}

export default SobreNos;